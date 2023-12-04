class Room {
  constructor(name, price, discount, bookings) {
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.bookings = bookings;
  }

  isOccupied(date) {
    const checkDate = Number(date.split("-").join(""));

    return this.bookings.some((booking) => {
      const checkIn = Number(booking.checkin.split("-").join(""));
      const checkOut = Number(booking.checkout.split("-").join(""));

      return checkDate >= checkIn && checkDate <= checkOut;
    });
  }

  occupancyPercentage(startDate, endDate) {
  //   const introStartDate = Number(startDate.split("-").join(""));
  //   const introEndDate = Number(endDate.split("-").join(""));
  
  //   const checkIn = Number(this.bookings[0].checkin.split("-").join(""));
  //   const checkOut = Number(this.bookings[0].checkout.split("-").join(""));

  //   const totalIntro = introEndDate - introStartDate;
  //   const totalCheck = checkOut - checkIn;
  
  //   const percentage = (totalIntro / totalCheck);
  //   return percentage;
  }

  totalOccupancyPercentage(rooms, startDate, endDate) {}

  availableRooms(rooms, startDate, endDate) {}
}

// **********************************************************************
class Booking {
  constructor(name, email, checkIn, checkOut, room, discount = 0) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.room = room;
    this.discount = discount;
  }

  get fee() {}
}

module.exports = {
  Room,
  Booking,
};
