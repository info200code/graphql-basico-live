import { ApolloServer, gql } from "apollo-server";
import { usuarios, clientes, empleados } from "./data";

const typeDefs = gql`
  type Usuario {
    id: ID!
    username: String!
    email: String
    estado: EstadoUsuario
    profile: UsuarioProfile
    data: UsuarioData
  }

  union UsuarioData = Cliente | Empleado

  type Cliente {
    nombre: String!
    telefono: String
    email: String
    direccion: String!
  }

  type Empleado {
    nombre: String!
    apellido: String!
    telefono: String
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
  Usuario: {
    data: (args) => {
      let data = {};

      if (args.profile === 1) {
        data = clientes.find((cliente) => cliente.userId === args.profile);
      }

      if (args.profile === 2) {
        data = empleados.find((cliente) => cliente.userId === args.profile);
      }

      return data;
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
  UsuarioData: {
    __resolveType(info, args, context) {
      if (info.apellido) {
        return "Empleado"; // nombre del schema
      }

      if (info.email) {
        return "Cliente"; // nombre del schema
      }

      return null;
    },
  },
};

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log("🚀 Servidor corriendo en:", url);
});
