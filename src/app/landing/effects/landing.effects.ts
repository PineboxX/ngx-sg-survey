import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as landingActions from '../../landing/actions/landing.actions';
import { switchMap } from 'rxjs/operators';
import { LandingService } from '../services/landing.services';
import { map } from 'rxjs/operators';
import * as ons from 'onsenui';
import { Router } from '@angular/router';


@Injectable()
export class LandingEffects {

  @Effect({ dispatch: false })
  public saveAnswers: Observable<any> = this.actions$
    .ofType(landingActions.REGISTER_USER)
    .pipe(
      switchMap((data: any) => {
        return this.landingService.savePreRegister(data.payload)
          .pipe(map(() => {
            if (data.payload.know) {
              ons.notification.alert('Se han guardado tu registro exitosamente',
                {
                  title: 'Registro Exitoso'
                });
            } else {
              ons.notification.alert({
                message: 'Muchas gracias por su tiempo y colaboración',
                title: 'Encuesta Finalizada'
              })
            }

          }))
      }))


  @Effect({ dispatch: false })
  public signOut: Observable<any> = this.actions$
    .ofType(landingActions.SIGN_OUT)
    .pipe(
      switchMap((data: any) => {
        return this.landingService.signOutUser()
          .pipe(map(() => {
            ons.notification.toast({
              message: 'Se ha cerrado sesión correctamente',
              timeout: 1000
            })
            this.router.navigate(['/']);
          }))
      }))


  constructor(
    private actions$: Actions,
    private landingService: LandingService,
    private router: Router
  ) { }
}