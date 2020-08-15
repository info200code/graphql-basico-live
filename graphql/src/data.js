import faker from "faker";

export const usuarios = [
  {
    id: 1,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    estado: 1, // activo
    profile: 1, // cliente
  },
  {
    id: 2,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    estado: 2, // pendiente de aprobar
    profile: 2, // empleado
  },
  {
    id: 3,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    estado: 3, // desactivado
    profile: 1, // cliente
  },
];

export const clientes = [
  {
    nombre: faker.name.firstName(),
    telefono: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    direccion: faker.random.words(),
    userId: 1,
  },
  {
    nombre: faker.name.firstName(),
    telefono: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    direccion: faker.random.words(),
    userId: 3,
  },
];

export const empleados = [
  {
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    telefono: faker.phone.phoneNumber(),
    userId: 2,
  },
];
