import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/loginPage/LoginPage'
import CreateDinnerPage from './pages/createDinnerPage/CreateDinnerPage'
import Dashboard from './pages/dashboard/Dashboard';
import DiscoverPage from './pages/discoverPage/DiscoverPage';
import { Context } from './store/store';
import ProfilePage from './pages/profilePage/profilePage';

function App() {

  const { state } = useContext(Context)

  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route path='/dashboard'>
          {state.token
            ? <Dashboard />
            : <Redirect to='/' />
          }
        </Route>
        <Route path='/create'>
          {state.token
              ? <CreateDinnerPage />
              : <Redirect to='/' />
          }
        </Route>
        <Route path={'/discover'}>
          {state.token
              ? <DiscoverPage />
              : <Redirect to='/' />
          }
        </Route>
        <Route path={'/profile'}>
          {state.token
              ? <ProfilePage />
              : <Redirect to='/' />
          }
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
