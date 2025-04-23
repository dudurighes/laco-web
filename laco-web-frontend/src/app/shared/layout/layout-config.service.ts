import {Injectable} from '@angular/core';
import {MatDrawer, MatSidenav} from '@angular/material/sidenav';
import {ItemMenu} from '../models/user/layout.model';

const KEY = 'darktheme';

const KEY_MENU = 'stateMenu';

@Injectable({providedIn: 'root'})
export class LayoutConfigService {
  private sidenav: MatSidenav;

  private drawer: MatDrawer;

  companyMenu = false;

  isMobile = false;

  isLarge = false;

  menu: ItemMenu[];

  isAlterMode = false;

  darkMode = false;

  mobileQuery: MediaQueryList;

  largeScreenQuery: MediaQueryList;

  rotaAtiva: string;

  constructor() {
    let dark = window.localStorage.getItem(KEY);
    this.darkMode = dark == "true";
  }

  public toggleDarkMode() {
    this.darkMode = !this.darkMode;
    window.localStorage.setItem(KEY, JSON.stringify(this.darkMode));
  }

  public setMobile(mobile: boolean) {
    this.isMobile = mobile;
  }

  public setLarge(large: boolean) {
    this.isLarge = large;
  }

  public setSidenav(sidenav: any) {
    this.sidenav = sidenav;
  }

  public setSideDrawer(drawer: any) {
    this.drawer = drawer;
  }

  public openNav() {
    this.sidenav.open();
  }

  public openDrawer() {
    this.drawer.open();
  }

  public closeNav() {
    this.sidenav.close();
  }

  public closeDrawer() {
    this.drawer.close();
  }

  public reset() {
    this.isAlterMode = false;
  }

  public toggle(): void {

    if (this.drawer.opened) {
      this.closeDrawer();
    } else {
      this.setStateMenuLocalStorage(false);
      this.openDrawer();
    }

    if (this.sidenav.opened) {
      this.closeNav();
    } else {
      this.setStateMenuLocalStorage(true);
      this.openNav();
    }

  }

  setMenu(list: ItemMenu[]) {
    this.menu = list;
  }

  getMenu() {
    return this.menu;
  }


  validaRota(url) {

    const partes = url.split("private/");

    const recursoPartes = partes[1].split("/");

    const recurso = recursoPartes[0] + "/" + recursoPartes[1] + (recursoPartes[2] != undefined ? "/" + recursoPartes[2] : "");

    if (this.menu != null && this.menu != undefined) {

      var exist = this.menu.find(x => {

        return x.route.includes(recurso)
      });

      return exist;
    }

    return true;
  }

  setaRotaAtiva(url) {
    const partes = url.split("private/");

    const recursoPartes = partes[1].split("/");

    const recurso = recursoPartes[0] + (recursoPartes[1] != undefined ? "/" + recursoPartes[1] : "") + (recursoPartes[2] != undefined && recursoPartes[2] != null ? "/" + recursoPartes[2] + (recursoPartes[3] != null ? "/" + recursoPartes[3] : "") : "");

    if (this.menu != null && this.menu != undefined) {

      var rota = this.menu.find(x => {
        return x.route == recurso
      });

      if (rota == null || rota == undefined) {

        rota = this.menu.find(x => {

          return recurso.includes(x.route)
        });

      }
      this.rotaAtiva = rota?.route;
    }

  }


  getStateMenuLocalStorage(): boolean {

    let state = window.localStorage.getItem(KEY_MENU);

    if (state == null) {
      return true;
    }
    return state == "true";
  }

  setStateMenuLocalStorage(large: boolean) {

    window.localStorage.setItem(KEY_MENU, large.toString());
  }

  setCompanyMenu(value: boolean) {
    this.companyMenu = value;
  }

}
