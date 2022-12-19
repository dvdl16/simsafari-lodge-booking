import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export class DateValidators {
    static relativeDate(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && c.value !== ""){
                const today = moment();
                const numDays = Math.round(numDaysBetween(c.value, today)) + 1;
                if (( numDays < min) || numDays > max) {
                    return { relativeDate: true };
                }
                return null;
            }
            return null;
        };
    }

    static datesAvailable(
        earlierControlName: string,
        laterControlName: string,
        unavailableDates: moment.Moment[][]): ValidatorFn {
        return (controls: AbstractControl) => {
            const earlierControl = controls.get(earlierControlName);
            const laterControl = controls.get(laterControlName);

            if (!earlierControl || !laterControl) {
                return null;
            }

            if (laterControl.errors && !laterControl.errors['datesAvailable']) {
                return null;
            }

            // Loop through unavailable dates and compare it to the selected dates
            unavailableDates.forEach(element => {
                if (earlierControl.value < element[1]
                    && (laterControl.value > element[0])
                ) {
                    laterControl.setErrors({ datesAvailable: true });
                    return { datesAvailable: true };
                } else {
                    return null;
                }
            });
            return null;
        };
    }
}

let numDaysBetween = function(d1: moment.Moment, d2: moment.Moment) {
    let diff = d1.valueOf() - d2.valueOf();
    return diff / (1000 * 60 * 60 * 24);
};