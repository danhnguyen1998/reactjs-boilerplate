import { IAgeModel } from '../models';

export interface IState {
  id: number;
  visible: boolean;
  fields: { name: string[]; value?: string | number | boolean; checked?: boolean }[];
  loading: boolean;
  isTotalAge: boolean;
  isAddAgeSecond: boolean;
}

interface IDispatchToProps {
  dispatchToggleForm?: (toggleForm: boolean, data: IAgeModel) => void;
  dispatchAddNew?: (isNew: boolean, data: IAgeModel) => void;
  dispatchUpdate?: (isUpdate: boolean, data: IAgeModel) => void;
}

interface IStateToProps {
  toggleForm?: boolean;
  editData?: IAgeModel;
}

export interface IProps extends IStateToProps, IDispatchToProps {}
