import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  loading = false;
  firestore: Firestore = inject(Firestore);
  user: any;
  userId: string;

  constructor(
    public dialog: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user };
    this.userId = data.userId;

    if (this.user.birthDate && typeof this.user.birthDate === 'number') {
      this.user.birthDate = new Date(this.user.birthDate);
    }
  }

  async saveUser() {
    this.loading = true;

    if (this.user.birthDate instanceof Date) {
      this.user.birthDate = this.user.birthDate.getTime();
    }

    const docRef = doc(this.firestore, 'users', this.userId);
    await updateDoc(docRef, this.user);

    this.loading = false;
    this.dialog.close();
  }
}
