import faker from "faker";

export const users = [
  {
    id: "1",
    username: faker.internet.userName(),
    email: faker.internet.email(),
  },
  {
    id: "2",
    username: faker.internet.userName(),
    email: faker.internet.email(),
  },
  {
    id: "3",
    username: faker.internet.userName(),
    email: faker.internet.email(),
  },
];
