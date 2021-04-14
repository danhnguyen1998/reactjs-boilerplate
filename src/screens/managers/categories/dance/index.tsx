import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DanceForm from './danceForm';
import DanceList from './danceList';

export default function ManagerDance(props: any) {
  const { t } = useTranslation();
  const [state, setState] = useState({
    search: '',
  });

  const onSearch = (value: string) => setState((state) => ({ ...state, search: value }));
  return (
    <>
      <Card>
        <Space style={{ marginBottom: 15 }}>
          <Search
            size="small"
            placeholder={t('manager:dance.btnSearch')}
            enterButton={t('common:action.search')}
            onSearch={onSearch}
            allowClear={true}
          />
          <DanceForm />
        </Space>
        <DanceList search={state.search} />
      </Card>
    </>
  );
}
