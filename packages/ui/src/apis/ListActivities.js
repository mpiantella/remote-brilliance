import gql from 'graphql-tag'

export default gql `
  query listActivities {
    listActivities {
      items {
        id
        name
        description
        date
        status
        userId
      }
    }
  }
`