import { Action, handleActions } from 'redux-actions';
import { LevelModel } from '../models';
import { AddNewPayload, ToggleFormPayload, UpdatePayload } from './actions';
import { ActionState } from './state';

type CombinedPayloads = ToggleFormPayload & AddNewPayload & UpdatePayload;

export default handleActions<ActionState, CombinedPayloads>(
  {
    TOGGLE_FORM_LEVEL_ADD_EDIT_ACTION: (state, { payload }: Action<ToggleFormPayload>): ActionState => ({
      ...state,
      toggleForm: payload.toggleForm,
      data: payload.data,
    }),
    ADD_NEW_LEVEL_ACTION: (state, { payload }: Action<AddNewPayload>): ActionState => ({
      ...state,
      isNew: payload.isNew,
      data: payload.data,
    }),
    UPDATE_LEVEL_ACTION: (state, { payload }: Action<UpdatePayload>): ActionState => ({
      ...state,
      isUpdate: payload.isUpdate,
      data: payload.data,
    }),
  },
  {
    toggleForm: false,
    data: new LevelModel(),
    isNew: false,
    isUpdate: false,
  },
);
