import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { LayoutConfigService } from 'src/app/shared/layout/layout-config.service';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthEmpresaGuard  {

  constructor(
    private _userService: SessionService,
    private _messageService: SnackBarMessageService,
    private layoutConfigService: LayoutConfigService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const divElement = document.getElementById("container");

    if (divElement) {
      divElement.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const expiration = this._userService.getExpiration();

    this.layoutConfigService.setaRotaAtiva(state.url);

    const exist = this.layoutConfigService.validaRota(state.url);
    if (!exist) {
      this._router.navigateByUrl('/private/home?status=21e56950-0dac-11ed-861d-0242ac120002');
      this._messageService.openSnackBarWarn("Acesso negado")
      return false;
    }

    var empresaRoute = route.paramMap.get('empresaId');

    if (this._userService.empresa.empresaId.toString() != empresaRoute || !this.verifyRole(state.url)) {
      this._router.navigateByUrl('/private/home?status=21e56950-0dac-11ed-861d-0242ac120002');
      this._messageService.openSnackBarWarn("Acesso negado")
      return false;
    }

    if (expiration) {
      if (moment() < moment(expiration)) {
        return true;
      } else {
        this._userService.logout();
        this._router.navigateByUrl('login');
        this._messageService.openSnackBarWarn("Sua sessão expirou, faça login novamente!")
        return false;
      }
    }

    this._router.navigateByUrl('login');
    return false;

  }

  verifyRole(url: string) {

    const role = this._userService.empresa.role;

    if (role == 'ROLE_ADMIN') {
      return true;
    }

    if (url.startsWith('/private/vigilancia')) {
      return role == 'ROLE_VIGILANCIA';
    }

    if (url.startsWith('/private/empresa')) {
      return role == 'ROLE_EMPRESA';
    }

    return false;

  }

}
