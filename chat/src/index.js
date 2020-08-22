import { ApolloServer, gql, PubSub, withFilter } from "apollo-server";
import { users } from "./data";

const messages = [];

const MESSAGE_SENT = "MESSAGE_SENT";

const pubsub = new PubSub();

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
  }

  type Conversation {
    id: ID!
    receiver: User!
    sender: User!
    message: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  input SendMessageInput {
    message: String!
    to: ID!
    from: ID!
  }

  type Mutation {
    sendMessage(message: SendMessageInput!): Conversation!
  }

  type Subscription {
    messageSent(receiverId: ID!): Conversation!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (info, args, context) => users.find((usr) => usr.id === args.id),
  },
  Mutation: {
    sendMessage: (info, args) => {
      const messageToSend = {
        id: messages.length + 1,
        receiverId: args.message.to,
        senderId: args.message.from,
        message: args.message.message,
      };

      messages.push(messageToSend);
      pubsub.publish(MESSAGE_SENT, { messageSent: messageToSend });
      return messageToSend;
    },
  },
  Conversation: {
    sender: (info, args) => users.find((usr) => usr.id === info.senderId),
    receiver: (info, args) => users.find((usr) => usr.id === info.receiverId),
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([MESSAGE_SENT]),
        (payload, variables) => {
          return payload.messageSent.receiverId === variables.receiverId;
        }
      ),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then((_server) => {
  console.log("Server ready at", _server.url);
});
