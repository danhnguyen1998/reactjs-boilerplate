import { ArrowLeftOutlined, SaveFilled } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Row } from 'antd';
import DebounceInput from 'containers/debonceInput';
import React from 'react';

export default function TournamentCreated() {
  const backToList = () => {
    console.log('TODO');
  };

  const createToutnament = () => {
    console.log('TODO');
  };

  const handleCkeditorState = (_event: any, editor: any) => {};

  return (
    <Card
      size="small"
      title={
        <Button type="ghost" danger={true} icon={<ArrowLeftOutlined />} onClick={backToList}>
          Quay lại
        </Button>
      }
      extra={
        <Button form="tournamentCreated" type="primary" onClick={createToutnament}>
          Tạo giải đấu <SaveFilled />
        </Button>
      }
    >
      <Form id="tournamentCreated" layout="vertical">
        <Row gutter={16}>
          <Col sm={12} xs={24}>
            <Form.Item label="Thời gian diễn ra">
              <DatePicker.RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label="Kích hoạt">
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={12} xs={24}>
            <Form.Item label="Tên giải đấu">
              <DebounceInput />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label="Tên giải đấu (Tiếng anh)">
              <DebounceInput />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={12} xs={24}>
            <Form.Item label="Địa điểm">
              <DebounceInput />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label="Địa điểm (Tiếng anh)">
              <DebounceInput />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Nội dung chi tiết">
          <CKEditor
            editor={ClassicEditor}
            config={{
              ckfinder: {
                uploadUrl: '/uploads',
              },
            }}
            data="<p>Hello from CKEditor 5!</p>"
            onChange={handleCkeditorState}
          />
        </Form.Item>
      </Form>
    </Card>
  );
}
