import { ILevelModel } from '../models';

export interface IProps extends IStateToProps, IDispatchToProps {}

export interface IStateToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: ILevelModel) => void;
  dispatchAddNew?: (isNew: boolean, data: ILevelModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: ILevelModel) => void;
}

export interface IDispatchToProps {
  toggleForm?: boolean;
  editData?: ILevelModel;
  listKindOfDance?: object[];
}

export interface IState {
  id: number;
  toggleForm: boolean;
  fields: { name: string[]; value: string | number[] }[];
  listKindOfDance: Array<object>;
  listDanceByKind: Array<object>;
  loading: boolean;
}
