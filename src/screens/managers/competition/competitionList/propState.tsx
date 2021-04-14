export interface IState {
  listCompetition: object[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading: boolean;
}
