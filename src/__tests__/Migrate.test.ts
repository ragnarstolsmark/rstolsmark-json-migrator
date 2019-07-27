import { IAppliedMigration, IMigration, migrate } from "../index";

let objectToMigrate: any;

function getMigrations(): IMigration[] {
  const twoFirst = getTwoFirstMigrations();
  return twoFirst.concat([
    {
      name: "Delta03",
      up: () => {
        objectToMigrate.age = 0;
      }
    },
    {
      name: "Delta04",
      up: () => {
        objectToMigrate.address = "";
      }
    }
  ]);
}

function getTwoFirstMigrations() {
  return [
    {
      name: "Delta01",
      up: () => {
        objectToMigrate.name = "";
      }
    },
    {
      name: "Delta02",
      up: () => {
        objectToMigrate.telephone = "";
      }
    }
  ];
}

test("Run migrations", () => {
  objectToMigrate = {};
  const migrations = getMigrations();
  migrate(migrations, []);
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeDefined();
  expect(objectToMigrate.address).toBeDefined();
});

test("Migrate from nothing to delta 04 via delta 02", () => {
  objectToMigrate = {};
  const alreadyRunMigrations = [] as IAppliedMigration[];
  migrate(getTwoFirstMigrations(), alreadyRunMigrations);
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeUndefined();
  expect(objectToMigrate.address).toBeUndefined();
  migrate(getMigrations(), alreadyRunMigrations);
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeDefined();
  expect(objectToMigrate.address).toBeDefined();
});
