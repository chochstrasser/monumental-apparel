export interface CartProduct {
  productID?: number;
  path?: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  quantity?: number;
}

export class CartProduct {
  constructor(
    productID?: number,
    path?: string,
    name?: string,
    price?: number,
    image?: string,
    description?: string,
    quantity?: number
  ) {
    this.productID = productID;
    this.path = path;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
  }
}
