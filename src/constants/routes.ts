export enum ERoutesName {
  home = 'Home',
  dashboard = 'Dashboard',
  create = 'Create',
  deployContract = 'Deploy Contract',
  mint = 'Mint'
}

export enum ERoutesPath {
  home = '/',
  dashboard = '/dashboard',
  create = '/dashboard/create',
  deployContract = '/dashboard/deploy-contract',
  mint = '/dashboard/mint'
}

export const routes = [
  {
    name: ERoutesName.dashboard,
    path: ERoutesPath.dashboard,
    isAuthed: true
  },
  {
    name: ERoutesName.create,
    path: ERoutesPath.deployContract,
    isAuthed: true
  }
];
