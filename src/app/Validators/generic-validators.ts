import { FormControl } from "@angular/forms";

export class GenericValidators {
    static isNotNumber(control: FormControl): {[s: string]: boolean} | null {
        if (typeof +control.value === "number" && !isNaN(+control.value)) {
            return null;
        } else {
            return {isNotNumber: true};
        }
    }
}