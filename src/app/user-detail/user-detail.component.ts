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

  constructor(private route: ActivatedRoute) { }

  

  ngOnInit(): void {
    // Hol die User-ID von der URL
    const userId = this.route.snapshot.paramMap.get('id');
    
    if (userId) {
      console.log('User ID from URL:', userId);
    } else {
      console.error('No User ID found in URL!');
    }
  }

  
}
