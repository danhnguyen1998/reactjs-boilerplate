import { ILevelModel } from '../models';

export interface IState {
  listLevel: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}

export interface IStateToProps {
  isNew?: boolean;
  newData?: ILevelModel;
  isUpdate?: boolean;
}

export interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: ILevelModel) => void;
  dispatchAddNew?: (isNew: boolean, data: ILevelModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: ILevelModel) => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  search: string;
}
