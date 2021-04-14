import { SearchOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnSetting, IProps } from './propsState';

export default forwardRef((props: IProps, ref) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const configFillter = (columnSetting: ColumnSetting) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, width: 224 }}>
        {columnSetting.fillterDefault &&
          columnSetting.fillterDefault(setSelectedKeys, selectedKeys, columnSetting.dataIndex)}
        <Space style={{ marginTop: 8 }}>
          <Button
            type="primary"
            onClick={handleSearch(confirm, selectedKeys, columnSetting.dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            {t('common:action.title')}
          </Button>
          <Button onClick={handleReset(clearFilters, columnSetting.dataIndex)} size="small" style={{ width: 100 }}>
            {t('common:action.remove')}
          </Button>
        </Space>
      </div>
    ),
  });

  const handleSearch = (confirm: () => void, selectedKeys: React.Key[], dataIndex: string) => () => {
    confirm();
    if (props.handleSearch) props.handleSearch(selectedKeys, dataIndex);
  };

  const handleReset = (clearFilters: () => void, dataIndex: string) => () => {
    clearFilters();
    if (props.handleReset) props.handleReset(dataIndex);
  };

  const handleChange = (_pagination: TablePaginationConfig, filters: any, sorter: any) => {
    setState((state) => ({ ...state, filteredInfo: filters, sortedInfo: sorter }));
  };

  const columns = () => {
    const columns: ColumnsType<object> = [];
    props.columns.map((item: ColumnSetting) => {
      let column = {
        dataIndex: item.dataIndex,
        title: item.title,
        ellipsis: { showTitle: false },
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        render: (value: any, record: any, index: number) =>
          (item.render && item.render(value, record, index)) || (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          ),
      };
      if (item.fillterDefault && !item.filterDropdown) column = { ...column, ...configFillter(item) };
      columns.push(column);
    });
    if (props.columnAction) columns.push(props.columnAction);
    return columns;
  };

  useImperativeHandle(ref, () => ({
    clearAll() {
      setState((state) => ({ ...state, filteredInfo: null, sortedInfo: null }));
    },
  }));

  return (
    <Table
      columns={columns()}
      dataSource={props.data}
      bordered={true}
      size="small"
      pagination={props.pagination}
      loading={props.loading}
      onChange={handleChange}
    />
  );
});
