import gql from 'graphql-tag'

export default gql `
  mutation deleteJob($id: ID!) {
    deleteJob(
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`