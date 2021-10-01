const { gql } = require('apollo-server-express');

// 그래프QL 스키마 언어로 스키마를 구성
module.exports = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
    update(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
  }
`;
