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
import { RouterLink, RouterLinkActive } from "@angular/router";

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
    NgFor,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  allUsers$!: Observable<User[]>;
  // allUsers = []

  constructor(public dialog: MatDialog) {
    this.user.firstName
  }

  ngOnInit(): void {
    const userCollection = collection(this.firestore, 'users');
    this.allUsers$ = collectionData(userCollection, { idField: 'customIdName'}) as Observable<User[]>;
    this.allUsers$.subscribe((changes: any) => {
      console.log(changes)
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
