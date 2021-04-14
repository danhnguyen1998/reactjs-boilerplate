import { IAccountModel } from '../models';

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IAccountModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IAccountModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IAccountModel) => void;
}

interface IStateToProps {
  toggleForm?: boolean;
  editData?: IAccountModel;
}

export interface IProps extends IStateToProps, IDispatchToProps {}

export interface IState {
  id: number;
  toggleForm: boolean;
  fields: { name: string[]; value: string | number }[];
  loading: boolean;
}
