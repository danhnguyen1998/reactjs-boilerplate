import { IAgeModel } from '../models';

export type ActionState = {
  toggleForm: boolean;
  data: IAgeModel;
  isNew: boolean;
  isUpdate: boolean;
};
