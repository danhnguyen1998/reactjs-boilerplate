import configServices from 'utils/configServices';
import { SearchParams } from './models';

export const searchList = async (data: SearchParams) => {
  try {
    return await configServices.getService('kindOfDance/search', data);
  } catch (error) {
    throw error;
  }
};
