import { Concert } from "../concert/Concert.js";
import { ConcertBookingManager } from "../concertBookingManager/ConcertBookingManager.js";

// STEP 1: Create a concert with 2 seats
const concert = new Concert(1, 2);
concert.setMetadata("Taylor Swift", "Wembley Stadium", "2025-06-20", 1900, 150);

// STEP 2: Get instance of booking manager and add concert
const bookingManager = ConcertBookingManager.getInstance();
bookingManager.addConcert(concert);

// STEP 3: Search for the concert
console.log("\n--- Searching for Taylor Swift concerts ---");
const results = bookingManager.searchConcerts({ artist: "Taylor Swift" });
results.forEach(c => {
    console.log("Found Concert:", c.getConcertDetails());
});

// STEP 4: Book seat 1 for user A
console.log("\n--- Booking seat 1 for userA ---");
try {
    bookingManager.makeReservation(1, 1, "userA");
} catch (err) {
    console.error(err.message);
}

// STEP 5: Book seat 1 again (should fail and add to waiting list)
console.log("\n--- Attempt to book seat 1 again for userB (should go to waiting list) ---");
try {
    bookingManager.makeReservation(1, 1, "userB");
} catch (err) {
    console.error(err.message);
}

// STEP 6: Book seat 2 for userC
console.log("\n--- Booking seat 2 for userC ---");
try {
    bookingManager.makeReservation(1, 2, "userC");
} catch (err) {
    console.error(err.message);
}

// STEP 7: Attempt another booking when full (no seats left)
console.log("\n--- Attempt to book seat 3 (non-existent) for userD ---");
try {
    bookingManager.makeReservation(1, 3, "userD");
} catch (err) {
    console.error(err.message);
}

// STEP 8: Show waiting list
console.log("\n--- Current waiting list ---");
console.log(concert.getWaitingList());
