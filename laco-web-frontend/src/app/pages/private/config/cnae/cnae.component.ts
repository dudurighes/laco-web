import {Component, OnInit} from '@angular/core';
import {SecaoCnaeService} from "../../../../core/services/cnae/secao-cnae.service";
import {DivisaoCnaeService} from "../../../../core/services/cnae/divisao-cnae.service";
import {catchError, EMPTY, finalize, from, Observable, switchMap, throwError} from 'rxjs';
import { concatMap } from 'rxjs/operators';
import {SnackBarMessageService} from "../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {GrupoCnaeService} from "../../../../core/services/cnae/grupo-cnae.service";
import {ClasseCnaeService} from "../../../../core/services/cnae/classe-cnae.service";
import {SubclasseCnaeService} from "../../../../core/services/cnae/subclasse-cnae.service";

@Component({
  selector: 'app-cnae',
  templateUrl: './cnae.component.html',
  styleUrls: ['./cnae.component.scss']
})
export class CnaeComponent implements OnInit {

  progress = 0;

  constructor(
    private secaoCnaeService: SecaoCnaeService,
    private divisaoCnaeService: DivisaoCnaeService,
    private grupoCnaeService: GrupoCnaeService,
    private classeCnaeService: ClasseCnaeService,
    private subclasseCnaeService: SubclasseCnaeService,
    private messageService: SnackBarMessageService,
  ) {
  }

  ngOnInit(): void {

  }

  importCnae(): void {
    const tasks = [
      () => this.importSecao(),
      () => this.importDivisao(),
      () => this.importGrupo(),
      () => this.importClasse(),
      () => this.importSubclasse(),
    ];

    const totalTasks = tasks.length;
    let completedTasks = 0;

    from(tasks).pipe(
      concatMap(task => task().pipe(
        catchError(error => {
          this.messageService.openSnackBarError( 'Erro ao conectar na API!');
          return throwError(error);
        }),
        finalize(() => {
          completedTasks++;
          this.progress = (completedTasks / totalTasks) * 100;
        })
      ))
    ).subscribe({
      complete: () => {
        this.messageService.openSnackBarSuccess("CNAES importados com sucesso!");
        this.progress = 0;
      }
    });
  }

  importSecao(): Observable<any> {
    return this.secaoCnaeService.getAllSecaoCnae().pipe(
      switchMap(data => {
        if (data === undefined) {
          return throwError(() => new Error('Não foi possível conectar ao servidor.'));
        }
        return this.secaoCnaeService.saveSecao(data);
      }),
      catchError(error => {
        return EMPTY;
      })
    );
  }

  importDivisao(): Observable<any> {
    return this.divisaoCnaeService.getAllDivisaoCnae().pipe(
      concatMap(data => this.divisaoCnaeService.saveDivisao(data)),
    );
  }

  importGrupo(): Observable<any> {
    return this.grupoCnaeService.getAllGrupoCnae().pipe(
      concatMap(data => this.grupoCnaeService.saveGrupo(data)),
    );
  }

  importClasse(): Observable<any> {
    return this.classeCnaeService.getAllClasseCnae().pipe(
      concatMap(data => this.classeCnaeService.saveClasse(data)),
    );
  }

  importSubclasse(): Observable<any> {
    return this.subclasseCnaeService.getAllSubclasseCnae().pipe(
      concatMap(data => this.subclasseCnaeService.saveSubclasse(data)),
    );
  }
}
