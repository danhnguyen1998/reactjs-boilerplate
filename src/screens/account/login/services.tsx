import configServices from 'utils/configServices';

export const login = async (user) => {
  try {
    const result = await configServices.postService('oauth/token', user);
    return result;
  } catch (error) {
    throw error;
  }
};
