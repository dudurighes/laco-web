import { Injectable } from '@angular/core';

import jtw_decode from 'jwt-decode';
import { AuthResult } from 'src/app/shared/models/login/login.model';
import {
  EmpresaAuth,
  TokenResult,
  Usuario,
} from 'src/app/shared/models/user/user.model';

declare var window: any;

const AUTH_DATA = 'consorcio-rang-auth-data';

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_VIGILANCIA = 'ROLE_VIGILANCIA';
const ROLE_EMPRESA = 'ROLE_EMPRESA';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private mUser?: Usuario;

  private mEmpresa?: EmpresaAuth;

  private expiration?: Date;

  private role: string;

  private loginAuth: boolean;

  private mAuthToken?: string;

  get user() {
    return this.mUser;
  }

  get empresa() {
    const token = jtw_decode(this.mAuthToken) as TokenResult;
    return token.empresa;
  }

  get temAcessoEmpresa() {
    return this.empresa != null;
  }

  get authToken() {
    return this.mAuthToken;
  }

  get isLoggedIn() {
    return this.mUser != null;
  }

  getExpiration() {
    return this.expiration;
  }

  get emailConfirmado() {
    return this.mUser?.emailConfirmado;
  }

  constructor() {
    this.loadAuthData();
  }

  authenticate(authResult: AuthResult) {
    if (authResult.empresaData != null) {
      authResult.loginAuth = this.loginAuth;
    }
    this.cacheAuthData(authResult);
    localStorage.setItem(AUTH_DATA, JSON.stringify(authResult));
  }

  logout() {
    this.mUser = undefined;
    this.mEmpresa = undefined;
    this.mAuthToken = undefined;
    this.expiration = undefined;
    localStorage.removeItem(AUTH_DATA);
  }

  private cacheAuthData(authResult: AuthResult) {

    const token = jtw_decode(authResult.token) as TokenResult;

    this.mUser = authResult.userData;

    this.role = authResult.userData.role;

    this.mEmpresa = authResult.empresaData;

    this.mAuthToken = authResult.token;

    this.loginAuth = authResult.loginAuth;

    this.expiration = new Date(token.exp * 1000);
  }

  private loadAuthData() {
    let authDataString = localStorage.getItem(AUTH_DATA);

    if (authDataString != null) {
      let authResult = JSON.parse(authDataString) as AuthResult;
      this.cacheAuthData(authResult);
    }
  }

  getloginIsAuth() {
    return this.loginAuth;
  }

  isAdmin() {
    return this.role == ROLE_ADMIN;
  }
}
