import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Mlb from './pages/Mlb';
import Nfl from './pages/Nfl';
import Nba from './pages/Nba';
import Nhl from './pages/Nhl';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Main from "./components/Main";



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/nfl" component={Nfl} />
            <Route exact path="/mlb" component={Mlb} />
            <Route exact path="/nba" component={Nba} />
            <Route exact path="/nhl" component={Nhl} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
