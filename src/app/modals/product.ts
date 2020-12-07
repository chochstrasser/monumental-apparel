export class Product {
  constructor(
    productID: number,
    path: string,
    name: string,
    price: number,
    image: string,
    description: string
  ) {
    this.productID = productID;
    this.path = path;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  productID?: number;
  path?: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
}
