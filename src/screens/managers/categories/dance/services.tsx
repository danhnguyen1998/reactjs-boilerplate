import configServices from 'utils/configServices';
import { SearchParams } from './models';

export const searchList = async (data: SearchParams) => {
  try {
    return await configServices.getService('dance/search', data);
  } catch (error) {
    throw error;
  }
};

export const getKindOfDance = async () => {
  try {
    return await configServices.getService('kindOfDance/getAll');
  } catch (error) {
    throw error;
  }
};

export const createDance = async (param) => {
  try {
    return await configServices.postService('dance/create', param);
  } catch (error) {
    throw error;
  }
};

export const updateDance = async (param) => {
  try {
    return await configServices.postService('dance/update', param);
  } catch (error) {
    throw error;
  }
};

export const deleteDance = async (param) => {
  try {
    return await configServices.postService('dance/delete', param);
  } catch (error) {
    throw error;
  }
};
