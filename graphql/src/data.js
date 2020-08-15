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
