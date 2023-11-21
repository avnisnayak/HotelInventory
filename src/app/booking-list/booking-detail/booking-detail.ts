// export interface RoomInventory {
//   totalRooms: number;
//   availableRooms: number;
//   bookedRooms: number;
// }


export interface Booking {
  bookingId: string;
  roomId: string;
  guestEmail: string;
  checkinDate: Date;
  checkoutDate: Date;
  bookingStatus: string;
  bookingAmount: number;
  bookingDate: Date;
  mobileNumber: string;
  guestName: string;
  guestAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  // guestCount: number;
  guestList: { name: string; age: string }[];
}
