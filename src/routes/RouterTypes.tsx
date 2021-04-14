export default interface RouteTypes {
  path?: string;
  routes: {
    exact?: boolean;
    icon?: React.ReactNode;
    name?: string;
    path: string;
    children?: RouteTypes['routes'];
    breadcrumbName?: string;
    hideInMenu?: boolean;
  }[];
}
