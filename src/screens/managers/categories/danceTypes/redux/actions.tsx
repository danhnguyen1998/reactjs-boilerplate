import { createAction } from 'redux-actions';
import { IDanceTypeModel } from '../models';

/** action toggle form add/edit */
export type ToggleFormPayload = {
  toggleForm: boolean;
  data: IDanceTypeModel;
};
export const toggleFormAction = createAction<ToggleFormPayload, boolean, IDanceTypeModel>(
  'TOGGLE_FORM_ADD_EDIT_ACTION',
  (toggleForm, data) => ({ toggleForm, data }),
);

/** action add new data */
export type AddNewDanceTypePayload = {
  isNew: boolean;
  data: IDanceTypeModel;
};
export const addNewAction = createAction<AddNewDanceTypePayload, boolean, IDanceTypeModel>(
  'ADD_NEW_ACTION',
  (isNew, data) => ({
    isNew,
    data,
  }),
);

export type UpdatePayload = {
  isUpdate: boolean;
  data: IDanceTypeModel;
};
export const updateAction = createAction<UpdatePayload, boolean, IDanceTypeModel>(
  'UPDATE_ACTION',
  (isUpdate, data) => ({
    isUpdate,
    data,
  }),
);
