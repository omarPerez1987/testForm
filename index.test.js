const rooms = require("./JSON/rooms.json");
const bookings = require("./JSON/bookings.json");
const roomsAndBookings = require("./JSON/roomsAndBookings.json");

const { Room, Booking } = require("./index");

describe("Clase Room", () => {
  describe("Método isOccupied", () => {
    test("devuelve falso si no está ocupado", () => {
      const room = new Room(
        rooms[0].room,
        rooms[0].price,
        rooms[0].discount,
        [bookings[0]] //checkin: 05-12-2022, checkout: 12-12-2022
      );
      expect(room.isOccupied("25-12-2022")).toBe(false);
    });

    test("devuelve verdadero si está ocupado", () => {
      const room = new Room(
        rooms[0].room,
        rooms[0].price,
        rooms[0].discount,
        [bookings[0]] //checkin: 05-12-2022, checkout: 12-12-2022
      );
      expect(room.isOccupied("10-12-2022")).toBe(true);
    });
  });

  describe("Método occupancyPercentage", () => {
    test("devuelve el porcentaje de días con ocupación dentro del rango de fechas proporcionadas (inclusive)", () => {
      const room = new Room(
        rooms[0].room,
        rooms[0].price,
        rooms[0].discount,
        bookings
      );
      const percentage = room.occupancyPercentage("01-01-2023", "31-12-2023");
      expect(percentage).toBeGreaterThan(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    test("devuelve 0 si el porcentaje de dias esta fuera de rango", () => {
      const room = new Room(
        rooms[0].room,
        rooms[0].price,
        rooms[0].discount,
        bookings
      );
      const percentage = room.occupancyPercentage("01-01-2000", "31-12-2000");
      expect(percentage).toBe(0);
    });
  });

  describe("Método totalOccupancyPercentage", () => {
    test("debería calcular correctamente el porcentaje de ocupación total en todas las habitaciones", () => {
      const room = new Room(rooms[0].room, rooms[0].price, rooms[0].discount);
      const percentage = room.totalOccupancyPercentage(
        roomsAndBookings,
        "01-01-2022",
        "31-12-2022"
      );
      expect(percentage).toBeGreaterThan(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    test("devuelve 0 si el porcentaje de dias de todas las habitaciones esta fuera de rango", () => {
      const room = new Room(rooms[0].room, rooms[0].price, rooms[0].discount);
      const percentage = room.totalOccupancyPercentage(
        roomsAndBookings,
        "01-01-2000",
        "31-12-2000"
      );
      expect(percentage).toBe(0);
    });
  });

  describe("Método availableRooms", () => {
    test("debería identificar correctamente las habitaciones que no están ocupadas durante toda la duración", () => {
      const room = new Room(rooms[0].room, rooms[0].price, rooms[0].discount);
      const percentage = room.availableRooms(
        roomsAndBookings,
        "01-01-2021",
        "31-12-2023"
      );
      const arrayResult = [
        {
          photo: "http://dummyimage.com/155x77.png/cc0000/ffffff",
          id: "98poe",
          room: "Deluxe A - 13",
          bed: "Double Bed",
          facilities: ["Swimming Pool", "Air Conditioned", "Breakfast"],
          description: "a feugiat et eros vestibulum",
          price: 145,
          discount: 20,
          cancel: "vivamus in felis",
          status: "Booked",
          bookings: [
            {
              name: "Sonny Abele",
              id: "sxtw5234",
              orderDate: "06-Jun-2024",
              orderTime: "2:16 PM",
              checkin: "01-11-2024",
              checkinTime: "11:56 PM",
              checkout: "02-11-2024",
              checkoutTime: "2:05 AM",
              notes: "",
              idRoom: "98poe",
              discount: 10,
              check: "in",
            },
            {
              name: "Erin Farreil",
              id: "ssvb541",
              orderDate: "28-Dec-2023",
              orderTime: "4:40 PM",
              checkin: "03-04-2024",
              checkinTime: "5:57 PM",
              checkout: "23-04-2024",
              checkoutTime: "1:06 AM",
              notes:
                "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. nulla nisl. Nunc nisl.",
              idRoom: "9863mlk",
              discount: 20,
              check: "pending",
            },
          ],
        },
      ];
      expect(percentage).toEqual(arrayResult);
    });
  });
});

// *****************************************************************************

describe("Clase Booking", () => {
  describe("deberia retornarme aplicando los 2 descuentos = 104.40", () => {
    const booking = new Booking(
      bookings[0].name,
      bookings[0].email,
      bookings[0].checkIn,
      bookings[0].checkOut,
      bookings[0].discount, //discount 10
      rooms[0] //price 145, discount 20
    );
    expect(booking.getFee()).toBe(104.4);
  });
});
