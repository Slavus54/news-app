import './style';
import { Component } from 'preact';
import Main from './App';
import ApolloClient from 'apollo-boost';
import { onError } from 'apollo-link-error';
import {ApolloProvider} from '@apollo/react-hooks';
import {RecoilRoot} from 'recoil'

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
})
export default class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
			<RecoilRoot>
				<Main />
			</RecoilRoot>
			</ApolloProvider>
		);
	}
}
