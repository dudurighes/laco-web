import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { InputsModule } from '../shared/components/inputs/inputs.module';
import { SituacaoLabelModule } from '../shared/components/situacao-label/situacao-label.module';
import { SnackBarMessageModule } from '../shared/components/snack-bar-message/snack-bar-message.module';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { CnaeComponent } from './config/cnae/cnae.component';

@NgModule({
  declarations: [
    HomeComponent,
    ConfigComponent,
    CnaeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InputsModule,
    SituacaoLabelModule,
    SnackBarMessageModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }