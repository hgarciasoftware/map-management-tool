import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Neuralyzer() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/'), 11000);
  }, [navigate]);

  return (
    <div style={{aspectRatio: '16 / 9'}}>
      <iframe style={{height: '100%', width: '100%'}}
        src="https://www.youtube-nocookie.com/embed/RRq_MvT33pA?controls=0&autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Neuralyzer;
