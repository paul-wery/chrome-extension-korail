export interface BookingModel {
  // train
  departureDate: number;
  from: string;
  to: string;
  trainType: string;
  trainClass: string;

  // passenger
  gender: string;
  firstName: string;
  lastName: string;
  country: string;
  password: string;
  email: string;
  koreanCreditCard: string;
}
