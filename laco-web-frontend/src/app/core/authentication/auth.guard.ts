import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { LayoutConfigService } from 'src/app/shared/layout/layout-config.service';
import { SessionService } from './session.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard  {

    constructor(
        private _userService: SessionService,
        private _messageService: SnackBarMessageService,
        private layoutConfigService: LayoutConfigService,
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const divElement = document.getElementById("container");

        if (divElement) {
            divElement.scrollTo({ top: 0, behavior: 'smooth' });
        }

        this.layoutConfigService.setaRotaAtiva(state.url);

        const expiration = this._userService.getExpiration();

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
}
