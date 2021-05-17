import React, { FunctionComponent, useEffect, useState } from 'react';
import CSS from 'csstype';
import ReactPlayer from "react-player"
import type {Video} from '../pages/library'

export const VideoPlayer: FunctionComponent<Video> = ({title ,id}: Video)=> {
  return <>
  <div style={containerStyle}>
    <div style={container}>
      <h2> {title}</h2>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          style={videoStyle}
        />
    </div>
  </div>
  </>
}



const containerStyle: CSS.Properties = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
};

const videoStyle: CSS.Properties = {
  marginLeft: '25px'
};
const container: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center'
};