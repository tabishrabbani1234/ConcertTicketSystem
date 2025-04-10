export class Reservation {
    public id: string;
    private concertId: string;

    constructor(id, concertId) {
        this.id = id;
        this.concertId = concertId;
    }

    public getConcertId() {
        return this.concertId;
    }
}