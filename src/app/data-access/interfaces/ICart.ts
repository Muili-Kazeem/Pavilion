import { IUser } from "./IUser"

export interface ICartProduct {
  count: number,
  itemId: string,
  itemName: string,
  brand?: string,
  shortDescription?: string,
  description?: string,
  selectedSize?: string,
  selectedColour?: string,
  price: number,
  inStock: boolean,
  totalPrice?: number
}

export interface ICartDetail {
  cart: ICartProduct[],
  totalAmount: number,
  tax: number,
  client?: IUser,
  message?: string
}
