export interface IProduct {
  id: string,
  name: string,
  brand?: string,
  shortDescription?: string,
  description?: string,
  sizes?: string[],
  colours?: string[],
  price: number,
  inStock: boolean,
}
