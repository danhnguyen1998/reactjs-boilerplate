import { IAccountModel } from '../models';

interface IStateToProps {
  isNew?: boolean;
  newData?: IAccountModel;
  isUpdate?: boolean;
}

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IAccountModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IAccountModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IAccountModel) => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  search: string;
}

export interface IState {
  listAccount: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}
