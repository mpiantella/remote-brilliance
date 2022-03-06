import gql from 'graphql-tag'

export default gql `
  mutation createJob (
      $userId: String!
      $title: String!
      $category: String!
      $type: String!
      $description: String
      $isFullyRemote: String
      $howtoApply: String
      $companyDescription: String
      $companyHQ: String
      $companyName: String
      $companyStatement: String
      $companyWebsiteURL: String
      $logo: String
      $startDate: String
      $endDate: String
    ) {
    createJob(
      input: {
        userId: $userId
        title: $title
        category: $category
        type: $type
        description: $description
        isFullyRemote: $isFullyRemote
        howtoApply: $howtoApply
        companyDescription: $companyDescription
        companyHQ: $companyHQ
        companyName: $companyName
        companyStatement: $companyStatement
        companyWebsiteURL: $companyWebsiteURL
        logo: $logo
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      id
      userId
      title
      category
      type
      description
      isFullyRemote
      howtoApply
      companyDescription
      companyHQ
      companyName
      companyStatement
      companyWebsiteURL
      logo
      startDate
      endDate
    }
  }
`