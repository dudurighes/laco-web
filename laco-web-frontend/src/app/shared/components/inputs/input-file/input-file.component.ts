import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Arquivo} from "../../../models/arquivo/arquivo.model";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {

  @Input() parentControl: FormControl;

  @Output() arquivosSelecionados = new EventEmitter<Arquivo[]>();

  arquivoList: Arquivo[] = [];

  constructor() {}

  ngOnInit(): void {

  }

  onFileSelected(event) {

    const files: File[] = event.target.files;

    if (files) {

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64Data = e.target.result.split(',')[1];  // Obtém a parte base64 do Data URL
          const arquivo: Arquivo = {
            id: null,  // Defina o ID como preferir (exemplo: usando o índice do loop + 1)
            dataCadastro: new Date(),  // Defina a data de cadastro como necessário
            nome: file.name,  // Nome do arquivo
            tipo: file.type,  // Tipo do arquivo
            backup: base64Data,  // Conteúdo do arquivo em base64
            urlAmazon: '',  // URL no Amazon (defina conforme necessário)
            nomeOriginal: file.name  // Nome original do arquivo
          };

          this.arquivoList.push(arquivo);

          // Emitir evento com os arquivos selecionados
          if (i === files.length - 1) {
            this.arquivosSelecionados.emit(this.arquivoList);
          }
        };

        reader.readAsDataURL(file);  // Lê o arquivo como Data URL
      }
    }

  }

  removeFile(arquivo: Arquivo) {
    const index = this.arquivoList.indexOf(arquivo);
    if (index >= 0) {
      this.arquivoList.splice(index, 1);
      this.arquivosSelecionados.emit(this.arquivoList);
    }
  }


}
