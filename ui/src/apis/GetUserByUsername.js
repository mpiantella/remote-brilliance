import gql from 'graphql-tag'

export default gql `
query listUsers($username: String) {
  listUsers(filter: {username: {eq: $username}}) {
    items {
      applications
      cognitoid
      email
      firstName
      id
      lastName
      phone
      registered
      subcribed
      username
      address {
        address1
        address2
        city
        state
        zipCode
        country
      }
    }
  }
}
`