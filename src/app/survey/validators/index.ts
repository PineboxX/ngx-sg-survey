import { AbstractControl } from "@angular/forms";
import { uniq } from 'lodash';

export function validatePonderation(controlsName: string[]) {
  return function (group: AbstractControl) {
    let a = [];
    for (let controlName of controlsName) {
      a.push(group.get(controlName).value);
    }
    if (uniq(a).length !== a.length) {
      return {
        validatePonderation:
          {
            text: `Los valores deben ser distintos en las diferentes opciones`,
          }
      }
    }
    else {
      return null;
    }
  };

}