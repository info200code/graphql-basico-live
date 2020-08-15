import { ApolloServer, gql } from "apollo-server";
import { usuarios } from "./data";

const typeDefs = gql`
  type Usuario {
    id: ID!
    username: String!
    email: String
    estado: EstadoUsuario
    profile: UsuarioProfile
  }

  enum EstadoUsuario {
    ACTIVO
    PENDIENTE_ACTIVAR
    DESACTIVADO
  }

  enum UsuarioProfile {
    CLIENTE
    EMPLEADO
  }

  type Query {
    usuarios: [Usuario]
  }

  type Mutation {
    modificarEstado(estado: EstadoUsuario): Boolean
  }
`;

const resolvers = {
  Query: {
    usuarios: () => usuarios,
  },
  Mutation: {
    modificarEstado: (_, args) => {
      console.log(args);
      return true;
    },
  },
  EstadoUsuario: {
    ACTIVO: 1,
    PENDIENTE_ACTIVAR: 2,
    DESACTIVADO: 3,
  },
  UsuarioProfile: {
    CLIENTE: 1,
    EMPLEADO: 2,
  },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log("🚀 Servidor corriendo en:", url);
});
