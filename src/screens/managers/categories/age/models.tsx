export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface IAgeModel {
  id?: number;
  nameVI?: string;
  nameEN?: string;
  fromAgeOne?: string;
  toAgeOne?: string;
  fromAgeSecond?: string;
  toAgeSecond?: string;
  isTotalAge?: number;
  totalAge?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class AgeModel implements IAgeModel {
  id?: number;
  nameVI?: string;
  nameEN?: string;
  toAgeOne?: string;
  fromAgeOne?: string;
  fromAgeSecond?: string;
  toAgeSecond?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  isTotalAge?: number;

  constructor() {
    this.id = 0;
    this.nameVI = '';
    this.nameEN = '';
    this.fromAgeOne = '';
    this.toAgeOne = '';
    this.fromAgeSecond = '';
    this.toAgeSecond = '';
    this.status = '';
    this.createdAt = '';
    this.updatedAt = '';
    this.isTotalAge = 0;
  }
}
