export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface ITypesModel {
  id?: number;
  nameEN?: string;
  nameVI?: string;
  amount?: string;
  unit?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class TypesModel implements ITypesModel {
  id: number;
  nameEN: string;
  nameVI: string;
  amount: string;
  unit: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.id = 0;
    this.nameEN = '';
    this.nameVI = '';
    this.amount = '';
    this.unit = '';
    this.status = '';
    this.createdAt = '';
    this.updatedAt = '';
  }
}
