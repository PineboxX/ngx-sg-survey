import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatisticService {

  constructor(
    private afDb: AngularFireDatabase
  ) { }

  public getSurveyAnswers() {
    return this.afDb.object(`${environment.organization}/survey-config`).valueChanges()
      .pipe(switchMap((surveyConfig: any) => {
        return this.afDb.list(`${environment.organization}/survey-answers/${surveyConfig.active}`).valueChanges()
      }))
  }

  public getStatistics() {
    return this.afDb.object(`${environment.organization}/survey-statistics`).valueChanges();
  }
}