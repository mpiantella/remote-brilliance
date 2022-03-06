import gql from 'graphql-tag'

export default gql `
  mutation createUser(
    $cognitoid: ID!
    $email: String
    $username: String!
    $firstName: String
    $lastName: String
    $phone: String
    $registered: Boolean
    $subcribed: Boolean
  ) {
      createUser(
      input: {
        cognitoid: $cognitoid
        email: $email
        username: $username
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        registered: $registered
        subcribed: $subcribed
      }
    ) {
        id
        cognitoid
        email
        username
        firstName
        lastName
        phone
        registered
        subcribed
      }
    }
`