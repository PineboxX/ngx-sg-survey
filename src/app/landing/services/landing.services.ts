import { Injectable } from '@angular/core';
import { preRegister } from '../models/landing.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class LandingService {

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth
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
    return Observable.fromPromise(this.afAuth.auth.signInAnonymously());
  }

  public signOutUser() {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  public savePreRegisterOnFirestore(preRegister: preRegister, userId: string) {
    return Observable.fromPromise(this.afStore.collection(environment.organization).doc('pre-registers')
      .collection('users').doc(userId).set({
        id: userId,
        register: preRegister,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }));
  }

  public saveStatistic(preRegisterKnow: boolean) {
    console.log('preRegisterKnow', preRegisterKnow);
    let sfDocRef;
    switch (preRegisterKnow) {
      case true:
        sfDocRef = firebase.firestore().collection(environment.organization).doc
          ("survey-statistics").collection("users").doc('enable')
        break;
      case false:
        sfDocRef = firebase.firestore().collection(environment.organization).doc
          ("survey-statistics").collection("users").doc('unable')
        break;
    }

    return Observable.fromPromise(firebase.firestore().runTransaction((transaction) => {
      return transaction.get(sfDocRef).then(function (sfDoc) {
        if (!sfDoc.exists) {
          throw "Document does not exist!";
        }
        var newPopulation = sfDoc.data().total + 1;
        transaction.update(sfDocRef, { total: newPopulation });
      });
    }));
  }
}