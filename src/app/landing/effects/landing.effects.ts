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
            console.log('stop here');
            if (data.payload.know) {
              ons.notification.alert('Se han guardado tu registro exitosamente',
                {
                  title: 'Registro Exitoso'
                });
              this.router.navigate(['survey']);
            } else {
              ons.notification.alert({
                message: 'Muchas gracias por su tiempo y colaboración',
                title: 'Encuesta Finalizada'
              })
              this.router.navigate(['thanks']);
            }

          }))
      }))


  constructor(
    private actions$: Actions,
    private landingService: LandingService,
    private router: Router
  ) { }
}