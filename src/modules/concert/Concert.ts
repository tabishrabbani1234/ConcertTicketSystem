import { Seat } from "./Seat.js";

export class Concert {
    public id: number;
    private seats: Map<number, Seat>;
    private ticketCost: number;
    private artist: string;
    private venue: string;
    private date: string;
    private time: number;
    private waitingList: string[] = [];

    constructor(id: number, capacity: number) {
        this.id = id;
        this.seats = new Map<number, Seat>();
        for (let i = 1; i <= capacity; i++) {
            this.seats.set(i, new Seat(i));
        }
    }

    public getAvailableSeats(): Seat[] {
        return Array.from(this.seats.values()).filter(seat => !seat.isBooked);
    }

    public getConcertDetails() {
        return {
            artist: this.artist,
            venue: this.venue,
            date: this.date,
            time: this.time,
            ticketPrice: this.ticketCost
        };
    }

    public setMetadata(artist: string, venue: string, date: string, time: number, price: number) {
        this.artist = artist;
        this.venue = venue;
        this.date = date;
        this.time = time;
        this.ticketCost = price;
    }

    public bookSeat(seatId: number) {
        const seat = this.seats.get(seatId);
        if (!seat || seat.isBooked) {
            throw new Error("Seat not available");
        }
        seat.book();
        return seat;
    }

    public addToWaitingList(userId: string) {
        this.waitingList.push(userId);
    }

    public getWaitingList(): string[] {
        return this.waitingList;
    }

    public hasAvailableSeats(): boolean {
        return this.getAvailableSeats().length > 0;
    }
}
