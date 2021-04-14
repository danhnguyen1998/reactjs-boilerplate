import configServices from 'utils/configServices';
import { ITypesModel, SearchParams } from './models';

export const createTypes = async (param: ITypesModel) => {
  try {
    const result = await configServices.postService('formOfCompetition/create', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTypes = async (param: ITypesModel) => {
  try {
    const result = await configServices.postService('formOfCompetition/update', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTypes = async (param: ITypesModel) => {
  try {
    const result = await configServices.postService('formOfCompetition/delete', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const searchList = async (data: SearchParams) => {
  try {
    return await configServices.getService('formOfCompetition/search', data);
  } catch (error) {
    throw error;
  }
};
