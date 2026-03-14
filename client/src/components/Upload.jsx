import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { API_BASE } from '../api';

const Upload = () => {

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append('upload_preset', type === 'image' ? 'images_preset' : 'videos_preset');

    try {
      let cloudName = 'drgqcwxq6';
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      console.log('data', data)

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      if (resourceType == 'video') {
        setVideoUrl(secure_url)
        setLoading(false);
      }

      return secure_url;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const imgUrl = await uploadFile('image');

      const videoUrl = await uploadFile('video');

      await axios.post(`${API_BASE}/api/videos/upload`, { imgUrl, videoUrl });

      setImg(null);
      setVideo(null);

      console.log("File upload success!");
      setLoading(false);
      // navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
                             
      <form onSubmit={handleSubmit} className='form-container'>
        <center>
          <div style={{ border: '4px solid black', width: '510px', height: '400px' }}>
            <label htmlFor="video">Video:</label>
            <br />
            <input
              type="file"
              className="file-input w-full max-w-xs"
              accept="video/*"
              id="video"
              onChange={(e) => setVideo((prev) => e.target.files[0])}
            />
            {
              loading && <center><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <ThreeDots
                height="80"
                width="80"
                display='inline-block'
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              </div>
              </center>
            }
            {videoUrl && <center><div style={{ width: '500px', border: '2px solid black', marginTop: '20px' }}>
              <video width="100%" controls autoPlay controlsList="nodownload">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            </center>}
          </div>
        </center>
        <br />
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            className="file-input w-full max-w-xs"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit" className='btn btn-neutral'>Upload</button>
        {
          loading && <center><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <ThreeDots
            height="80"
            width="80"
            display='inline-block'
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
          </div>
          </center>
        }
      </form>
      
    </div>
  )
}
export default Upload;


// import { useState } from "react";


