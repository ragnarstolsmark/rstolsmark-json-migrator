export interface IMigration {
  name: string;
  up: () => void;
}

export interface IAppliedMigration {
  name: string;
  dateApplied: Date;
}

export function migrate(
  migrations: IMigration[],
  appliedMigrations: IAppliedMigration[]
) {
  const migrationsToRun = migrations.filter(
    m => appliedMigrations.filter(a => a.name === m.name).length === 0
  );
  migrationsToRun.forEach(m => {
    m.up();
    appliedMigrations.push({
      name: m.name,
      dateApplied: new Date()
    });
  });
}
