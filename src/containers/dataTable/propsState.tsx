import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

export interface ColumnSetting extends ColumnType<object> {
  /** là unique của bảng, duy nhất */
  dataIndex: string;
  title: string;
  width?: string;
  fillterDefault?: (
    setSelectedKeys: (selectedKeys: React.Key[]) => void,
    selectedKeys: React.Key[],
    dataIndex: string,
  ) => React.ReactNode;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface IProps {
  data: object[];
  columns: ColumnSetting[];
  columnAction?: ColumnType<object>;
  pagination: TablePaginationConfig;
  loading: boolean;
  handleSearch?: (selectedKeys: React.Key[], dataIndex: string | number | (string | number)[]) => void;
  handleReset?: (dataIndex: string | number | (string | number)[]) => void;
}
