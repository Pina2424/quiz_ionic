import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'question/:id',
    loadComponent: () => import('./pages/question/question.page').then((m) => m.QuestionPage),
  },
  {
    path: 'quiesten-list',
    loadComponent: () => import('./pages/quiesten-list/quiesten-list.page').then( m => m.QuiestenListPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  }

];
