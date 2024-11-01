import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from "firebase/firestore";
import { Firestore, collection, collectionData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ MatCardModule, NgFor, RouterLink, RouterLinkActive, RouterOutlet, ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId = '';
  user: User =  new User(); // Tipp: klappt auch ohne grünes User ALERT: ist besser als das alte, dumme : user: User | null = null;

  firestore: Firestore = inject(Firestore);

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
  
}
