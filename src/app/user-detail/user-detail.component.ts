import { Component, inject, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, docData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, NgIf, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId!: string;
  firestore: Firestore = inject(Firestore);
  user$!: Observable<User | undefined>;

  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('User ID:', this.userId);

    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.user$ = docData(userDocRef, { idField: 'customIdName' }) as Observable<User>;
  }

  openDialog() {
  }
  
  openAddressDialog() {
    
  }
  
editUserDetail() {
  this.user$.subscribe(user => {
    if (!user) return;
    this.dialog.open(DialogEditUserComponent, {
      data: { userId: this.userId, user: user }
    });
  });
}

  
  editAddressDetail() {
    
    this.dialog.open(DialogEditAddressComponent);
  }
}
