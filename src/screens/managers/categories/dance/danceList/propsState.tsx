import { IDanceModel } from '../models';

interface IStateToProps {
  isNew?: boolean;
  newData?: IDanceModel;
  isUpdate?: boolean;
}

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IDanceModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IDanceModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IDanceModel) => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  search: string;
}

export interface IState {
  listDance: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}
