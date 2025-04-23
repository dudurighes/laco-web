import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Cronograma } from 'src/app/shared/models/agendarGuia/guiaAgenda.model';

const monthNames = {
  'janeiro': '01',
  'fevereiro': '02',
  'março': '03',
  'abril': '04',
  'maio': '05',
  'junho': '06',
  'julho': '07',
  'agosto': '08',
  'setembro': '09',
  'outubro': '10',
  'novembro': '11',
  'dezembro': '12',
};

@Component({
  selector: 'app-calendar-open',
  templateUrl: './calendar-open.component.html',
  styleUrls: ['./calendar-open.component.scss']
})
export class CalendarOpenComponent implements OnInit {

  @Input() callback: Function;

  date: Date = new Date();
  

  @Input() dates:Cronograma[] = [];


  //angular detecta mudanças no input e chama 

  ngOnInit() {

    this.callback(this.dateToString(this.date));
    
   }

  onDateSelected(date: moment.Moment){

    const dateSearch = date.format("YYYY-MM-DD");

    this.callback(dateSearch);
  }

  dateClass = (date: moment.Moment): MatCalendarCellCssClasses => {
    if (date.date() == 1) {
      this.displayMonth();
    }
    const dateSearch = date.format("YYYY-MM-DD");

    return this.dates.find(f => f.dataAgendamento == dateSearch)
      ? "custom-date-class"
      : "normal";
  };

  constructor(private renderer: Renderer2) { }

  displayMonth() {
    setTimeout(() => {
      let x = document.querySelectorAll(".mat-calendar-body-cell");

      x.forEach(async y => {
        const dateSearch = y.getAttribute("aria-label")

        const dateParts = dateSearch.split(' ');

        const monthNumber = monthNames[dateParts[2].toLowerCase()];

        const formattedDate = `${dateParts[4]}-${monthNumber}-${dateParts[0].length == 1 ? '0' + dateParts[0] : dateParts[0]}`;

        const data = this.dates.find(f => f.dataAgendamento ==  formattedDate);

        if (data) {
          const div = this.renderer.createElement('div');
          const text = this.renderer.createText(data.quantidade.toString());
          this.renderer.appendChild(div, text);
          this.renderer.addClass(div, 'calendar-badge');
          this.renderer.appendChild(y, div);
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      });
    });
  }

  dateToString(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

}
