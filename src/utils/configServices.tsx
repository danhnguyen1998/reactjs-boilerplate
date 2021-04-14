import config from 'constant/config';
import system from 'constant/system';

const _responseConfig = async (response: Response) => {
  if (response.status === system.RESPONSE_STATUS.SUCESS) return await response.json();
  // if (response.status === system.RESPONSE_STATUS.NOT_FOUND) throw Error("Server is busy");
  // if (response.status === system.RESPONSE_STATUS.FORBIDDEN) {
  // throw Error("InvalidToken");
  throw response;
  // }
  // if (response.status === system.RESPONSE_STATUS.INTERVAL_SERVER) {
  //   const result = await response.json();
  //   throw Error(result.error_description);
  // }
};

const postService = async (url: string, body: object, isAuthorization = true, isFormData = false) => {
  try {
    const headers: any = isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { Accept: 'application/json', 'Content-Type': 'application/json' };
    headers.language = localStorage.getItem(system.LANG) || 'vi';
    if (isAuthorization) headers.Authorization = localStorage.getItem(system.TOKEN);
    const requestInit: any = { method: 'POST', headers };
    if (body)
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);
    const response = await fetch(`${config.HOST_API}/${url}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

const getService = async (url: string, params?: { [key: string]: any }, isAuthorization = true) => {
  try {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      language: localStorage.getItem(system.LANG) || 'vi',
    };
    if (isAuthorization) headers.Authorization = localStorage.getItem(system.TOKEN);
    const requestInit = { method: 'GET', headers };
    let queryString = '';
    if (params)
      queryString = `?${Object.keys(params)
        .map((key) => `${key}=${params[key] || ''}`)
        .join('&')}`;
    const response = await fetch(`${config.HOST_API}/${url}${queryString}`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    throw error;
  }
};

export default { postService, getService };
