import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepresentanteLegal } from 'src/app/shared/models/representanteLegal/representanteLegal.model';
import { CpfValidator } from 'src/app/shared/validates/cpf-validator';

@Component({
  selector: 'app-dlg-representante-legal-cadastro',
  templateUrl: './dlg-representante-legal-cadastro.component.html',
  styleUrls: ['./dlg-representante-legal-cadastro.component.scss']
})
export class DlgRepresentanteLegalCadastroComponent implements OnInit {

  respAss: RepresentanteLegal;

  form: FormGroup;

  submitted = false;

  @Output() adicionado = new EventEmitter<RepresentanteLegal>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DlgRepresentanteLegalCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (data != null && data?.representanteLegal != null) {
        this.respAss = this.data.representanteLegal;
      }

      this.form = this.iniciaForm();
    }

  ngOnInit(): void {

  }

  iniciaForm(){
    if(this.respAss){
      return this.formBuilder.group({
        nome: [this.respAss?.nome,[Validators.required]],
        cpf: [this.respAss?.cpf,[Validators.required,  CpfValidator()]],
        rg: [this.respAss?.rg,],
        dataEmissao: [this.respAss?.dataEmissao, ],
        orgaoEmissor: [this.respAss?.orgaoEmissor,],
      })
    }else{
      return this.formBuilder.group({
        nome: ['',[Validators.required]],
        cpf: ['',[Validators.required, CpfValidator()]],
        rg: [undefined, ],
        dataEmissao: [undefined, ],
        orgaoEmissor: [undefined,],
      })
    }
  }

  cancel(){
    this.dialogRef.close(null);
  }

  emit(){

    let respAssinatura: RepresentanteLegal = {
      dataEmissao: this.form.controls.dataEmissao?.value,
      empresaId: null,
      orgaoEmissor: this.form.controls.orgaoEmissor?.value || undefined,
      id: this.respAss ? this.respAss.id : null,
      nome: this.form.controls.nome.value,
      cpf: this.form.controls.cpf.value,
      rg: this.form.controls.rg?.value || undefined
    }

    this.dialogRef.close(respAssinatura);
  }

}
