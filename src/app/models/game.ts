export class Game {
    difficulty: string;
    status: string;
    result: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
