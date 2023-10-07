
export interface User{
  accessToken: string;
  displayName: string;
  email: string;
  expires: number;
  expires_in: number;
  familyName: string;
  givenName: string;
  idToken: string;
  imageUrl: string;
  serverAuthCode: string;
  userId: string;
}

export interface NewUser{
  email?: string;
  displayName?: string,
  uid?: string;
  signature?: string;
  newUser?: boolean;
  tokenId?: string;
  nombres?: string;
  apellidos?: string;
  binanceEmail?: string;
  birthdayString?: string;
  direcciones?: Direcciones[];
}

export interface Direcciones{
  city?: City;
  codigoPostal?: string;
  flagImg?: string[];
  direccionText?: string;
  nombreDireccion?: string;
  nombrePersonaRecibe?: string;
  telefono?: string;
}

export interface City{
  admin_name: string;
  admin_name_ascii: string;
  capital: string;
  city: string;
  city_ascii: string;
  country: string;
  id: string;
  iso2: string;
  iso3: string;
  lat: string;
  lng: string;
  population: string;
}

export interface Location{
  city: LocationData;
  country: LocationData;
  state: LocationData;
}

export interface LocationData {
  id: any;
  name: string;
};

export interface Store{
  products: Product[];
  storeId: number;
}

export interface CartData{
  product: Product;
  storeId: number;
}

export interface Product{
  _id: number;
  amount?: number;
  nombre?: string;
  price?: number;
  rating?: number;
  descripcion?: string;
  imgUrl?: string
}