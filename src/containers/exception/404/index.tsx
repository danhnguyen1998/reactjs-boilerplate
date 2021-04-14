import { Button, Result } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IProps {
  backHome?: string;
}

export default (props: IProps) => {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('common:exception.404')}
      extra={
        <Link to={props.backHome || '/'}>
          <Button type="primary">{t('common:exception.backHome')}</Button>
        </Link>
      }
    />
  );
};
