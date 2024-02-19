export enum ERoutesName {
  home = 'Home',
  dashboard = 'Dashboard',
  deployContract = 'Deploy'
}

export enum ERoutesPath {
  home = '/',
  dashboard = '/dashboard',
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
