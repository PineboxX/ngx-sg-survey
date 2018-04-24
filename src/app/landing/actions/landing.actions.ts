import { Action } from "@ngrx/store";

export const REGISTER_USER = '[ Landing ] - Register User';
export const SIGN_OUT = '[ Landing ] - Sign Out';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  public constructor(public payload: any) { }
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
  public constructor() { } S
}

export type All = RegisterUser
  | SignOut;