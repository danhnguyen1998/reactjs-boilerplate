export interface IProps {
  title: string;
  visible: boolean;
}

export interface IState {
  visible: boolean;
  current: Partial<{} | undefined>;
}
