import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/authentication/session.service';
import { LayoutConfigService } from '../layout-config.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

  @Input() drawer: MatDrawer;

  usuarioId: number;

  loginIsAuth: boolean;

  @Input() isEmpresa: boolean = false;


  notifications: Notification[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    private layoutConfigService: LayoutConfigService,
    private activatedRoute: ActivatedRoute) {

    this.loginIsAuth = this.sessionService.getloginIsAuth();
  }


  logout() {
    this.sessionService.logout()
    this.router.navigateByUrl('/login')
  }

  meuPerfil() {
    this.usuarioId = this.sessionService.user.id

    this.router.navigateByUrl('/private/meuPerfil/' + this.usuarioId)
  }


  toogleMenu() {
    this.layoutConfigService.toggle();
  }


  backToHome() {
    this.router.navigateByUrl('/private/home')
  }

  get isAdmin() {
    return false;
  }

  get empresaName() {
    return this.sessionService.empresa.nome.toLocaleUpperCase();
  }

  get userName() {
    return this.sessionService.user.name
  }

}
