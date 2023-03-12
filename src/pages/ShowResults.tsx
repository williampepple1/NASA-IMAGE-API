import { useState, useEffect} from 'react';
import {Link, useLocation } from 'react-router-dom';
import axios from 'axios';

type collectionDataType = {
  photographer: string;
  location: string;
  title: string;
  description: string;
  date_created: string;
  keywords: string[];
}

function ShowResults() {
  const location = useLocation()
  const data = location.state.data;
  const jsonURL = location.state.jsonURL;
  const [image, setImage] = useState('')

  useEffect(()=>{
    axios
      .get(jsonURL)
      .then(response => {
        setImage(response.data[0])
        })
  },[])
  return (
    <div>
      title: {data.title}
      location: {data.location}
      photographer: {data.photographer}
      description: {data.description}
      Keywords : {Array.isArray(data.keywords) ? data.keywords.toString() : data.keywords}
      Date : {data.date_created}
      <img src={image} alt="Nasa Image"/>
    </div>
  )
}

export default ShowResults