import { Action, handleActions } from 'redux-actions';
import { DanceTypeModel } from '../models';
import { AddNewDanceTypePayload, ToggleFormPayload, UpdatePayload } from './actions';
import { ActionState } from './state';

// type CombinedPayloads = ToggleFormPayload & AddNewDanceTypePayload & UpdatePayload;

export default handleActions<ActionState, any>(
  {
    TOGGLE_FORM_ADD_EDIT_ACTION: (state, { payload }: Action<ToggleFormPayload>): ActionState => ({
      ...state,
      toggleForm: payload.toggleForm,
      data: payload.data,
    }),
    ADD_NEW_ACTION: (state, { payload }: Action<AddNewDanceTypePayload>): ActionState => ({
      ...state,
      isNew: payload.isNew,
      data: payload.data,
      toggleForm: false,
    }),
    UPDATE_ACTION: (state, { payload }: Action<UpdatePayload>): ActionState => ({
      ...state,
      isUpdate: payload.isUpdate,
      data: payload.data,
      toggleForm: false,
    }),
  },
  {
    toggleForm: false,
    data: new DanceTypeModel(),
    isNew: false,
    isUpdate: false,
  },
);
