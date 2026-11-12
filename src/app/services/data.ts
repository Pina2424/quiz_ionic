import { inject, Service } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './Question';
import { v4 as uuidv4 } from 'uuid';
import {Preferences} from '@capacitor/preferences';
import {HttpClient} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Service()
export class Data {
    private http = inject(HttpClient);
    public currentQuiz: Quiz = {
        id: '1',
        quizName: 'Sample Quiz',
        questions: []
    }

    constructor () {
        this.currentQuiz.questions = [
            {
                id: '1',
                titel: 'What is a promise?',
                a1: 'a nicely phrased lie',
                a2: 'a placeholder for a future value',
                a3: 'a callback function',
                a4: 'a special form of array',
                correct: 2
            },
            {
                id: '2',
                titel: 'What does CSS stand for?',
                a1: 'Cascading Style Sheets',
                a2: 'Creative Style System',
                a3: 'Computer Style Sheets',
                a4: 'Colorful Style Sheets',
                correct: 1
            }
        ];
   
}

async loadJSON(){
    this.currentQuiz = await firstValueFrom(
        this.http.get<Quiz>('https://www.schmiedel.co.at/json_cors/data.json'));
        this.saveQuiz();

}

saveQuiz(): void {
    let strQuize = JSON.stringify(this.currentQuiz);
    console.log(this.currentQuiz);
    console.log(strQuize);
    Preferences.set({
        key: 'quiz890',
        value: JSON.stringify(this.currentQuiz)
    });
}




async loadQuiz() {
    console.log('this.loadQuiz()');
   let obj = await Preferences.get({key: 'quiz890'});
   if (obj.value) {
    this.currentQuiz = <Quiz>JSON.parse(obj.value || '{}');
   }
   console.log(JSON.stringify(this.currentQuiz));
}

getNewQuestion(): Question {
    
    return {
        id: '0',
        titel: '',
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        correct: 1
    };

}

getQuestionById(id: string): Question {
    return this.currentQuiz.questions.find(q => q.id === id) || this.getNewQuestion();

}

addQuestion(question: Question): void {
    question.id = uuidv4();
    this.currentQuiz.questions.push(question);
}


deleteQuestion(id: string): void {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(q => q.id !== id);           
}
}