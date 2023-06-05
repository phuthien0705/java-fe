export interface IEachAddressOfUserData {
  city: string;
  distance: number;
  id: string;
  isDefault: boolean;
  name: string;
  phone: string;
  userId: string;
  cityId: {
    lat: number;
    lng: number;
    name: string;
    province: string;
    id: string;
  };
  description: string;
}
export interface IShippingCostResponse {
  value: number;
}
