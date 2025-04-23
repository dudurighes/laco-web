import { ConfirmaUsuario } from './../../../shared/models/user/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/core/authentication/session.service';
import { OlarkService } from 'src/app/shared/layout/olark.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutConfigService } from 'src/app/shared/layout/layout-config.service';
import { EmpresaAcessoService } from 'src/app/core/services/empresa-acesso/empresa-acesso.service';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { ListaEmpresa } from 'src/app/shared/models/empresa/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa/empresa.service';

@Component({
  selector: 'app-home',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  empresas$: Observable<ListaEmpresa[]>;

  usuario: ConfirmaUsuario;

  usuarioId: number;

  constructor(
  ) { }

  ngOnInit(): void {


  }



}
