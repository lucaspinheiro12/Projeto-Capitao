export type Product ={
    id:number,
    price:number,
    categoria:string,
    name: string,
}

export type Order = {
    id: number;
    product: Product;
    quantity: number;
    price: number;
  };