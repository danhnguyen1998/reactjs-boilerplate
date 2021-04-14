import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import TournamentList from './tournamentList';

export default function Tournaments() {
  const { t } = useTranslation();
  const history = useHistory();

  const addNew = () => {
    history.push('/manager/tournaments/add');
  };

  return (
    <Card>
      <Space style={{ marginBottom: 15 }}>
        <Search placeholder="input search text" enterButton={t('common:action.search')} allowClear={true} />
        <Button type="primary" icon={<PlusOutlined />} onClick={addNew}>
          {t('manager:tournaments.addNew')}
        </Button>
      </Space>
      <TournamentList />
    </Card>
  );
}
