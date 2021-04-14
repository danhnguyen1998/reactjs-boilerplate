import { createAction } from 'redux-actions';
import { ITypesModel } from '../models';

/** action toggle form add/edit */
export type ToggleFormPayload = {
  toggleForm: boolean;
  data: ITypesModel;
};
export const toggleFormTypesAction = createAction<ToggleFormPayload, boolean, ITypesModel>(
  'TOGGLE_FORM_TYPES_ADD_EDIT_ACTION',
  (toggleForm, data) => ({ toggleForm, data }),
);

/** action add new data */
export type AddNewPayload = {
  isNew: boolean;
  data: ITypesModel;
};
export const addNewTypesAction = createAction<AddNewPayload, boolean, ITypesModel>(
  'ADD_NEW_TYPES_ACTION',
  (isNew, data) => ({
    isNew,
    data,
  }),
);

export type UpdatePayload = {
  isUpdate: boolean;
  data: ITypesModel;
};
export const updateTypesAction = createAction<UpdatePayload, boolean, ITypesModel>(
  'UPDATE_TYPES_ACTION',
  (isUpdate, data) => ({
    isUpdate,
    data,
  }),
);
