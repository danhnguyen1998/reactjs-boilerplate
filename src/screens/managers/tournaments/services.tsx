import configServices from 'utils/configServices';
import { ITournamentModel, SearchParams } from './models';

export const createKindDance = async (param: ITournamentModel) => {
  try {
    const result = await configServices.postService('kindOfDance/create', param);
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
