import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
@Injectable()
export class SurveyService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  public getActiveQuestion() {
    return this.afStore.collection(environment.organization).doc('survey-config').valueChanges()
      .pipe(switchMap((surveyConfig: any) => {
        if (surveyConfig.active) {
          return this.getQuestionFromSurvey(surveyConfig.active)
        } else {
          return Observable.of({})
        }
      }))
  }

  public getQuestionFromSurvey(surveyId) {
    return this.afStore.collection(environment.organization).doc('survey-questions')
      .collection(surveyId).valueChanges();
  }

  public getAnswersFromSurvey(surveyId, userId) {
    return this.afStore.collection(environment.organization).doc('survey-answers')
      .collection(surveyId, ref => ref.where('userId', '==', userId)).valueChanges();
  }
}