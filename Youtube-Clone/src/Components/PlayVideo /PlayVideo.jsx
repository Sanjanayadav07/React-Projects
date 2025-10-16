import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // Fetch video data
    const fetchVideoData = async () => {
        try {
            const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
            const res = await fetch(videoDetails_url);
            const data = await res.json();
            if (data.items && data.items.length > 0) setApiData(data.items[0]);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    // Fetch channel data
    const fetchChannelData = async (channelId) => {
        try {
            const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
            const res = await fetch(channelData_url);
            const data = await res.json();
            if (data.items && data.items.length > 0) setChannelData(data.items[0]);
        } catch (error) {
            console.error('Error fetching channel data:', error);
        }
    };

    // Fetch comments
    const fetchComments = async () => {
        try {
            const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
            const res = await fetch(comment_url);
            const data = await res.json();
            if (data.items) setCommentData(data.items);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Load video data on mount
    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    // Load channel data and comments when video data is ready
    useEffect(() => {
        if (apiData) {
            fetchChannelData(apiData.snippet.channelId);
            fetchComments();
        }
    }, [apiData]);

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title={apiData ? apiData.snippet.title : 'Video Player'}
            ></iframe>

            <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>

            <div className="play-video-info">
                <p>
                    {apiData
                        ? `${value_converter(apiData.statistics.viewCount)} Views • ${moment(
                            apiData.snippet.publishedAt
                        ).fromNow()}`
                        : '16k Views • some time ago'}
                </p>

                <div>
                    <span>
                        <img src={like} alt="like" />{' '}
                        {apiData ? value_converter(apiData.statistics.likeCount) : '0'}
                    </span>
                    <span>
                        <img src={dislike} alt="dislike" /> 2
                    </span>
                    <span>
                        <img src={share} alt="share" /> Share
                    </span>
                    <span>
                        <img src={save} alt="save" /> Save
                    </span>
                </div>
            </div>

            <hr />

            <div className="publisher">
                <img
                    src={channelData?.snippet?.thumbnails?.default?.url || '/default-avatar.png'}
                    alt={channelData?.snippet?.title || 'Channel avatar'}
                />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
                    <span>
                        {channelData
                            ? `${value_converter(channelData.statistics.subscriberCount)} Subscribers`
                            : '1M Subscribers'}
                    </span>
                </div>
                <button className='subscribe-btn'>Subscribe</button>
            </div>

            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description here'}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : '0'} Comments</h4>

                {/* Display fetched comments */}
                {commentData.map((item, index) => {
                    const comment = item.snippet.topLevelComment.snippet;
                    return (
                        <div className="comment" key={index}>
                            <img src={comment.authorProfileImageUrl || user_profile} alt={comment.authorDisplayName} />
                            <div>
                                <h3>
                                    {comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span>
                                </h3>
                                <p dangerouslySetInnerHTML={{ __html: comment.textDisplay }}></p>
                                <div className="comment-action">
                                    <img src={like} alt="like" />
                                    <span>{value_converter(comment.likeCount)}</span>
                                    <img src={dislike} alt="dislike" />
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div>
        </div>
    );
};

export default PlayVideo;
