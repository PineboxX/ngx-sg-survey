import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { SurveyQuestion } from '../models/questions.model';
import { isEmpty, concat } from 'lodash';
@Injectable()
export class SurveyService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  public getActiveQuestion(): Observable<SurveyQuestion[]> {
    console.log('Active Question');
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

  public getAnswersFromSurvey(surveyId, userId) {
    return this.afStore.collection(environment.organization).doc('survey-answers')
      .collection(surveyId, ref => ref.where('userId', '==', userId)).valueChanges();
  }
}