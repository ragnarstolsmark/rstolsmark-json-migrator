import { IMigration, Migrate } from "../index";

let objectToMigrate: any;

function getMigrations(): IMigration[] {
  return [
    {
      name: "Delta01 - Add name",
      up: () => {
        objectToMigrate.name = "";
      },
      down: () => {
        delete objectToMigrate.name;
      }
    },
    {
      name: "Delta02 - Add telephone",
      up: () => {
        objectToMigrate.telephone = "";
      },
      down: () => {
        delete objectToMigrate.telephone;
      }
    },
    {
      name: "Delta03 - Add age",
      up: () => {
        objectToMigrate.age = 0;
      },
      down: () => {
        delete objectToMigrate.age;
      }
    },
    {
      name: "Delta04 - Add address",
      up: () => {
        objectToMigrate.address = "";
      },
      down: () => {
        delete objectToMigrate.address;
      }
    }
  ];
}

test("Run Initial migration", () => {
  objectToMigrate = {};
  const migrations = getMigrations();
  Migrate(migrations, undefined, "Delta01 - Add name");
  expect(objectToMigrate.name).toBeDefined();
});

test("Reverse Initial migration", () => {
  objectToMigrate = {
    name: ""
  };
  const migrations = getMigrations();
  Migrate(migrations, "Delta01 - Add name", "Non-existing migration");
  expect(objectToMigrate.name).toBeUndefined();
});

test("Migrate to latest version from nothing", () => {
  objectToMigrate = {};
  const migrations = getMigrations();
  Migrate(migrations);
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeDefined();
  expect(objectToMigrate.address).toBeDefined();
});

test("Migrate from delta 04 to delta 03", () => {
  objectToMigrate = {
    name: "",
    telephone: "",
    age: 0,
    address: ""
  };
  const migrations = getMigrations();
  Migrate(migrations, "Delta04 - Add address", "Delta03 - Add age");
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeDefined();
  expect(objectToMigrate.address).toBeUndefined();
});

test("Migrate from delta 02 to delta 04", () => {
  objectToMigrate = {
    name: "",
    telephone: ""
  };
  const migrations = getMigrations();
  Migrate(migrations, "Delta02 - Add age", "Delta04 - Add address");
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeDefined();
  expect(objectToMigrate.address).toBeDefined();
});

test("Migrate from delta 04 to delta 02", () => {
  objectToMigrate = {
    name: "",
    telephone: "",
    age: 0,
    address: ""
  };
  const migrations = getMigrations();
  Migrate(migrations, "Delta04 - Add address", "Delta02 - Add telephone");
  expect(objectToMigrate.name).toBeDefined();
  expect(objectToMigrate.telephone).toBeDefined();
  expect(objectToMigrate.age).toBeUndefined();
  expect(objectToMigrate.address).toBeUndefined();
});
