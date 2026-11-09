import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItemOptions, IonItemOption, IonItemSliding, IonList, IonIcon, IonItem , IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,IonButton } from '@ionic/angular';
import { Data } from '../../services/data';
import { Router } from '@angular/router';

import { Question } from '../../services/Question';

@Component({
  selector: 'app-quiesten-list',
  templateUrl: './quiesten-list.page.html',
  styleUrls: ['./quiesten-list.page.scss'],
  imports: [IonItemOptions, IonItemOption, IonItemSliding,  IonIcon, IonItem, IonList, IonButtons, IonBackButton, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,  IonBackButton]
})
export class QuiestenListPage implements OnInit {

  public data = inject(Data); //// new way to inject dependencies in Angular 16 and later
private router = inject(Router);
  constructor() { }

  show (id: string) {
this.router.navigate(['/question', id]); // Navigate to the questions page
  }

  delete(question: Question){
    this.data.deleteQuestion(question.id);
  }
  ngOnInit() {
    console.log('QuiestenListPage initialized');
  }

}
