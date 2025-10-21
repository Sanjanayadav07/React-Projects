import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDgzYTM1MGRiNzVkOGQyYjQ0YzQzN2Q3NTg0MzAyOCIsIm5iZiI6MTc1ODgwNzAzNC43MTEsInN1YiI6IjY4ZDU0M2ZhNjA0ODA0YmZkYTViMTViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.94MxIYVsLhfgynYK45lEvLzzAWFuQRtQ6UlBt6gTWhk'
  }
};
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])

  return (
    <div className='player'>
      <img src={back_arow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
       <div className='player-info'>
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
       </div>
    </div>
  )
}

export default Player
