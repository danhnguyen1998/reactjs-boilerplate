import configServices from 'utils/configServices';
import { IDanceTypeModel, SearchParams } from './models';

export const createKindDance = async (param: IDanceTypeModel) => {
  try {
    const result = await configServices.postService('kindOfDance/create', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateKindDance = async (param: IDanceTypeModel) => {
  try {
    const result = await configServices.postService('kindOfDance/update', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteKindDance = async (param: IDanceTypeModel) => {
  try {
    const result = await configServices.postService('kindOfDance/delete', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const searchList = async (data: SearchParams) => {
  try {
    return await configServices.getService('kindOfDance/search', data);
  } catch (error) {
    throw error;
  }
};
