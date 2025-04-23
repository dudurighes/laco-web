import {Location} from '@angular/common';
import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from 'src/app/core/authentication/session.service';
import {SpinnerLongService} from 'src/app/core/authentication/spinner-long.service';
import {EmpresaAcessoService} from 'src/app/core/services/empresa-acesso/empresa-acesso.service';
import {SnackBarMessageService} from '../components/snack-bar-message/snack-bar-message.service';
import {ItemMenu} from '../models/user/layout.model';
import {LayoutConfigService} from './layout-config.service';
import {OlarkService} from './olark.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  isExpanded = false;

  darkMode: boolean;

  menuCompany = false;

  mobileQuery: MediaQueryList;

  largeScreenQuery: MediaQueryList;

  companyId: string;

  showFiller = false;

  itemMenuList: ItemMenu[];

  loginIsAuth: boolean = false

  isEmpresa: boolean = false;

  isLargeOpen: boolean = false;

  windowScrolled = false;

  windowScrolledLow = false;

  @ViewChild('header', {static: true}) private header: any;
  @ViewChild('drawer', {static: true}) private drawer: any;
  @ViewChild('navprincipal', {static: true}) private navprincipal: any;

  constructor(private location: Location,
              private spinner: SpinnerLongService,
              private sessionService: SessionService,
              private layoutConfigService: LayoutConfigService,
              private empresaAcessoService: EmpresaAcessoService,
              private route: ActivatedRoute,
              private router: Router,
              private _messageService: SnackBarMessageService,
              private olarkService: OlarkService,
              private titleService: Title) {
  }


  ngOnInit() {

    this.layoutConfigService.setSidenav(this.navprincipal);
    this.layoutConfigService.setSideDrawer(this.drawer);

    this.isLargeOpen = this.layoutConfigService.getStateMenuLocalStorage();

    this.loginIsAuth = this.sessionService.getloginIsAuth();

    var empresaId = this.route.firstChild.snapshot.params['empresaId'];
    if (empresaId == null) {

      this.isEmpresa = false;

      this.itemMenuList = this.sessionService.isAdmin() ? [
        /*menu do admin sem selecionar empresa*/
        {
          icon: 'house',
          label: 'Home',
          route: '/private/home',
          principal: false
        },
        {
          icon: 'apartment',
          label: 'Empresas',
          route: '/private/empresa',
          principal: false
        },
        {
          icon: 'group',
          label: 'Usuários',
          route: '/private/usuariosSistema',
          principal: false
        },
        {
          icon: 'badge',
          label: 'Perfis',
          route: '/private/perfil',
          principal: false
        },
        {
          icon: 'view_kanban',
          label: 'Recursos',
          route: '/private/recurso',
          principal: false
        },
        {
          icon: 'settings',
          label: 'Configurações',
          route: '/private/config',
          principal: false
        },


      ] : [
        /*menu com empresa logada*/
        {
          icon: 'login',
          label: 'Acessos',
          route: '/private/home',
          principal: false
        },
        // {
        //   icon: 'badge',
        //   label: 'Empresas',
        //   route: '/private/empresa',
        //   principal: false
        // },
        // {
        //   route: '/private/denuncia',
        //   icon: 'report',
        //   label: 'Denuncias',
        //   principal: false,
        //   // subRecursos: [{
        //   //   icon: 'badge',
        //   //   label: 'Listar',
        //   //   route: '/denuncia/listar',

        //   //
        //   //   principal: false
        //   // },
        //   //   {
        //   //     icon: 'badge',
        //   //     label: 'Cadastrar',
        //   //     route: '/denuncia/cadastro',
        //   //     principal: false
        //   //   }
        //   // ],
        // },
      ]
    } else {
      this.isEmpresa = true;
      /*menu carregado do backend pela table de perfil recurso*/
      this.empresaAcessoService.getLayout().subscribe(
        result => {
          this.itemMenuList = result

          this.layoutConfigService.setMenu(result);

          this.validaRotas(this.router.url);
        }
      );

    }

    this.layoutConfigService.setMenu(this.itemMenuList);

    this.layoutConfigService.setaRotaAtiva(this.router.url);
  }


  validaRotas(url: string) {
    this.layoutConfigService.setaRotaAtiva(url);

    var exist = this.layoutConfigService.validaRota(url);
    if (!exist) {
      this.router.navigateByUrl('/private/home?status=21e56950-0dac-11ed-861d-0242ac120002');
      this._messageService.openSnackBarWarn("Acesso negado")
    }
  }


  get rotaActivated() {
    return this.layoutConfigService.rotaAtiva;
  }

  get emailConfirmado() {
    return this.sessionService.emailConfirmado;
  }

  get title() {
    return this.titleService.getTitle();
  }

  back(): void {
    this.location.back()
  }

  get spinnerIsVisivel() {
    return this.spinner.isVisivel;
  }

  olark() {

    if (this.isEmpresa) {
      this.olarkService.olarkEmpresa();
      return;
    }

    this.olarkService.olark();
  }


  handleScroll(event) {
    this.windowScrolledLow = event.target.scrollTop > 100;

    this.windowScrolled = event.target.scrollTop > 600;
  }

  scrollToTop() {
    const divElement = document.getElementById("container");
    if (divElement) {
      divElement.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

}
