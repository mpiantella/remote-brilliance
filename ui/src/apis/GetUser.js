import gql from 'graphql-tag'

export default gql `
query getUser($id: ID!){
  getUser(id: $id) {
    id
    cognitoid
    firstName
    lastName
    email
    username
    subcribed
    registered
    phone
    applications
  }
}
`