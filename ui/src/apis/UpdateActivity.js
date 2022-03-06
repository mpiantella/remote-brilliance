import gql from 'graphql-tag'
/**
 */
export default gql `  
  mutation updateActivity(
    $id: ID!
    $name: String
    $userId: String
    $description: String
    $content: String
    $status: String
    $date: String
    ) {
      updateActivity(
      input: {
        id: $id
        userId: $userId
        name: $name, 
        description: $description
        content: $content
        status: $status
        date: $date
      }
    ) {
      id
      name
      date
      description
      content
      status
      userId
    }
  }
`