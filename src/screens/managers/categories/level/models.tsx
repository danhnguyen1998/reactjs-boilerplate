export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface ILevelModel {
  id?: number;
  nameEN?: string;
  nameVI?: string;
  status?: string;
  kindOfDanceId?: string;
  idDances?: string;
  KindOfDanceModel?: {
    nameVI?: string;
    nameEN?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export class LevelModel implements ILevelModel {
  id: number;
  nameEN: string;
  nameVI: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  kindOfDanceId: string;
  idDances: string;
  KindOfDanceModel: {
    nameVI: string;
    nameEN: string;
  };

  constructor() {
    this.id = 0;
    this.nameEN = '';
    this.nameVI = '';
    this.status = '';
    this.createdAt = '';
    this.updatedAt = '';
    this.kindOfDanceId = '';
    this.idDances = '';
    this.KindOfDanceModel = {
      nameVI: '',
      nameEN: '',
    };
  }
}
