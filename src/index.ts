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
): IAppliedMigration[] {
  const migrationsToRun = migrations.filter(
    m => appliedMigrations.filter(a => a.name === m.name).length === 0
  );
  const appliedMigrationsThisTime = [] as IAppliedMigration[];
  migrationsToRun.forEach(m => {
    m.up();
    appliedMigrationsThisTime.push({
      name: m.name,
      dateApplied: new Date()
    });
  });
  return appliedMigrationsThisTime;
}
