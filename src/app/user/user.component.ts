import { Component, inject, OnInit, Input, NgZone } from '@angular/core';
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

import { doc, onSnapshot } from "firebase/firestore";

import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, 
    MatInputModule, MatFormFieldModule, MatDatepickerModule, MatCardModule, FormsModule, NgFor, RouterLink, RouterLinkActive, RouterOutlet,

  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
 
  user = new User();
  allUsers: User[] = [];
  //allUserIds: string[] = []; // Array to store user IDs (Um die Firebase IDs der User zu speichern)

  readonly dialog = inject(MatDialog);
  
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(private ngZone: NgZone) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  /*
  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');

    onSnapshot(usersCollection, (snapshot) => {
      console.log('Received changes from database', snapshot);

      this.allUsers = []; // Leert die Liste von allUsers um anschließend neue Daten zu adden
      snapshot.docChanges().forEach((change) => {
        //console.log( 'Document changed:', change.doc.data(),change.doc.id );

        const userData = change.doc.data();
        const userId = change.doc.id;

        //Um jz userData und userId zu kombinieren und gemeinsam zu pushen: 
        const user = new User( { ...userData, id: userId } ); //WICHTIG. Die 3 Punkte sind sehr wichtig, damit alles funktioniert

        console.log('Document changed:', user);

        this.allUsers.push(user);

        //this.allUsers.push(change.doc.data());
        //this.allUsers.push(change.doc.id);
        
        
      });
    }, (error) => {
      console.error('Error listening for changes:', error);
    });
  } */


    
    ngOnInit(): void {
      const usersCollection = collection(this.firestore, 'users');
  
      onSnapshot(usersCollection, (snapshot) => {
        console.log('Received changes from database', snapshot);
  
        // Die Änderungen in einem stabilen Kontext von NgZone ausführen
        this.ngZone.run(() => {
          // Leere die Liste und füge die neuesten Daten hinzu
          this.allUsers = [];
          snapshot.forEach((doc) => {
            const userData = doc.data();
            const userId = doc.id;
            const user = new User({ ...userData, id: userId });
            this.allUsers.push(user);
          });
        });
  
        console.log('Updated users list:', this.allUsers);
      }, (error) => {
        console.error('Error listening for changes:', error);
      });
    } 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }  
  

  

}
