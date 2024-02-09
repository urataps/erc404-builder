export enum ERoutesName {
  home = 'Home',
  dashboard = 'Dashboard',
  create = 'Create'
}

export enum ERoutesPath {
  home = '/',
  dashboard = '/dashboard',
  create = '/dashboard/create'
}

export const routes = [
  {
    name: ERoutesName.dashboard,
    path: ERoutesPath.dashboard,
    isAuthed: true
  },
  {
    name: ERoutesName.create,
    path: ERoutesPath.create,
    isAuthed: true
  }
];
