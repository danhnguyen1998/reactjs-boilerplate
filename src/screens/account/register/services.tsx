import configServices from 'utils/configServices';

export const register = async (user) => {
  try {
    const result = await configServices.postService('accounts/register', user);
    return result;
  } catch (error) {
    throw error;
  }
};
