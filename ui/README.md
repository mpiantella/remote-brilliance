# Remote Brilliance

This website is created with Vue.js and Vuetify. For more information see[Google's Material Design](https://material.io/design/) specifications.

## Setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
# build for dist
yarn run build
# test 
yarn run test
# lint
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Amplify Auth 

TODO: this projetc was initialized with the `amplify` cli to leverage the `auth` module with `aws cognito`. See the [amplify](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/) documentation for details.

## Sync S3 content

Two buckets were set up. Only one has public assets, which is the one we sync each time the site is updated. The `npm run deploy` will trigger the build command, and ten the s3 sync command to push those assets up.

```
npm run deploy # in turn calls npm run build && npm run s3:deploy
```

```
# Buckets associated to the remotebrilliance.link domain
remotebrilliance.link
www.remotebrilliance.link # public with assets
```

Public bucket s3 location: http://www.remotebrilliance.link.s3-website-us-east-1.amazonaws.com

### Invalidate Cache

Get Id:
```
    aws cloudfront list-distributions
```

The invalidate the cache
```
    aws cloudfront create-invalidation --distribution-id=E3HXTLOGMAVONI --paths /
```