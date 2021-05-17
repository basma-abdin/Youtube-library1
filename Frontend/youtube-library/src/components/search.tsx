import React, { FunctionComponent, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CSS from 'csstype';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';



export const Search: FunctionComponent<{setSearchedObj: Function,startSearch: Function  }> = ({setSearchedObj, startSearch})=> {
  const [title, setTitle] = useState("");
  const [n, setN] = useState("5");

  function search(){
    setSearchedObj({title:title,n:n})
    startSearch(title,n)
  }

  return <>
  <div style={containerStyle}>
    <div style={formStyle} >
      <TextField
        id="standard-full-width"
        label="Search"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={element =>setTitle(element.target.value)}
      />
      <div style={numberStyle}>
        <TextField
          id="standard-full-width"
          label="Display x first result"
          type="number"
          fullWidth

          onChange={element =>setN(element.target.value)}
          value = {n}
        />
      </div>
      <div style={buttonStyle}>
          <IconButton aria-label="delete" onClick={search}  >
            <SearchIcon fontSize="small" />
          </IconButton>
      </div>
    </div>
  </div>
  </>
}

const containerStyle: CSS.Properties = {
  display: 'flex',
  alignSelf: 'flex-start',
  alignContent: 'stretch',
};

const buttonStyle: CSS.Properties = {
  float: 'right'
};
const numberStyle: CSS.Properties = {
  float: 'left',

};
const formStyle: CSS.Properties = {
  alignSelf: 'flex-start',
  alignContent: 'stretch',
  margin: '50px'
};