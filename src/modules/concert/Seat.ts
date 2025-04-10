export class Seat {
    public id: number;
    public isBooked: boolean;

    constructor(id: number) {
        this.id = id;
        this.isBooked = false;
    }

    public book() {
        if (this.isBooked) {
            throw new Error("Seat already booked");
        }
        this.isBooked = true;
    }

    public release() {
        this.isBooked = false;
    }
}
