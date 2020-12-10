export interface Product {
  productID?: number;
  path?: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  images?: Array<any>;
}
export class Product {
  constructor(
    productID: number,
    path: string,
    name: string,
    price: number,
    image: string,
    description: string,
    images: Array<any>
  ) {
    this.productID = productID;
    this.path = path;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.images = images;
  }
}
