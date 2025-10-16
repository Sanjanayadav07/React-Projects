import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`
        )
        const data = await res.json()
        setApiData(data.items || [])
      } catch {
        setApiData([])
      }
    }
    fetchData()
  }, [categoryId])

  return (
    <div className='recommended'>
      {apiData.length ? apiData.map((item, i) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={i} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <div className='vid-info'>
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </Link>
      )) : <p>No videos available</p>}
    </div>
  )
}

export default Recommended
