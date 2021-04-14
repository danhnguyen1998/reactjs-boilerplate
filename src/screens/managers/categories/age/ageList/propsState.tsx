import { AgeModel, IAgeModel } from '../models';

interface IStateToProps {
  isNew?: boolean;
  newData?: AgeModel;
  isUpdate?: boolean;
}

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IAgeModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IAgeModel) => void;
  dispatchUpdate?: (isNew: boolean, data: IAgeModel) => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
  search: string;
}

export interface IState {
  data: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}
