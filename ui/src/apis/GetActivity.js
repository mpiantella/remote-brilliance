import gql from 'graphql-tag'

export default gql `
query getActivity ($id: ID!){
  getActivity(id: $id) {
    id
    name
    userId
    description
    content
    date
    status
  }
}
`