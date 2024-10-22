import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule, TooltipComponent} from '@angular/material/tooltip';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';

import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, TooltipComponent,  MatDialogModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    FormsModule,MatNativeDateModule
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


  user = new User();
  birthDate!: Date;

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
    

    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJSON()).then((result: any) => {
      console.log('Adding user finished', result);
    }).catch((error) => {
      console.error('Error adding user: ', error);
    });
    //this.firestore.collection('users').add(this.user.toJSON()).then((result: any) => {
     // console.log('Adding user finished', result);
    //});
  }

}
