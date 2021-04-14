import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LevelForm from './levelForm';
import LevelList from './levelList';
import { IState } from './propsState';

export default function ManagerLevel() {
  const { t } = useTranslation();
  const [state, setState] = useState<IState>({
    search: '',
  });

  const onSearch = (value: string) => {
    setState((state) => ({ ...state, search: value }));
  };
  return (
    <>
      <Card>
        <Space style={{ marginBottom: 15 }}>
          <Search
            size="small"
            placeholder={t('manager:level.btnSearch')}
            enterButton={t('common:action.search')}
            onSearch={onSearch}
            allowClear={true}
          />
          <LevelForm />
        </Space>
        <LevelList search={state.search} />
      </Card>
    </>
  );
}
