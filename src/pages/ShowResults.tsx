import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


function ShowResults(props: any) {
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
    <div className='flex flex-col bg-slate-300'>
        <Header/>
        <div className='flex flex-col m-8 lg:flex-row  items-center justify-center '>
            <div className='flex flex-col lg:mr-8 mt-12'>
              <p ><span className='text-bold'>Title:</span> {data.title}</p> 
              <p><span className='text-bold'>Location:</span> {data.location}</p>  
              <p><span className='text-bold'>Photographer: </span>{data.photographer}</p> 
              <p><span className='text-bold text-justify'>Description:</span> {data.description}</p> 
              <p><span className='text-bold'>Keywords : </span>{Array.isArray(data.keywords) ? data.keywords.toString() : data.keywords}</p> 
              <p> <span className='text-bold'>Date :</span> {data.date_created}</p> 
            </div> 
            <img src={image} alt="Nasa Image" className='w-3/4 rounded-2xl items-center justify-center h-screen mt-8'/>
        </div>
    </div>
  )
}

export default ShowResults