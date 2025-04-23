import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmpresaGuard } from 'src/app/core/authentication/auth-empresa.guard';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import {DenunciaListarComponent} from "./denuncia-listar/denuncia-listar.component";
import {DenunciaCadastroComponent} from "./denuncia-cadastro/denuncia-cadastro.component";

const routes: Routes = [

  {
    path: '',
    component: DenunciaListarComponent,
    canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Listar Denúncias',
    },

  },
  {
    path: 'cadastro',
    component: DenunciaCadastroComponent,
    canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Cadastrar Denúncia',
    },

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciaRoutingModule { }
