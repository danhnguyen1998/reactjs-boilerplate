export interface SearchParams {
  search: string;
  pageNumber: number;
}

export interface IAccountModel {
  id?: number;
  name?: string;
  userName?: string;
  role?: string;
  unitWork?: string;
  nameVI?: string;
  addressVI?: string;
  address?: string;
  references?: string;
  phoneNumber?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class AccountModel implements IAccountModel {
  id: number;
  name: string;
  userName: string;
  role: string;
  unitWork: string;
  nameVI: string;
  addressVI: string;
  address: string;
  references: string;
  phone: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.userName = '';
    this.role = '1';
    this.unitWork = '';
    this.nameVI = '';
    this.addressVI = '';
    this.address = '';
    this.references = '';
    this.phone = '';
    this.email = '';
    this.status = '';
    this.createdAt = '';
    this.updatedAt = '';
  }
}
