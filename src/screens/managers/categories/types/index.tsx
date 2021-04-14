import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IState } from './propState';
import TypeForm from './typeForm';
import TypeList from './typeList';

export default function ManagerTypes() {
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
          placeholder={t('manager:types.btn.search')}
          enterButton={t('common:action.search')}
          onSearch={onSearch}
          allowClear={true}
        />
        <TypeForm />
      </Space>
      <TypeList search={state.search} />
    </Card>
  );
}
