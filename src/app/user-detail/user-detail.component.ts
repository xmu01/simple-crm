import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from "firebase/firestore";
import { Firestore, collection, collectionData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../models/user.class';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule, MatDialog} from '@angular/material/dialog'; //Das Wort "MatDialog" ist nur ein Service, kein Modul und darf somit nicht in die Imports unten rein
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ MatCardModule, NgFor, RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, 
    MatMenuModule, MatDialogModule, 
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId = '';
  user: User =  new User(); // Tipp: klappt auch ohne grünes User ALERT: ist besser als das alte, dumme : user: User | null = null;

  firestore: Firestore = inject(Firestore);

  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute) { }

/*
  ngOnInit(): void {
    // Hol die User-ID von der URL
    const userId = this.route.snapshot.paramMap.get('id');
    
    if (userId) {
      console.log('User ID from URL:', userId);
      this.getUser();
    } else {
      console.error('No User ID found in URL!');
    }
  }

  getUser() {
      const usersCollection = collection(this.firestore, 'users'); //Fehlerhafte Funktion, die alle Users holt, obwohl wir nur den ausgewählten haben wollten

      onSnapshot(usersCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {

          const userData = change.doc.data();
          const userId = change.doc.id;

          const user = new User( { ...userData, id: userId } );

          console.log('Retrieved user', user);
        })
    });
  } */

    ngOnInit(): void {
      // Hol die User-ID von der URL
      this.userId = this.route.snapshot.paramMap.get('id') || '';
      
      if (this.userId) {
        console.log('User ID from URL:', this.userId);
        this.getUser();
      } else {
        console.error('No User ID found in URL!');
      }
    }
  
    async getUser() {
      try {
        // Lade das spezifische User-Dokument
        const userDocRef = doc(this.firestore, `users/${this.userId}`);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          this.user = new User({ ...userData, id: this.userId });
          console.log('Retrieved user', this.user);
        } else {
          console.error('User not found!');
        }
      } catch (error) {
        console.error('Error retrieving user:', error);
      }
    }
  

    editMenu() {
      const dialogRef = this.dialog.open(DialogEditAddressComponent);
      dialogRef.componentInstance.user = new User(this.user.toJSON()); //toJSON notwendig und auch new User() statt this.user alleine notwendig, damit nicht das Pronlem mit Schwanthalerstr. kommt, also wenn man bei Cancel ein Input-Feld trotzdem Echtzeit bearbeitet, was wir nicht wollen. 
      dialogRef.componentInstance.userId = this.userId; // Damit die edit-address-comp. weiß welches Dokument bearbeitet werden muss anhand der ID
    }


    editUserDetail() {
      const dialogRef = this.dialog.open(DialogEditUserComponent);
      dialogRef.componentInstance.user = new User(this.user.toJSON()); // Mit dieser Syntax erstellen wir eine Kopie von unserem Nutzer!
      dialogRef.componentInstance.userId = this.userId; // Damit die edit-user-comp. weiß welches Dokument bearbeitet werden muss anhand der ID
    }


}
