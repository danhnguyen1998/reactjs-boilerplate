import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DanceTypesForm from './danceTypesForm';
import DanceTypesList from './danceTypesList';
import { IState } from './propState';

export default function ManagerDanceTypes() {
  const { t } = useTranslation();

  const [state, setState] = useState<IState>({
    search: '',
  });

  const onSearch = (value: string) => setState((state) => ({ ...state, search: value }));

  return (
    <Card>
      <Space style={{ marginBottom: 15 }}>
        <Search
          size="small"
          placeholder={t('manager:danceTypes.btnSearch')}
          enterButton={t('common:action.search')}
          onSearch={onSearch}
          allowClear={true}
        />
        <DanceTypesForm />
      </Space>
      <DanceTypesList search={state.search} />
    </Card>
  );
}
