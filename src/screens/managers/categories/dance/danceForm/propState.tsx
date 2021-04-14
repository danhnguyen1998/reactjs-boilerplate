import { IDanceModel } from '../models';

interface IStateToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IDanceModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IDanceModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IDanceModel) => void;
}

interface IDispatchToProps {
  listKindOfDance?: object[];
  toggleForm?: boolean;
  editData?: IDanceModel;
}

export interface IProps extends IStateToProps, IDispatchToProps {}

export interface IState {
  id: number;
  listKindOfDance: object[];
  loading: boolean;
  toggleForm: boolean;
  fields: { name: string[]; value: string | number }[];
}
