import gql from 'graphql-tag'

export default gql `
  query listJobs {
    listJobs {
      items {
        id
        userId
        title
        description
        category
        companyDescription
        companyHQ
        companyName
        companyStatement
        companyWebsiteURL
        endDate
        howtoApply
        isFullyRemote
        logo
        startDate
        type
      }
    }
  }
`