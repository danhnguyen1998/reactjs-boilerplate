import { ITypesModel } from '../models';

interface IStateToProps {
  isNew?: boolean;
  newData?: ITypesModel;
  isUpdate?: boolean;
}

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: ITypesModel) => void;
  dispatchAddNew?: (isNew: boolean, data: ITypesModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: ITypesModel) => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  search: string;
}

export interface IState {
  listTypes: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}
