export interface IMigration {
  name: string;
  up: () => void;
  down?: () => void;
}

export class MigrationError extends Error {}

export function Migrate(
  migrations: IMigration[],
  currentVersion?: string,
  versionToMigrateTo?: string
) {
  if (!migrations.length) {
    // no migrations, just return;
    return;
  }
  if (!versionToMigrateTo) {
    versionToMigrateTo = migrations[migrations.length - 1].name;
  }
  let fromIndex = -1; // initial version
  let toIndex = -1;
  migrations.forEach((migration, index) => {
    if (migration.name === currentVersion) {
      fromIndex = index;
    }
    if (migration.name === versionToMigrateTo) {
      toIndex = index;
    }
  });
  if (fromIndex === toIndex) {
    // Already migrated, just return
    return;
  }
  const migrateUp = fromIndex < toIndex;
  if (migrateUp) {
    for (let i = fromIndex + 1; i <= toIndex; i++) {
      migrations[i].up();
    }
  } else {
    for (let i = fromIndex; i > toIndex; i--) {
      const migration = migrations[i];
      if (!migration.down) {
        throw new MigrationError(
          `No down migration defined for migration ${migration.name}`
        );
      }
      migration.down();
    }
  }
}
