export type Product ={
    id:number,
    name: string,
    img:string,
    price:number,
    categoria:number,
}

export type Order = {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    rite:number
  };

export type Cliente = {
    cpf:string,
    name:string,
    contact:string
}

export type Command = {
    client:Cliente,
    entry: number,
    id: number,
}

export type Sale = {
    id: number,
    order:Order [],
    vendor: Employee,    
    commands: Command, 
}

export type SaleSummedUp = {
    commands: Command,
    fullValueRate:number,
    fullValue: number,
    order: Order[],
}

export type Employee = {
    id: number,
    function: number,
    name: string,
    password: string,
    userName: string,
}


