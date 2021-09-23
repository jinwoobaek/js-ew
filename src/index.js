const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// 로컬 모듈 임포트
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

// 아폴로 서버 설정
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // context에 db models 추가
    return { models };
  },
});

// 아폴로 그래프QL 미들웨어를 적용하고 경로를 /api 로 설정
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World!!'));

app.listen({ port }, () =>
  console.log(
    'Server running at http://localhost:' + `${port}` + `${server.graphqlPath}`,
  ),
);
