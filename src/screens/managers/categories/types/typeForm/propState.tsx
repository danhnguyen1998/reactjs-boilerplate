import { ITypesModel } from '../models';

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: ITypesModel) => void;
  dispatchAddNew?: (isNew: boolean, data: ITypesModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: ITypesModel) => void;
}

interface IStateToProps {
  toggleForm?: boolean;
  editData?: ITypesModel;
}

export interface IProps extends IStateToProps, IDispatchToProps {}

export interface IState {
  id: number;
  toggleForm: boolean;
  fields: { name: string[]; value: string | number }[];
  loading: boolean;
}
