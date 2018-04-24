import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { SurveyQuestion } from '../models/questions.model';
import { isEmpty, concat, has } from 'lodash';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class SurveyService {

  constructor(
    private afStore: AngularFirestore,
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  public getActiveQuestion(): Observable<SurveyQuestion[]> {
    return this.afDb.object(`${environment.organization}/survey-config`).valueChanges()
      .pipe(switchMap((surveyConfig: any) => {
        if (has(surveyConfig, 'active')) {
          return this.getQuestionFromSurvey(surveyConfig.active)
        } else {
          return Observable.of([])
        }
      }))
  }

  public getQuestionFromSurvey(surveyId: string) {
    return this.afDb.list(`${environment.organization}/survey-questions/${surveyId}`).valueChanges();
  }


  public saveAnswersFromSurvey(surveyAnswers): Observable<any> {
    let id = this.afStore.createId();
    return this.afDb.object(`${environment.organization}/survey-config`).valueChanges()
      .pipe(switchMap((surveyConfig: any) => {
        return Observable.fromPromise(
          this.afDb.object(`${environment.organization}/survey-answers/${surveyConfig.active}/${id}`).set({
            id: id,
            answers: surveyAnswers,
            userId: this.afAuth.auth.currentUser.uid,
            surveyId: surveyConfig.active,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })).pipe(switchMap(() => {
            return this.saveStatistic(surveyConfig.active);
          }))
      })
      )
  }

  public saveStatistic(surveyId: string) {
    return Observable.fromPromise(this.afDb.object(`/${environment.organization}/survey-statistics/${surveyId}/answers`)
      .query.ref.transaction((surveyStats) => {
        if (surveyStats) {
          return surveyStats + 1;
        } else {
          return 1
        }
      }));
  }
}