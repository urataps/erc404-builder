export enum ERoutesName {
  home = 'Home',
  dashboard = 'Dashboard',
  create = 'Create',
  deployContract = 'Deploy',
  mint = 'Mint'
}

export enum ERoutesPath {
  home = '/',
  dashboard = '/dashboard',
  create = '/dashboard/create',
  deployContract = '/deploy-contract',
  mint = '/dashboard/mint'
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
