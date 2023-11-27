import React , {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Lightbox } from "react-modal-image";
import './App.css';




function App() {

  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=fa889800bdb2d9d17a1282b0aa9f49f4&photoset_id=72177720297747444&format=json&nojsoncallback=1',
      headers: { 
        'Cookie': 'ccc=%7B%22needsConsent%22%3Afalse%2C%22managed%22%3A0%2C%22changed%22%3A0%2C%22info%22%3A%7B%22cookieBlock%22%3A%7B%22level%22%3A0%2C%22blockRan%22%3A0%7D%7D%7D'
      }
    };
    
    
    axios(config)
    .then(function (response) {
      console.log(response.data.photoset.photo);
      setData([...response.data.photoset.photo].reverse());
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }, [])

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  //https://live.staticflickr.com/65535/51972451305_e27e0bb21f.jpg
  

  return (
    <div className="App">
    <nav>
            <div className="navinner">
            
            <h3 className="logo" id="shortname">placeholder.raw</h3>
            <div className="top-right">
            <a target="_blank" href="https://www.instagram.com/placeholder.raw/"><i class="bi bi-instagram"></i></a>
            </div>
            </div>   
        </nav>
      <p className="title">"What's pinterest?"</p>
      <p className="tagline">placeholder.raw</p>
      {/* <h1 className="title">placeholder.raw</h1>
      <p className="tagline">"Color is descriptive. Black and white is interpretive."</p> */}
      <div className="container">
        <div className="grid">
          {data.map((value) => {
            return (
              <div className="padding">
              {/* //<img src={`https://live.staticflickr.com/65535/51972451305_e27e0bb21f.jpg`}/> */}
              <img 
              className="singleImage" 
              src={`https://live.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`}
              onClick={() => openModal(`https://live.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`)}
              />
              </div>
            );
          })}
        </div>
      </div>
      <div className="end">
        <h2 >placeholder.raw</h2>
      </div>
      <div className="midbg"></div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal">
        <img 
    src={selectedImage} 
    style={{ width: '100%', height: '100%', textAlign:'center' }} 
    alt="Selected"
  />
      </Modal>

    </div>
  );
}

export default App;
