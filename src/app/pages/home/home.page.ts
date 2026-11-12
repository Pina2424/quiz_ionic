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
  public data = inject(Data);
  private router = inject(Router);

  constructor() {
    console.log(this.data.currentQuiz.quizName);
  }

  showQuestions() {
    // Переход к списку вопросов
    this.router.navigate(['/quiesten-list']);
  }

  startQuiz() {
    console.log('Кнопка нажата, переходим на /quiz');
    this.router.navigateByUrl('/quiz');
  }
}