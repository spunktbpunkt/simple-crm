import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading = false;
  firestore: Firestore = inject(Firestore);
  user: any;
  userId: string;

  constructor(
    public dialog: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user };
    this.userId = data.userId;

    // if (this.user.birthDate && typeof this.user.birthDate === 'number') {
    //   this.user.birthDate = new Date(this.user.birthDate);
    // }
  }

  async saveUser() {
    this.loading = true;

    // if (this.user.birthDate instanceof Date) {
    //   this.user.birthDate = this.user.birthDate.getTime();
    // }

    const docRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(docRef, this.user);

    this.loading = false;
    this.dialog.close();
  }
}
