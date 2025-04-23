import {InputCnpjComponent} from './input-cnpj/input-cnpj.component';
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppMaterialModule} from "src/app/app-material.module";
import {InputCpfComponent} from "./input-cpf/input-cpf.component";
import {InputDateComponent} from "./input-date/input-date.component";
import {InputEmailListComponent} from "./input-email-list/input-email-list.component";
import {InputPasswordComponent} from "./input-password/input-password.component";
import {InputPhoneListComponent} from "./input-phone-list/input-phone-list.component";
import {InputTextAreaComponent} from "./input-textarea/input-textarea.component";
import {InputComponent} from "./input/input.component";
import {DiretivasModule} from '../diretivas/diretivas.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxMatDatepickerInput, NgxMatDatetimepicker} from "@ngxmc/datetime-picker";
import {InputSelectEnumComponent} from "../input-select/input-select-enum/input-select-enum.component";
import {AutocompleteMunicipioComponent} from "./autocomplete-municipio/autocomplete-municipio.component";
import {AutocompleteTipoDenunciaComponent} from "./autocomplete-tipo-denuncia/autocomplete-tipo-denuncia.component";
import {MatCardModule} from "@angular/material/card";
import {InputFileComponent} from "./input-file/input-file.component";
import {AutocompletePerfilComponent} from "./autocomplete-perfil/autocomplete-perfil.component";
import {
  AutocompleteNaturezaJuridicaComponent
} from "./autocomplete-natureza-juridica/autocomplete-natureza-juridica.component";
import {AutocompleteOrgaoEmissorComponent} from "./autocomplete-orgao-emissor/autocomplete-orgao-emissor.component";
import {AutocompleteCnaeListComponent} from "./autocomplete-atividade-cnae-list/autocomplete-cnae-list.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    DiretivasModule,
    NgxMaskModule,
    NgxMatDatetimepicker,
    NgxMatDatepickerInput,
    MatCardModule
  ],
  declarations: [
    InputDateComponent,
    InputCpfComponent,
    InputEmailListComponent,
    InputTextAreaComponent,
    InputCnpjComponent,
    InputPasswordComponent,
    InputPhoneListComponent,
    InputComponent,
    InputSelectEnumComponent,
    AutocompleteMunicipioComponent,
    AutocompleteTipoDenunciaComponent,
    AutocompleteNaturezaJuridicaComponent,
    AutocompleteOrgaoEmissorComponent,
    AutocompleteCnaeListComponent,
    InputFileComponent,
    AutocompletePerfilComponent,
  ],

  exports: [
    InputTextAreaComponent,
    InputDateComponent,
    InputCpfComponent,
    InputCnpjComponent,
    InputEmailListComponent,
    InputPhoneListComponent,
    InputPasswordComponent,
    InputComponent,
    InputSelectEnumComponent,
    AutocompleteMunicipioComponent,
    AutocompleteTipoDenunciaComponent,
    AutocompleteNaturezaJuridicaComponent,
    AutocompleteOrgaoEmissorComponent,
    AutocompleteCnaeListComponent,
    InputFileComponent,
    AutocompletePerfilComponent,
  ],
})
export class InputsModule { }
