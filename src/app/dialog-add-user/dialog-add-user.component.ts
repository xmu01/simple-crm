import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule, TooltipComponent} from '@angular/material/tooltip';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog'; //MatDialogRef neu, war wichtig um Dialog zu schließen
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';

import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, TooltipComponent,  MatDialogModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    FormsModule,MatNativeDateModule, MatProgressBarModule, NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  readonly dialog = inject(MatDialogRef); //diese neue Methode, besser als mit constructor! wichtig war das Ref

  user = new User();
  birthDate!: Date;
  loading = false;

 

  saveUser() {

    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    } else {
      console.error('Birthdate is undefined');
      return;
    }

    //this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
    
    this.loading = true; // Ab da kommen die Loading Animation und die Input-Felder blenden aus...

    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJSON()).then((result: any) => {
      this.loading = false; // ... ab hier alles wieder normal
      this.dialog.close(DialogAddUserComponent);
      console.log('Adding user finished', result);
    }).catch((error) => {
      console.error('Error adding user: ', error);
    });
    
    
    //this.firestore.collection('users').add(this.user.toJSON()).then((result: any) => {
     // console.log('Adding user finished', result);
    //});
  }

}
