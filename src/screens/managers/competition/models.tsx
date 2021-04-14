export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface ICompetitionModel {
  id?: number;
  code?: string;
  nameEN?: string;
  nameVI?: string;
  danceType?: string;
  dance?: string;
  rank?: string;
  age?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class TournamentModel implements ICompetitionModel {
  id: number;
  code: string;
  nameEN: string;
  nameVI: string;
  danceType: string;
  dance: string;
  rank: string;
  age: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.id = 0;
    this.code = '';
    this.nameEN = '';
    this.nameVI = '';
    this.danceType = '';
    this.dance = '';
    this.rank = '';
    this.age = '';
    this.status = '';
    this.createdAt = '';
    this.updatedAt = '';
  }
}
