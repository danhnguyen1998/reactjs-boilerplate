export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface IDanceTypeModel {
  id?: number;
  code?: string;
  createdAt?: string;
  descriptionEN?: string;
  descriptionVI?: string;
  nameEN?: string;
  nameVI?: string;
  status?: string;
  updatedAt?: string;
}

export class DanceTypeModel implements IDanceTypeModel {
  id: number;
  code: string;
  createdAt: string;
  descriptionEN: string;
  descriptionVI: string;
  nameEN: string;
  nameVI: string;
  status: string;
  updatedAt: string;

  constructor() {
    this.id = 0;
    this.code = '';
    this.createdAt = '';
    this.descriptionEN = '';
    this.descriptionVI = '';
    this.nameEN = '';
    this.nameVI = '';
    this.status = '';
    this.updatedAt = '';
  }
}
