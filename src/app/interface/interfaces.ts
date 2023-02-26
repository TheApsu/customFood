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
  id: number;
  quantity?: number;
}