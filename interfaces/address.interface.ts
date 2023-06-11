export interface IEachProvinceData {
  id: number;
  name: string;
}

export interface IEachCityData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  province: IEachProvinceData;
}

export interface IEachAddressOfUserData {
  id: number;
  name: string;
  phone: string;
  distance: number;
  description: string;
  city: IEachCityData;
  default: boolean;
}
export interface IShippingCostResponse {
  value: number;
}
