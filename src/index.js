const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

// test data
let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Jinwoo' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' },
];

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
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott',
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

const app = express();

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
