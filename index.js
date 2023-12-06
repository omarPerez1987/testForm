class Room {
  constructor(name, price, discount, bookings) {
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.bookings = bookings;
  }

  isOccupied(date) {
    const checkDate = Number(date.split("-").reverse().join(""));

    return this.bookings.some((booking) => {
      const checkIn = Number(booking.checkin.split("-").reverse().join(""));
      const checkOut = Number(booking.checkout.split("-").reverse().join(""));

      return checkDate >= checkIn && checkDate <= checkOut;
    });
  }

  occupancyPercentage(startDate, endDate) {
    const introStartDate = Number(startDate.split("-").reverse().join(""));
    const introEndDate = Number(endDate.split("-").reverse().join(""));
    const totalIntro = introEndDate - introStartDate;

    let sumaTotal = 0;

    this.bookings.forEach((booking) => {
      const checkInNum = Number(booking.checkin.split("-").reverse().join(""));
      const checkOutNum = Number(
        booking.checkout.split("-").reverse().join("")
      );
      const duration = checkOutNum - checkInNum + 1;

      if (checkInNum >= introStartDate && checkOutNum <= introEndDate) {
        sumaTotal += duration;
      }
    });

    const percentage = (sumaTotal / totalIntro) * 100;
    return percentage;
  }

  totalOccupancyPercentage(roomsAndBookings, startDate, endDate) {
    const introStartDate = Number(startDate.split("-").reverse().join(""));
    const introEndDate = Number(endDate.split("-").reverse().join(""));
    const totalIntro = introEndDate - introStartDate;
    let sumaTotal = 0;
  
    roomsAndBookings.forEach((room) => {
      room.bookings.forEach((booking) => {
        const checkInNum = Number(booking.checkin.split("-").reverse().join(""));
        const checkOutNum = Number(booking.checkout.split("-").reverse().join(""));
        const duration = checkOutNum - checkInNum + 1;
  
        if (checkInNum >= introStartDate && checkOutNum <= introEndDate) {
          sumaTotal += duration;
        }
      });
    });
  
    const percentage = (sumaTotal / totalIntro) * 100;
    return percentage;
  }

  availableRooms(rooms, startDate, endDate) {
    const introStartDate = Number(startDate.split("-").reverse().join(""));
    const introEndDate = Number(endDate.split("-").reverse().join(""));
    
    const unoccupiedRooms = rooms.filter((room) => {
      const isOccupied = room.bookings.some((booking) => {
        const checkInNum = Number(booking.checkin.split("-").reverse().join(""));
        const checkOutNum = Number(booking.checkout.split("-").reverse().join(""));
        return checkInNum <= introEndDate && checkOutNum >= introStartDate;
      });
  
      return !isOccupied;
    });
  
    return unoccupiedRooms;
  }
}

// **********************************************************************
class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee() {
    const priceRoom = this.room.price;
    const discountRoom = this.room.discount / 100;
    const discountBooking = this.discount / 100;

    const priceRoomWithDiscount = priceRoom - priceRoom * discountRoom;
    const totalFee =
      priceRoomWithDiscount - priceRoomWithDiscount * discountBooking;

    return Number(totalFee.toFixed(2));
  }
}

module.exports = {
  Room,
  Booking,
};
