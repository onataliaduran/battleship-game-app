export class Cells {
    occupied: boolean;
    incorrect: boolean;
    correct: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
