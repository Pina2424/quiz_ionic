import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButtons, IonBackButton, IonInput, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList} from '@ionic/angular';
import { Data } from '../../services/data';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../services/Question';


@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  imports: [IonBackButton, IonButtons, IonInput, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionPage implements OnInit {

  public data = inject(Data); //// new way to inject dependencies in Angular 16 and later
  private router = inject(ActivatedRoute);
  public question!: Question;
  constructor() { }

  ngOnInit() {
    
    const id = this.router.snapshot.paramMap.get('id') || '0';
    if (id === '0'){
this.question = this.data.getNewQuestion();
    } else{
      this.question = this.data.getQuestionById(id);
    }
   console.log(this.question.titel);
  }

  ionViewWillLeave() {
    if (this.question.id === '0' && this.question.titel.length > 2) {
      this.data.addQuestion(this.question);


  }else {
this.data.saveQuiz();
  }
}
}