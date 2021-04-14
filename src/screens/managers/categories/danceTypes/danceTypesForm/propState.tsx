import { IDanceTypeModel } from '../models';

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IDanceTypeModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IDanceTypeModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IDanceTypeModel) => void;
}

interface IStateToProps {
  toggleForm?: boolean;
  editData?: IDanceTypeModel;
}

export interface IProps extends IStateToProps, IDispatchToProps {}

export interface IState {
  id: number;
  toggleForm: boolean;
  fields: { name: string[]; value: string }[];
  loading: boolean;
}
