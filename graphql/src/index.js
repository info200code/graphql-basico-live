import { ApolloServer, gql } from "apollo-server";
import { usuarios } from "./data";

const typeDefs = gql`
  type Usuario {
    id: ID!
    username: String!
    email: String
    estado: EstadoUsuario
    profile: Int
  }

  enum EstadoUsuario {
    ACTIVO
    PENDIENTE_ACTIVAR
    DESACTIVADO
  }

  type Query {
    usuarios: [Usuario]
  }
`;

const resolvers = {
  Query: {
    usuarios: () => usuarios,
  },
  EstadoUsuario: {
    ACTIVO: 1,
    PENDIENTE_ACTIVAR: 2,
    DESACTIVADO: 3,
  },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log("🚀 Servidor corriendo en:", url);
});
