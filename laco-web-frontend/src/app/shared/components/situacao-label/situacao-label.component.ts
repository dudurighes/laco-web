import { Component, Input, OnInit } from '@angular/core';
import {Situacao, SituacaoEnum} from "../../models/enuns/situacao.enum";

@Component({
  selector: 'app-situacao-label',
  templateUrl: './situacao-label.component.html',
  styleUrls: ['./situacao-label.component.scss']
})
export class SituacaoLabelComponent implements OnInit {
  @Input() situacaoKey: string;
  situacao: Situacao;

  ngOnInit() {
    this.situacao = SituacaoEnum[this.situacaoKey];
    if (!this.situacao) {
      throw new Error(`Situação desconhecida: ${this.situacaoKey}`);
    }
  }
}
