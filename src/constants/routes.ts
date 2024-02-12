export enum ERoutesName {
  home = 'Home',
  dashboard = 'Dashboard',
  create = 'Create',
  deployContract = 'Deploy'
}

export enum ERoutesPath {
  home = '/',
  dashboard = '/dashboard',
  create = '/dashboard/create',
  deployContract = '/deploy-contract'
}

export const routes = [
  {
    name: ERoutesName.dashboard,
    path: ERoutesPath.dashboard,
    isAuthed: true
  },
  {
    name: ERoutesName.deployContract,
    path: ERoutesPath.deployContract,
    isAuthed: true
  }
];
