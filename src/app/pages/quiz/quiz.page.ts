import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButton, IonBackButton, IonButtons,
  ToastController, AlertController 
} from '@ionic/angular';
import { Data } from '../../services/data';
import { Question } from '../../services/Question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonBackButton, 
    IonButtons
  ]
})
export class QuizPage implements OnInit {
  public dataService = inject(Data);
  private router = inject(Router);
  
  // Внедряем контроллеры Ionic для тостов и алертов
  private toastController = inject(ToastController);
  private alertController = inject(AlertController);

  shuffledQuestions: Question[] = [];
  currentIndex: number = 0;
  score: number = 0;
  currentQuestion: Question | null = null;
  currentChoices: { text: string; originalIndex: number }[] = [];

  constructor() {}

  ngOnInit() {
    this.initQuiz();
  }

  initQuiz() {
    const originalQuestions = this.dataService.currentQuiz.questions;
    this.shuffledQuestions = [...originalQuestions].sort(() => Math.random() - 0.5);
    
    this.currentIndex = 0;
    this.score = 0;
    this.loadCurrentQuestion();
  }

  loadCurrentQuestion() {
    if (this.currentIndex < this.shuffledQuestions.length) {
      this.currentQuestion = this.shuffledQuestions[this.currentIndex];
      
      if (this.currentQuestion) {
        const choicesList = [
          { text: this.currentQuestion.a1, originalIndex: 1 },
          { text: this.currentQuestion.a2, originalIndex: 2 },
          { text: this.currentQuestion.a3, originalIndex: 3 },
          { text: this.currentQuestion.a4, originalIndex: 4 },
        ];
        this.currentChoices = choicesList.sort(() => Math.random() - 0.5);
      }
    } else {
      this.currentQuestion = null;
      // Показываем красивый модальный Алерт в конце
      this.finishQuiz();
    }
  }

  async answer(originalIndex: number) {
    if (!this.currentQuestion) return;

    if (originalIndex === Number(this.currentQuestion.correct)) {
      this.score++;
      // Зеленый тост при правильном ответе
      await this.showToast('Richtig! 🎉', 'success');
    } else {
      // Красный тост при ошибке
      await this.showToast('Falsch! ❌', 'danger');
    }

    this.currentIndex++;
    this.loadCurrentQuestion();
  }

  // Метод для создания всплывающего Toast-уведомления
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 900, // Показывать 0.9 секунды
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  // Метод для вывода итогового модального окна
  async finishQuiz() {
    const alert = await this.alertController.create({
      header: 'Quiz Beendet! 🏆',
      message: `Dein Endergebnis: ${this.score} von ${this.shuffledQuestions.length} Punkten.`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }
}