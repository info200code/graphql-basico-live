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
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => data,
    user: (info, args) => data.find((item) => String(item.id) === args.id),
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
