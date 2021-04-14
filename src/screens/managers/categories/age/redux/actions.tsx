import { createAction } from 'redux-actions';
import { IAgeModel } from '../models';

/** action toggle form add/edit */
export type ToggleFormPayload = {
  toggleForm: boolean;
  data: IAgeModel;
};
export const toggleFormAgeAction = createAction<ToggleFormPayload, boolean, IAgeModel>(
  'TOGGLE_FORM_AGE_ACTION',
  (toggleForm, data) => ({ toggleForm, data }),
);

/** action add new data */
export type AddNewPayload = {
  isNew: boolean;
  data: IAgeModel;
};
export const addNewAgeAction = createAction<AddNewPayload, boolean, IAgeModel>('ADD_NEW_AGE_ACTION', (isNew, data) => ({
  isNew,
  data,
}));

export type UpdatePayload = {
  isUpdate: boolean;
  data: IAgeModel;
};
export const updateAgeAction = createAction<UpdatePayload, boolean, IAgeModel>(
  'UPDATE_AGE_ACTION',
  (isUpdate, data) => ({
    isUpdate,
    data,
  }),
);
