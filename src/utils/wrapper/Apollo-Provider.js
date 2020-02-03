import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import config from '../../utils/config' ;

class App extends Component {
  state = {
    client: null,
    loaded: false
  };

  async componentDidMount() {
    const cache = new InMemoryCache();

    // Setup Apollo Link, and any other Apollo packages here.
    const client = new ApolloClient({
      cache,
      uri: config.backend.uri,
    });

    try {
      // See above for additional options, including other storage providers.
      await persistCache({
        cache,
        storage: window.localStorage
      });
    } catch (error) {
      console.error("Error restoring Apollo cache", error);
    }

    this.setState({
      client,
      loaded: true
    });
  }

  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

export default App;
