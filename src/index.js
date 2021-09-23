const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// 그래프QL 스키마 언어로 스키마를 구성
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

// 스키마 필드를 위한 리졸버 함수 제공
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott',
      });
    },
  },
};

const app = express();

db.connect(DB_HOST);

// 아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// 아폴로 그래프QL 미들웨어를 적용하고 경로를 /api 로 설정
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen({ port }, () =>
  console.log(
    'Server running at http://localhost:' + `${port}` + `${server.graphqlPath}`,
  ),
);
