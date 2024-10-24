import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule, TooltipComponent} from '@angular/material/tooltip';
import {MatDialogModule, MatDialog} from '@angular/material/dialog'; //Das Wort "MatDialog" ist nur ein Service, kein Modul und darf somit nicht in die Imports unten rein

import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';

import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, 
    MatInputModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
 
  firestore: Firestore = inject(Firestore);
  
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    collection(this.firestore, 'users').valueChanges.subscribe((changes: any) => {
      console.log('Received changes from database', changes);
    });

    
  }


  user = new User();

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }
  
}
