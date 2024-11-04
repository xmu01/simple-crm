import {ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule, TooltipComponent} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {provideNativeDateAdapter} from '@angular/material/core';

import { User } from '../../models/user.class';

import { Firestore, collection, collectionData, addDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog'; //MatDialogRef neu, war wichtig um Dialog zu schließen
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ FormsModule, MatDialogModule, NgIf, MatButtonModule, MatIconModule, MatTooltipModule, TooltipComponent, 
    MatInputModule, MatFormFieldModule, MatDatepickerModule, MatProgressBarModule, 
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  user!: User;
  userId!: string; //Testen ob das so passt..

  loading = false;

  readonly dialog = inject(MatDialogRef); //diese neue Methode, besser als mit constructor! wichtig war das Ref

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
   }

   saveUser() {
    if (this.userId) {
      this.loading = true;
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      updateDoc(userDocRef, this.user.toJSON());
      this.loading = false;
      this.dialog.close(DialogEditAddressComponent);
    } else {
      console.error("User ID is missing.");
    }

   }
}
