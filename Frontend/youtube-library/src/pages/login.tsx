import React, { FunctionComponent, useState } from 'react';
import {Redirect} from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import CSS from 'csstype';
import {signin} from '../services/http-requests'


export const LoginPage: FunctionComponent<{   setName: Function }> = ({setName})=> {

  function loginSubmit(){
    signin(username)
    .then(response => {
      setName(username)
      setRedirect(true)
    })
    .catch(e => {
      if(e.response && e.response.status == 401){
        setError(true)
      }
    });
  }

  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  if (redirect) {
    return (<Redirect to={{  pathname: "/library"}}/>)
  }

  return <>
  <div style={containerStyle}>
   <div style={boxStyle}>
    <h3>Login</h3>
      <TextField
        id="filled-full-width"
        label="Username"
        placeholder="Your name"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
        onChange={element =>setUsername(element.target.value)}
        value={username}
        />
      <br/>
      {error?
        <div><Alert severity="error">You have not an account!</Alert></div>
        :null
      }
      <div style={buttonStyle}>
        <Button variant="contained" color="primary" onClick={loginSubmit}>
          sign in
        </Button>
      </div>
    </div>
  </div>
  </>
}



const containerStyle: CSS.Properties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxStyle: CSS.Properties = {
  marginTop: '50px',
  width: '500px',
  height: '290px',
  paddingTop: '60px',
  borderColor: 'black',
  borderWidth: '2px',
  borderStyle: 'solid'
};
const buttonStyle: CSS.Properties = {
  float: 'right'
};
