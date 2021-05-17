import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
// import Container from 'react-bootstrap/Container';
import { Container , Row, Col } from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {LoginPage} from './pages/login'
import {LibraryPage} from './pages/library'

function App() {

  const getName = () => {
    const userName = localStorage.getItem('user-name');
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token
    return userName
  };

  const setName = (username:string) => {
    localStorage.setItem('user-name', username);
    setUserName(username);
  };

  const [userName, setUserName] = useState(getName());

  if(!userName) {
    return (
      <div className="App">
        <LoginPage setName={setName} />
      </div>
    )

  }
  return (
    <div className="App">
      <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" >
              Youtube Library
            </Typography>
          </Toolbar>
        </AppBar>

        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <LoginPage setName={setName} />
            </Route>
            <Route path="/library">
              <LibraryPage/>
            </Route>
          </Switch>
          </BrowserRouter>

    </div>
  );
}

export default App;
