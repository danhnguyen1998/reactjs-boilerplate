import { createAction } from 'redux-actions';
import { ILevelModel } from '../models';

/** action toggle form add/edit */
export type ToggleFormPayload = {
  toggleForm: boolean;
  data: ILevelModel;
};
export const toggleFormLevelAction = createAction<ToggleFormPayload, boolean, ILevelModel>(
  'TOGGLE_FORM_LEVEL_ADD_EDIT_ACTION',
  (toggleForm, data) => ({ toggleForm, data }),
);

/** action add new data */
export type AddNewPayload = {
  isNew: boolean;
  data: ILevelModel;
};
export const addNewLevelAction = createAction<AddNewPayload, boolean, ILevelModel>(
  'ADD_NEW_LEVEL_ACTION',
  (isNew, data) => ({
    isNew,
    data,
  }),
);

export type UpdatePayload = {
  isUpdate: boolean;
  data: ILevelModel;
};
export const updateLevelAction = createAction<UpdatePayload, boolean, ILevelModel>(
  'UPDATE_LEVEL_ACTION',
  (isUpdate, data) => ({
    isUpdate,
    data,
  }),
);
