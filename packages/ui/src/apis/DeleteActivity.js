import gql from 'graphql-tag'

export default gql `
  mutation deleteActivity($id: ID!) {
    deleteActivity(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`