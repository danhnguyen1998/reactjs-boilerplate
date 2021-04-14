import { Action, handleActions } from 'redux-actions';
import { AccountModel } from '../models';
import { AddNewPayload, ToggleFormPayload, UpdatePayload } from './actions';
import { ActionState } from './state';

type CombinedPayloads = ToggleFormPayload & AddNewPayload & UpdatePayload;

export default handleActions<ActionState, CombinedPayloads>(
  {
    TOGGLE_FORM_ACCOUNT_ADD_EDIT_ACTION: (state, { payload }: Action<ToggleFormPayload>): ActionState => ({
      ...state,
      toggleForm: payload.toggleForm,
      data: payload.data,
    }),
    ADD_NEW_ACCOUNT_ACTION: (state, { payload }: Action<AddNewPayload>): ActionState => ({
      ...state,
      isNew: payload.isNew,
      data: payload.data,
    }),
    UPDATE_ACCOUNT_ACTION: (state, { payload }: Action<UpdatePayload>): ActionState => ({
      ...state,
      isUpdate: payload.isUpdate,
      data: payload.data,
    }),
  },
  {
    toggleForm: false,
    data: new AccountModel(),
    isNew: false,
    isUpdate: false,
  },
);
