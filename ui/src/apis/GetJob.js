import gql from 'graphql-tag'

export default gql `
query getJob($id: ID!){
  getJob(id: $id) {
    id
    userId
    title
    description
    applicants
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
`