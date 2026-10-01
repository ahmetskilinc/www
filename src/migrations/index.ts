import * as migration_20260818_232135_initial from './20260818_232135_initial';
import * as migration_20261001_200855_richtext_descriptions from './20261001_200855_richtext_descriptions';

export const migrations = [
  {
    up: migration_20260818_232135_initial.up,
    down: migration_20260818_232135_initial.down,
    name: '20260818_232135_initial',
  },
  {
    up: migration_20261001_200855_richtext_descriptions.up,
    down: migration_20261001_200855_richtext_descriptions.down,
    name: '20261001_200855_richtext_descriptions'
  },
];
