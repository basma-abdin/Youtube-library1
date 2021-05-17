import http from "../htto-common";
import type {Video} from '../types'

const userName = localStorage.getItem('user-name');
const libraryLink = '/library/'+userName+'/videos/'
export const signin = (user:string)=>{
  return http.post("/signin", {name: user});
}

export const add_video = (video: Video)=>{
  return http.post(libraryLink, {video});
}

export const get_library = ()=>{
  return http.get(libraryLink);
}

export const delete_video = (id:string)=>{
  return http.delete(libraryLink+id);
}


export const fetch_suggestions = (title: string,n: number)=>{
  const key = "YOUR KEY"
  let config = {
    headers: {'Accept': 'application/json'},
    params: {
      q: title,
      maxResults: n||5,
      key: key,
      part: "snippet",
      type: "video"
    },
  }

  return http.get(`https://youtube.googleapis.com/youtube/v3/search`, config)
}