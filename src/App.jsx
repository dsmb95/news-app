import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    
    console.log('API_KEY:', API_KEY); // Debug: see if it's loading
  
    if (!API_KEY) {
      console.error('API_KEY is not set');
      setLoading(false);
      return;
    }

    axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <>
    <h1>The News Room</h1>
      <div className='card-grid'>
        {articles.map((article) => (
            <article className='card'>
              <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={article.urlToImage}
                  title={article.title}
                />
                <CardContent>
                  <a href={article.url}> 
                    <Typography gutterBottom variant='h5' component="div">
                      {article.title}
                    </Typography>
                  </a>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {article.content}
                  </Typography>
                </CardContent>
              </Card>
            </article>
        ))}
      </div>
    </>
  );
}

export default App;
