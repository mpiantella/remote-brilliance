# Cloud

This folder holds the AppSync, with GraphQL Schema definitions and references to data source, those being DynamDB and Lambda. Incognito will set in between these services to provide assistance to the login service.

## Usage

- Deploy CFT with resources and updates.
- Bundle UI and Update Cloud resoures
- The NPM scripts will do the following actions

`deploy:lambdas`: zip lambdas folders, and push to S3 to be picked up by Cloud Formation Template deployment.

`schema:cp`: Copies the graphql locally generated schema to S3 to be picked up by Cloud Formation Template deployment (Updates to GraphQL type definitions in AppSync).

`deploy`: deploys lambdas, graphql schema definiton and CFT with cloud resources: AppSync and related Data soruces: Lambdas and DynamoDB tables. This script calls the previous scripts in turn, so it is self contained.
    
    
