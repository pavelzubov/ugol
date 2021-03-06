export class Result {
  name: string;
  price: number;
  tube?: number;
  bank?: number;
  tank?: number;
  barrel?: number;
  remainder?: number;
}

export class Response {
  expenditure: number;
  materials: Object;
  prices: Object;
}
