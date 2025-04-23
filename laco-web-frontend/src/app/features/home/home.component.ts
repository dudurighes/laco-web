import { ConfirmaUsuario } from '../../../shared/models/user/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/core/authentication/session.service';
import { OlarkService } from 'src/app/shared/layout/olark.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutConfigService } from 'src/app/shared/layout/layout-config.service';
import { EmpresaAcessoService } from 'src/app/core/services/empresa-acesso/empresa-acesso.service';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import {ListaAcessoEmpresa, ListaCustomEmpresaAcessos, ListaEmpresa} from 'src/app/shared/models/empresa/empresa.model';
import {EmpresaService} from "../../../core/services/empresa/empresa.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  empresas$: Observable<ListaCustomEmpresaAcessos>;

  usuario: ConfirmaUsuario;

  usuarioId: number;

  constructor(
    private empresaAcessoService: EmpresaAcessoService,
    private empresaService: EmpresaService,
    private sessionService: SessionService,
    private messageService: SnackBarMessageService,
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer,
    private layoutConfigService: LayoutConfigService,
    private router: Router,
    private olarkService: OlarkService,
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.queryParamMap.get('status') == '21e56950-0dac-11ed-861d-0242ac120002') {
      this.messageService.openSnackBarError("Acesso negado ou URL inválida")
      this.router.navigateByUrl('/private/home');
    }

    this.empresas$ = this.empresaService.findAllAcessos();

    this.usuarioId = this.sessionService.user.id;
  }

  logarEmpresa(item: ListaAcessoEmpresa) {
    this.empresaAcessoService.getTokenAcessoEmpresa(item.id).subscribe(
      result => {

        this.sessionService.authenticate(result);

        this.layoutConfigService.setMenu(null);

        this.router.navigateByUrl("private/" + item.tipoEmpresa.toLocaleLowerCase() + "/" + item.id)
      },
      err => {
        this.messageService.openSnackBarError(err.erro.message)
      }
    );
  }

}
