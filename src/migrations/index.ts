import * as migration_20260818_232135_initial from './20260818_232135_initial';

export const migrations = [
  {
    up: migration_20260818_232135_initial.up,
    down: migration_20260818_232135_initial.down,
    name: '20260818_232135_initial'
  },
];
