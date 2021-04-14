import { notification } from 'antd';
import { IconType } from 'antd/lib/notification';
import i18next from 'i18next';

const open = (type: IconType, mess: string, title?: string) => {
  notification[type]({
    message: title || i18next.t('common:notification.info'),
    description: mess,
    duration: 2,
  });
};

const success = (mess: string, title?: string) => {
  notification.success({
    message: title || i18next.t('common:notification.success'),
    description: mess,
    duration: 2,
  });
};

const error = (mess: string, title?: string) => {
  notification.error({
    message: title || i18next.t('common:notification.error'),
    description: mess,
    duration: 2,
  });
};

const warning = (mess: string, title?: string) => {
  notification.warning({
    message: title || i18next.t('common:notification.error'),
    description: mess,
    duration: 2,
  });
};

export default {
  open,
  success,
  error,
  warning,
};
