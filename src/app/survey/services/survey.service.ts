import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { SurveyQuestion } from '../models/questions.model';
import { isEmpty, concat } from 'lodash';
import * as firebase from 'firebase';

@Injectable()
export class SurveyService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  public getActiveQuestion(): Observable<SurveyQuestion[]> {
    return this.afStore.collection(environment.organization).doc('survey-config').valueChanges()
      .pipe(switchMap((surveyConfig: any) => {
        if (surveyConfig.active) {
          return this.getQuestionFromSurvey(surveyConfig.active)
        } else {
          return Observable.of([])
        }
      }))
  }

  public getQuestionFromSurvey(surveyId: string) {
    return this.afStore.collection(environment.organization).doc('survey-questions')
      .collection(surveyId).valueChanges()
      .pipe(switchMap((surveyQuestions: SurveyQuestion[]) => {
        let obs = [];
        if (!isEmpty(surveyQuestions)) {
          for (let item of surveyQuestions) {
            if (item.type == 'radio' || item.type == 'checkbox') {
              obs.push(this.getOptionsFromSurvey(surveyId, item.id));
            }
          }
        }
        return (isEmpty(obs)) ? Observable.of(surveyQuestions) : combineLatest(obs)
          .pipe(map((data) => {
            let index = 0;
            surveyQuestions.map(question => {
              question.options = data[index];
              index++;
            })
            return surveyQuestions;
          }));
      }));
  }

  public getOptionsFromSurvey(surveyId: string, questionId: string) {
    return this.afStore.collection(environment.organization).doc('survey-questions')
      .collection(surveyId).doc(questionId).collection('options').valueChanges();

  }

  public saveAnswersFromSurvey(surveyAnswers, userId = 1): Observable<any> {
    let id = this.afStore.createId();
    return this.afStore.collection(environment.organization).doc('survey-config').valueChanges()
      .pipe(switchMap((surveyConfig: any) => {
        console.log('guardando');
        return this.afStore.collection(environment.organization).doc('survey-answers')
          .collection(surveyConfig.active).doc(id).set({
            id: id,
            answers: surveyAnswers,
            userId: userId,
            surveyId: surveyConfig.active,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
      })
      )

  }

  public getAnswersFromSurvey(surveyId, userId) {
    return this.afStore.collection(environment.organization).doc('survey-answers')
      .collection(surveyId, ref => ref.where('userId', '==', userId)).valueChanges();
  }


}