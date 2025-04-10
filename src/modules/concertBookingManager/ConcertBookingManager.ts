import { Concert } from "../concert/Concert.js";
import { Reservation } from "../reservation/Reservation.js";

export class ConcertBookingManager {
    private static instance: ConcertBookingManager;
    private concerts: Map<number, Concert>;
    private reservations: Map<number, Reservation>;
    private reservationCount: number;

    private constructor() {
        this.concerts = new Map<number, Concert>();
        this.reservations = new Map<number, Reservation>();
        this.reservationCount = 0;
    }

    public static getInstance(): ConcertBookingManager {
        if (!ConcertBookingManager.instance) {
            ConcertBookingManager.instance = new ConcertBookingManager();
        }
        return ConcertBookingManager.instance;
    }

    public addConcert(concert: Concert) {
        this.concerts.set(concert.id, concert);
    }

    public searchConcerts(criteria: Partial<{ artist: string; venue: string; date: string; time: number }>): Concert[] {
        return Array.from(this.concerts.values()).filter(concert => {
            const details = concert.getConcertDetails();
            return (!criteria.artist || criteria.artist === details.artist)
                && (!criteria.venue || criteria.venue === details.venue)
                && (!criteria.date || criteria.date === details.date)
                && (!criteria.time || criteria.time === details.time);
        });
    }

    public makeReservation(concertId: number, seatId: number, userId: string) {
        const concert = this.concerts.get(concertId);
        if (!concert) {
            throw new Error("Invalid concert ID");
        }

        try {
            concert.bookSeat(seatId);
            this.reservationCount++;
            const reservation = new Reservation(this.reservationCount.toString(), concertId.toString());
            this.reservations.set(this.reservationCount, reservation);

            this.sendConfirmation(userId, concertId, seatId);
        } catch (err) {
            concert.addToWaitingList(userId);
            console.log(`User ${userId} added to waiting list`);
            throw err;
        }
    }

    private sendConfirmation(userId: string, concertId: number, seatId: number) {
        console.log(`Booking confirmed! User: ${userId}, Concert: ${concertId}, Seat: ${seatId}`);
    }
}
