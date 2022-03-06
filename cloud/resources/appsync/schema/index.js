'use strict';

const fs = require('fs');
// create schema from graphql files
const rootSchema =
    `
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
`;

function loadFile() {
    try {
        const queriesSchema = fs.readFileSync(`${__dirname}/queries.graphql`, 'utf8');
        const mutationsSchema = fs.readFileSync(`${__dirname}/mutations.graphql`, 'utf8');
        const subscriptionSchema = fs.readFileSync(`${__dirname}/subscriptions.graphql`, 'utf8');

        //types
        const typesSchema = fs.readFileSync(`${__dirname}/types.graphql`, 'utf8');
        const inputSchema = fs.readFileSync(`${__dirname}/input.graphql`, 'utf8');

        const schema = `${rootSchema}\n${queriesSchema}\n${mutationsSchema}\n${typesSchema}\n${inputSchema}`

        writeSchema(schema);
    } catch (err) {
        console.error(err)
    }
}

function writeSchema(schema) {
    try {
        console.log(schema)
        fs.writeFileSync(
            `${process.env.PWD}/resources/appsync/schema.graphql`, schema
        )
        console.log('\n\t ********** Schema was succesfully created **********');
        //file written successfully
    } catch (err) {
        console.error(err)
    }
}

// do it all
loadFile()