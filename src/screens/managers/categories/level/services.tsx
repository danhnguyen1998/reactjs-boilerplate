import configServices from 'utils/configServices';
import { SearchParams } from './models';

export const searchList = async (param: SearchParams) => {
  try {
    return await configServices.getService('rank/search', param);
  } catch (error) {
    throw error;
  }
};

export const getDanceByKind = async (param) => {
  try {
    return await configServices.getService('dance/getByKind', param);
  } catch (error) {
    throw error;
  }
};

export const createLevel = async (param) => {
  try {
    return await configServices.postService('rank/create', param);
  } catch (error) {
    throw error;
  }
};

export const updateLevel = async (param) => {
  try {
    return await configServices.postService('rank/update', param);
  } catch (error) {
    throw error;
  }
};

export const deleteLevel = async (param) => {
  try {
    return await configServices.postService('rank/delete', param);
  } catch (error) {
    throw error;
  }
};
