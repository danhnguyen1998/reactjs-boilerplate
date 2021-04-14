import configServices from 'utils/configServices';
import { IAgeModel, SearchParams } from './models';

export const createAge = async (param: IAgeModel) => {
  try {
    const result = await configServices.postService('age/create', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const searchList = async (data: SearchParams) => {
  try {
    return await configServices.getService('age/search', data);
  } catch (error) {
    throw error;
  }
};

export const updateAge = async (param: IAgeModel) => {
  try {
    const result = await configServices.postService('age/update', param);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteAge = async (id: number) => {
  try {
    const result = await configServices.postService('age/delete', { id });
    return result;
  } catch (error) {
    throw error;
  }
};
