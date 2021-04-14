import { IDanceTypeModel } from '../models';

interface IStateToProps {
  isNew?: boolean;
  newData?: IDanceTypeModel;
  isUpdate?: boolean;
}

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IDanceTypeModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IDanceTypeModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IDanceTypeModel) => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  search: string;
}

export interface IState {
  listDanceType: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}
