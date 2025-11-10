import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCard } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCard,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  users$!: Observable<User[]>;

  constructor(public dialog: MatDialog,) {
    this.user.firstName
  }

  ngOnInit(): void {
    const userCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
    this.users$.subscribe((changes) => {
      console.log('Received users from Firestore:', changes);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
