import { Injectable } from '@angular/core';
import { preRegister } from '../models/landing.model';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LandingService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) { }

  public savePreRegister(preRegister: preRegister) {
    return this.createUserOnAuth()
      .pipe(switchMap(() => {
        return this.savePreRegisterOnFirestore(preRegister, this.afAuth.auth.currentUser.uid)
          .pipe(switchMap(() => {
            return this.saveStatistic(preRegister.know);
          }))
      }))
  }
  public createUserOnAuth() {

    return Observable.fromPromise(new Promise((resolve, reject) => {
      this.afAuth.auth.signInAnonymously().then(() => {
        console.log('Sign in success');
        resolve();
      }).catch(error => console.error(error));
    }));
  }


  public signOutUser() {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  public savePreRegisterOnFirestore(preRegister: preRegister, userId: string) {
    return Observable.fromPromise(
      this.afDb.object(`${environment.organization}/users/${userId}`)
        .set({
          id: userId,
          register: preRegister,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }));
  }

  public saveStatistic(preRegisterKnow: boolean) {
    let ref;
    switch (preRegisterKnow) {
      case true:
        ref = `${environment.organization}/survey-statistics/enable`;
        break;
      case false:
        ref = `${environment.organization}/survey-statistics/unable`;
        break;
    }

    return Observable.fromPromise(this.afDb.object(ref)
      .query.ref.transaction((surveyStats) => {
        if (surveyStats) {
          return surveyStats + 1;
        } else {
          return 1
        }
      }));
  }
}