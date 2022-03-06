# tiffin-capstone
This is a simple application that uses a combination of modern tools, to create a enterprise ready application. 

## Structure
```
- ui
    - VueApp and Amplify definitons
- cloud
    - AWS Resource Definition and CFT
```

## UI

Vue Application using AppSync for GraphQL backend. Some of the data sources include DynamoDb tables with Lambdas for some resolvers.

### Deploy

```
    npm run deploy
```

It runs the generation of the Vue.js app by in turn executing `npm run build`. Then this is pushed to the S3 object that is wired up to CloudFront, Route 53 and Certificates to serve a secured site.

## Cloud

Vue Application using AppSync for GraphQL backend. Some of the data sources include DynamoDb tables with Lambdas for some resolvers.

### Deploy

```
    npm run deploy
```

This will generate the Lambdas zip, and GraphQL schemas needed by the Cloud Formation Template that is in turn deployed by the command. This creates an AppSync APi with tables and lambdas a data soources. VTL is used for straight forward mutations, and more complication mutations, like "User Profile Update" is done via a Lambda.
