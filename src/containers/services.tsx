import configServices from 'utils/configServices';

export const getUserInforByToken = async () => {
  try {
    const result = await configServices.getService('accounts/get_account_by_id');
    return result;
  } catch (error) {
    throw error;
  }
};
