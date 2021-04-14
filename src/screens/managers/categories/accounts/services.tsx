import configServices from 'utils/configServices';
import { IAccountModel, SearchParams } from './models';

export const createAccount = async (param: IAccountModel) => {
  try {
    const result = await configServices.postService('accounts/createUntilWork', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateAccount = async (param: IAccountModel) => {
  try {
    const result = await configServices.postService('accounts/updateUntilWork', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (param: IAccountModel) => {
  try {
    const result = await configServices.postService('accounts/delete', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const searchList = async (data: SearchParams) => {
  try {
    return await configServices.getService('accounts/search', data);
  } catch (error) {
    throw error;
  }
};

export const activeAccount = async (param: IAccountModel) => {
  try {
    const result = await configServices.postService('accounts/active', param);
    return result;
  } catch (error) {
    throw error;
  }
};
