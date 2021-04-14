export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface IDanceModel {
  id?: number;
  code?: string;
  createdAt?: string;
  nameEN?: string;
  nameVI?: string;
  status?: string;
  updatedAt?: string;
  idKindOfDance?: string;
  KindOfDanceModel?: {
    nameVI?: string;
    nameEN?: string;
  };
}

export class DanceModel implements IDanceModel {
  id: number;
  code: string;
  createdAt: string;
  nameEN: string;
  nameVI: string;
  status: string;
  updatedAt: string;
  idKindOfDance: string;
  KindOfDanceModel: {
    nameVI: string;
    nameEN: string;
  };

  constructor() {
    this.id = 0;
    this.code = '';
    this.createdAt = '';
    this.nameEN = '';
    this.nameVI = '';
    this.status = '';
    this.updatedAt = '';
    this.idKindOfDance = '';
    this.KindOfDanceModel = {
      nameVI: '',
      nameEN: '',
    };
  }
}
