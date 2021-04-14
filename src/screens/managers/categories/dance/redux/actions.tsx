import { createAction } from 'redux-actions';
import { IDanceModel } from '../models';

/** action toggle form add/edit */
export type ToggleFormPayload = {
  toggleForm: boolean;
  data: IDanceModel;
};
export const toggleFormDanceAction = createAction<ToggleFormPayload, boolean, IDanceModel>(
  'TOGGLE_FORM_DANCE_ADD_EDIT_ACTION',
  (toggleForm, data) => ({ toggleForm, data }),
);

/** action add new data */
export type AddNewPayload = {
  isNew: boolean;
  data: IDanceModel;
};
export const addNewDanceAction = createAction<AddNewPayload, boolean, IDanceModel>(
  'ADD_NEW_DANCE_ACTION',
  (isNew, data) => ({
    isNew,
    data,
  }),
);

export type UpdatePayload = {
  isUpdate: boolean;
  data: IDanceModel;
};
export const updateDanceAction = createAction<UpdatePayload, boolean, IDanceModel>(
  'UPDATE_DANCE_ACTION',
  (isUpdate, data) => ({
    isUpdate,
    data,
  }),
);
