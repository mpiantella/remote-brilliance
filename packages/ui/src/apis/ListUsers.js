import gql from 'graphql-tag'

export default gql `
  query listUsers {
    listUsers {
      items {
        cognitoid
        email
        firstName
        id
        lastName
        phone
        registered
        subcribed
        username
      }
    }
  }
`