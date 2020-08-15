const { ApolloServer, gql } = require("apollo-server");
const faker = require("faker");

let data = [
  {
    id: 1,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  },
  {
    id: 2,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String
    url: String
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String
  }

  type Mutation {
    addUser(user: UserInput!): User
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => data,
    user: (info, args) => data.find((item) => String(item.id) === args.id),
  },
  Mutation: {
    addUser: (info, args, context) => {
      const user = {
        ...args.user,
        name: args.user.firstName,
        id: data.length + 1,
      };

      delete user.firstName;

      data.push(user);

      return user;
    },
  },
  User: {
    url: (info, args, context) => {
      return info.name + "-" + info.lastName;
    },
    firstName: (info) => info.name,
  },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log("🚀 Servidor corriendo en:", url);
});
