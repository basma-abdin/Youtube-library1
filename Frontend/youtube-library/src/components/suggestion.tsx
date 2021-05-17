import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CSS from 'csstype';
import {fetch_suggestions} from '../services/http-requests'
import {Search} from '../components/search'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import type { SearchObj} from '../types'

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    height: '550px',
    width: '1000px'

  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',

  },
}),
);


export const Suggestion: FunctionComponent<{addVideo: Function}>= ({addVideo})=> {
  const classes = useStyles();
  const [searchedObj, setSearchedObj] = useState<SearchObj>({title:"", n:0})
  const [videos, setVideos] = useState<Array<any>>([])

  function startSearch(title:string,n:number) {
    console.log("from start search");
    get_suggestions(title,n)
  }

  function get_suggestions(title:string,n:number){
    fetch_suggestions(title,n)
    .then(response => {
      let data = response.data;
      console.log(data.items);
      setVideos(data.items)

    })
    .catch((e) => {
      console.log(e);
    });
  }

  return <>
  <div>
    <Search setSearchedObj={setSearchedObj} startSearch={startSearch} />
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1}>
        {videos.map((v) => (
          <GridListTile key={v.id.videoId}>
            <img src={v.snippet.thumbnails.default.url} alt={v.snippet.title} />
            <GridListTileBar
              title={v.snippet.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${v.snippet.title}`}
                  onClick={()=> addVideo(v.snippet.title, v.id.videoId)}
                >
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      </div>
  </div>
  </>
}
