import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccountForm from './accountForm';
import AccountList from './accountList';
import { IState } from './propState';

export default function ManagerAccounts() {
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
          placeholder={t('manager:account.btnSearch')}
          enterButton={t('common:action.search')}
          onSearch={onSearch}
          allowClear={true}
        />
        <AccountForm />
      </Space>
      <AccountList search={state.search} />
    </Card>
  );
}
