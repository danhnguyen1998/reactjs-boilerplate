import { createAction } from 'redux-actions';
import { IAccountModel } from '../models';

/** action toggle form add/edit */
export type ToggleFormPayload = {
  toggleForm: boolean;
  data: IAccountModel;
};
export const toggleFormAccountAction = createAction<ToggleFormPayload, boolean, IAccountModel>(
  'TOGGLE_FORM_ACCOUNT_ADD_EDIT_ACTION',
  (toggleForm, data) => ({ toggleForm, data }),
);

/** action add new data */
export type AddNewPayload = {
  isNew: boolean;
  data: IAccountModel;
};
export const addNewAccountAction = createAction<AddNewPayload, boolean, IAccountModel>(
  'ADD_NEW_ACCOUNT_ACTION',
  (isNew, data) => ({
    isNew,
    data,
  }),
);

export type UpdatePayload = {
  isUpdate: boolean;
  data: IAccountModel;
};
export const updateAccountAction = createAction<UpdatePayload, boolean, IAccountModel>(
  'UPDATE_ACCOUNT_ACTION',
  (isUpdate, data) => ({
    isUpdate,
    data,
  }),
);
