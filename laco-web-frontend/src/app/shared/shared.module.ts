import {InputsModule} from './components/inputs/inputs.module';
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxMaskModule} from "ngx-mask";
import {AppMaterialModule} from "../app-material.module";
import {ButtonsModule} from './components/buttons/buttons.module';
import {DiretivasModule} from './components/diretivas/diretivas.module';
import {SnackBarMessageModule} from "./components/snack-bar-message/snack-bar-message.module";
import {AppHeaderComponent} from "./layout/app-header/app-header.component";
import {LayoutComponent} from "./layout/layout.component";
import {LayoutModule} from "./layout/layout.module";
import {SituacaoLabelModule} from "./components/situacao-label/situacao-label.module";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {NgxMatDatetimepicker} from "@ngxmc/datetime-picker";
import {MatRadioModule} from "@angular/material/radio";
import {ConfirmDialogComponent} from "./components/dialog/confirm-dialog/confirm-dialog.component";
import {
  DlgRepresentanteLegalCadastroComponent
} from "./components/dialog-representante-legal-cadastro/dlg-representante-legal-cadastro.component";
import {
  SelectRepresentanteLegalCadastroComponent
} from "./components/select-representante-legal-cadastro/select-representante-legal-cadastro.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    NgxMaskModule,
    FlexLayoutModule,
    RouterModule,
    SnackBarMessageModule,
    DiretivasModule,
    ButtonsModule,
    InputsModule,
    LayoutModule,
    SituacaoLabelModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimepicker,
    MatRadioModule,
  ],
  declarations: [
    LayoutComponent,
    AppHeaderComponent,
    SelectRepresentanteLegalCadastroComponent,
    DlgRepresentanteLegalCadastroComponent,
  ],
  exports: [
    ButtonsModule,
    SituacaoLabelModule,
    DiretivasModule,
    SelectRepresentanteLegalCadastroComponent,
    DlgRepresentanteLegalCadastroComponent,
  ],
  providers: [
    {provide: 'LOCALSTORAGE', useValue: window.localStorage},
  ]

})
export class SharedModule {
}
