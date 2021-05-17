import { FunctionComponent, useEffect, useState } from 'react';
import CSS from 'csstype';
import { Container , Row, Col } from 'react-bootstrap';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {get_library,add_video, delete_video} from '../services/http-requests'
import {Video} from '../components/video'
import {VideoPlayer} from '../components/videoplayer'
import {Suggestion} from '../components/suggestion'
import type { SearchObj} from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    gridList: {
      height: '690px',
      transform: 'translateZ(0)',
      marginTop: '20px',
      paddingTop: '5px'

    },
    gridListTile: {
      backgroundColor: 'bisque',
    },

  }),
);

export type Video = {
  title: string,
  id: string,
}

export const LibraryPage: FunctionComponent<{ initial?: string }> = ({ initial = "" })=> {

  const [videos, setVideos] = useState<Array<Video>>([]);

  const [videoToPlay, setVideoToPlay] = useState<Video>({title:"", id:""})
  const [displaySearch, setDisplaySearch] = useState(false)
  const [searchedObj, setSearchedObj] = useState<SearchObj>({title:"", n:0})

  const classes = useStyles();

  useEffect(() => {
    getLibrary()
  },[]);

  function getLibrary() {
    get_library()
    .then(response => {
      let data = response.data;
      setVideos(data['data'])
      setVideoToPlay({title:data['data'][0].title,id:data['data'][0].id })
    })
    .catch((e) => {
      console.log(e);
    });
  }

  function addVideo(title:string, id:string){
   add_video({title:title, id:id})
   .then(response => {
      getLibrary()
    })
    .catch((e) => {
      console.log(e);
    });
  }

  function removeVideo(id:string){
    delete_video(id)
   .then(response => {
      getLibrary()
    })
    .catch((e) => {
      console.log(e);
    });
  }

  function startPlay(v :Video){
    setVideoToPlay(v)
    setDisplaySearch(false)
  }
  function openSearch(){
    setDisplaySearch(true)
  }
  function closeSearch(){
    setDisplaySearch(false)
  }

  function controlButtons(){
    if(!displaySearch)
     {
       return (
        <Button
          startIcon={<SearchIcon />}
          onClick= {openSearch}
          >Search
        </Button>
      )}
    else
      return (
        <Button
          startIcon={<CancelIcon />}
          onClick= {closeSearch}
        >Stop searching
        </Button>
      )
  }

  return <>
  <div style={containerStyle}>
    <div style={boxStyle}>
      <Container >
        <Row>
          <Col xs={6} md={3}>
            <h2>Your library</h2>
            <div style={searchButton}>
              {controlButtons()}
            </div>
            <GridList cellHeight={140} spacing={1} className={classes.gridList} cols={1}>
              {videos.map((v) => (
                <GridListTile className={classes.gridListTile} key={v.id} cols={1}>
                  <Video title={v.title} id={v.id} />
                  <GridListTileBar
                    title={
                      <Button
                        startIcon={<PlayArrowIcon />}
                        onClick= {()=>startPlay(v)}
                      >
                        Play
                      </Button>
                    }
                    actionIcon={
                      <IconButton onClick={()=>removeVideo(v.id)} >
                        <DeleteIcon />
                      </IconButton>
                    }
                />
                </GridListTile>
              ))}
            </GridList>
          </Col>
          <Col style={embededVideoContainer} xs={12} md={9}>
            {!displaySearch?
              <div style={embededVideo}>
                <VideoPlayer title={videoToPlay.title} id={videoToPlay.id}/>
              </div>
            :
            <div>
              <Suggestion addVideo={addVideo}/>
            </div>
            }
          </Col>
        </Row>
      </Container>
    </div>
  </div>
  </>
}



const containerStyle: CSS.Properties = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center'
};

const boxStyle: CSS.Properties = {
  marginTop: '20px',
  height: '800px',
  borderColor: 'black',
  borderWidth: '2px',
  borderStyle: 'solid'
};

const searchButton: CSS.Properties = {
  display: 'flex',
  alignSelf: 'flex-start'

};
const embededVideoContainer: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column'
};
const embededVideo: CSS.Properties = {
  borderWidth: '1px',
  width: '100%',
  height: '70%',
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  marginTop: '30px',
  display: 'flex'

};

