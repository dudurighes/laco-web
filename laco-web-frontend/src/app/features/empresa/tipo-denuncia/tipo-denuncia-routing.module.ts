import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmpresaGuard } from 'src/app/core/authentication/auth-empresa.guard';
import {TipoDenunciaListarComponent} from "./tipo-denuncia-listar/tipo-denuncia-listar.component";
import {TipoDenunciaCadastroComponent} from "./tipo-denuncia-cadastro/tipo-denuncia-cadastro.component";

const routes: Routes = [

  {
    path: '',
    component: TipoDenunciaListarComponent,
    canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Listar Tipos de Denúncias',
    },

  },
  {
    path: 'cadastro',
    component: TipoDenunciaCadastroComponent,
    canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Cadastrar Tipo Denúncia',
    },

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDenunciaRoutingModule { }
