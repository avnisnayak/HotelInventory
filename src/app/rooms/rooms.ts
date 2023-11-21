export interface RoomInventory {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface RoomDetails {
  roomNumber?: string;
  roomType: string;
  amenities: string;
  price: number;
  photos: string[];
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}
