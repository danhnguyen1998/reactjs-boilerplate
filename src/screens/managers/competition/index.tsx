import { Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CompetitionCreated from './competitionCreated';
import CompetitionList from './competitionList';

export default function ManagerCompetition() {
  const { t } = useTranslation();

  return (
    <Card>
      <Space style={{ marginBottom: 15 }}>
        <Search placeholder="input search text" enterButton={t('common:action.search')} allowClear={true} />
        <CompetitionCreated />
      </Space>
      <CompetitionList />
    </Card>
  );
}
