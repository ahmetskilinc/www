import * as migration_20260818_232135_initial from './20260818_232135_initial';
import * as migration_20261001_200855_richtext_descriptions from './20261001_200855_richtext_descriptions';
import * as migration_20261001_202128_experience_dates from './20261001_202128_experience_dates';
import * as migration_20261001_202800_live_preview_autosave from './20261001_202800_live_preview_autosave';

export const migrations = [
  {
    up: migration_20260818_232135_initial.up,
    down: migration_20260818_232135_initial.down,
    name: '20260818_232135_initial',
  },
  {
    up: migration_20261001_200855_richtext_descriptions.up,
    down: migration_20261001_200855_richtext_descriptions.down,
    name: '20261001_200855_richtext_descriptions',
  },
  {
    up: migration_20261001_202128_experience_dates.up,
    down: migration_20261001_202128_experience_dates.down,
    name: '20261001_202128_experience_dates',
  },
  {
    up: migration_20261001_202800_live_preview_autosave.up,
    down: migration_20261001_202800_live_preview_autosave.down,
    name: '20261001_202800_live_preview_autosave'
  },
];
