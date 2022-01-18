import Vue from 'vue';
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import VueApollo from 'vue-apollo';
import './plugins/vuetify';
import '@aws-amplify/ui-vue';

import AWSAppSyncClient from 'aws-appsync';
import Amplify from 'aws-amplify';
import {
	Auth
} from '@aws-amplify/auth';

import App from './App.vue';
import router from './router';
import store from './store';
import awsconfig from "./aws-exports";
import appSyncConfig from './AppSync';

Amplify.configure(awsconfig);
Auth.configure(awsconfig)
Amplify.Logger.LOG_LEVEL = 'DEBUG';

const config = {
	url: appSyncConfig.graphqlEndpoint,
	region: appSyncConfig.region,
	auth: {
		type: appSyncConfig.authenticationType,
		apiKey: appSyncConfig.apiKey,
	}
};
const options = {
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		}
	}
};
const client = new AWSAppSyncClient(config, options)
const appsyncProvider = new VueApollo({
	defaultClient: client
});

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(Vuelidate)

new Vue({
	vuetify,
	router,
	store,
	provide: appsyncProvider.provide(),
	render: h => h(App)
}).$mount('#app')