import React from 'react'
import './header.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Header() {

const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "ce0dcd91841d5929b585b53d173b7952",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch(()=> {

    }).finally(()=> {

    })

  }, [searchText])
  const fetchFlickrImageUrl = (photo, size)=> {
    //farm66.staticflickr.com/server/id_
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <>
    <div className='Snapshot'>
        <h1>Snapshot</h1>
    </div>
     <div className='search-bar'>
        <input type='text' placeholder='Search Here' onChange={(e)=> {searchData.current = e.target.value}}/>
        <button onClick={()=> {setSearchText(searchData.current)}}><i class="fa-solid fa-magnifying-glass"></i></button>
     </div>
    <section className='buttons'>
      <Link to='/mountains'><button onClick={()=> {setSearchText("mountains")}}>Mountains</button></Link>
      <Link to='/beaches'><button onClick={()=> {setSearchText("beaches")}}>Beaches</button></Link>
      <Link to='/birds'><button onClick={()=> {setSearchText("birds")}}>Birds</button></Link>
      <Link to='/food'><button onClick={()=> {setSearchText("food")}}>Food</button></Link>
    </section>
  <div className='topic'><h2>{searchText}</h2></div> 
    <section className='image-container'>
      
        {imageData.map((imageurl, key)=> {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key}/>
            </article>
          )
          
        })}
      
    </section>

    </>
  )
}
