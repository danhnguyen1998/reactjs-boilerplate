import { Action, handleActions } from 'redux-actions';
import { DanceModel } from '../models';
import { AddNewPayload, ToggleFormPayload, UpdatePayload } from './actions';
import { ActionState } from './state';

type CombinedPayloads = ToggleFormPayload & AddNewPayload & UpdatePayload;

export default handleActions<ActionState, CombinedPayloads>(
  {
    TOGGLE_FORM_DANCE_ADD_EDIT_ACTION: (state, { payload }: Action<ToggleFormPayload>): ActionState => ({
      ...state,
      toggleForm: payload.toggleForm,
      data: payload.data,
    }),
    ADD_NEW_DANCE_ACTION: (state, { payload }: Action<AddNewPayload>): ActionState => ({
      ...state,
      isNew: payload.isNew,
      data: payload.data,
      toggleForm: false,
    }),
    UPDATE_DANCE_ACTION: (state, { payload }: Action<UpdatePayload>): ActionState => ({
      ...state,
      isUpdate: payload.isUpdate,
      data: payload.data,
      toggleForm: false,
    }),
  },
  {
    toggleForm: false,
    data: new DanceModel(),
    isNew: false,
    isUpdate: false,
  },
);
