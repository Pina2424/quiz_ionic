import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Data } from '../../services/data';
import { NgClass } from '../../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  private router = inject(Router);
  public data = inject(Data); //// new way to inject dependencies in Angular 16 and later
  constructor() {
    console.log('this.data.currentQuiz.quizName')
  }

  showQuestions() {
    // Implement the logic to show questions
    this.router.navigate(['/quiesten-list']); // Navigate to the questions page
  }
}
