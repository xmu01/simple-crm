import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from "firebase/firestore";
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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

  ngOninit(): void {
    console.log('ngOnInit called'); 
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id') ?? '';
      console.log('GOT ID', this.userId);
    });

    //this.userId = this.route.snapshot.paramMap.get('id') ?? '';
  }


  
}
