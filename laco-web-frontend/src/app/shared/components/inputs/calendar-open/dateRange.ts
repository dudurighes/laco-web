import { Injectable } from '@angular/core';
import { DateRange, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Injectable()
export class DateRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<Date> {
    constructor(private _dateAdapter: DateAdapter<D>) { }

    selectionFinished(date: Date, currentRange: DateRange<Date>, event: Event): DateRange<Date> {
        if (!currentRange) {
            return new DateRange(date, null);
        } else if (currentRange.start && !currentRange.end && date > currentRange.start) {

            return new DateRange(currentRange.start, date);
        } else {
            return new DateRange(date, null);
        }
    }

    createPreview(activeDate: Date, currentRange: DateRange<Date>, event: Event): DateRange<Date> {
        if (!currentRange) {
            return new DateRange(activeDate, null);
        } else {
            return new DateRange(currentRange.start, activeDate);
        }
    }
}
