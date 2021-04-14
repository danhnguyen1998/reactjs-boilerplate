import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AgeForm from './ageForm';
import AgeList from './ageList';
import { IState } from './propState';

export default function ManagerAge(props: any) {
  const { t } = useTranslation();
  const [state, setState] = useState<IState>({
    search: '',
    valueInput: '',
  });

  const onSearch = (value: string) => setState((state) => ({ ...state, search: value }));

  return (
    <>
      <Card>
        <Space style={{ marginBottom: 15 }}>
          <Search
            size="small"
            placeholder={t('age:searchText')}
            enterButton={t('common:action.search')}
            onSearch={onSearch}
            allowClear={true}
          />
          <AgeForm />
        </Space>

        <AgeList search={state.search} />
      </Card>
    </>
  );
}
