import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, List, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import listNews from './listNews.json';
import './style.less';

export default function CustomerHome(props: any) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const list = listNews;

  const fetchMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const loadMore = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loading ? (
          <span>
            <LoadingOutlined /> {t('common:news.loadingTitle')}
          </span>
        ) : (
          t('common:news.loadMore')
        )}
      </Button>
    </div>
  );

  const renderActivities = (item) => (
    <List.Item key={item.id}>
      <List.Item.Meta
        style={{ alignItems: 'center' }}
        avatar={
          <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" size="large" />
        }
        title={item.title}
        description={
          <>
            <span>
              <span>Thời gian: </span>
              <span>{moment(item.fromDate).format('DD/MM/YYYY')}</span>
              <span> - {moment(item.fromDate).format('DD/MM/YYYY')}</span>
            </span>
            <br />
            <span>
              <span>Địa điểm: </span>
              <span>{item.address}</span>
            </span>
          </>
        }
      />
    </List.Item>
  );

  return (
    <>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card bodyStyle={{ padding: 0 }} bordered={false} className="activeCard" title="Thông tin giải đấu">
            <List
              loadMore={loadMore}
              renderItem={renderActivities}
              dataSource={list}
              className="activitiesList"
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} />
      </Row>
    </>
  );
}
