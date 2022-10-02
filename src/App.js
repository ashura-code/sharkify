import { useState,useEffect } from 'react';
import './App.css';
import {motion} from 'framer-motion';


 

function App() {

  const [Pics,setPics] = useState([])
  const [Hide,SetHide] = useState(false);
  const [Getlink,SetGetlink] = useState("");


  const [Upper,SetUpper] = useState("");
  const [Lower,SetLower] = useState("");

  if(Lower===""|| Lower===" "){
    SetLower("_");
  }


  if(Upper===""|| Upper===" "){
    SetUpper("_");
  }



  const [Meme,SetMeme] = useState([]);





  


  const pic = ()=>{
    var b = []

    fetch('https://raw.githubusercontent.com/ashura-code/sharkify/scrapings/shark.json')
      .then(response => response.json())
      .then(response => {
        for(var i = 0; i < 550;i++){
        console.log(response[0].results[0])
        b.push(response[0].results[i])
        }
        SetMeme(b);
      })
  
	.catch(err => console.error(err));

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3ec58b34c9msh45e1ffdc683c643p1921bfjsn48cf4932a6de',
        'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
      }
    };



    
    fetch('https://bing-image-search1.p.rapidapi.com/images/search?q=funny%20sharks&count=150', options)
      .then(response => response.json())
      .then(response =>{ 
      
      // console.log(response.value[0].thumbnailUrl);
      var a=[];
      for(var  i=0;i<149;i++){
       a.push(response.value[i].contentUrl);
    }
    setPics(a);
    // console.log(a);
    
    
      })
      .catch(err => console.error(err));
      
      
      }

      useEffect(() => {
        pic();
      },[])

      const handleClick = (n) => {
        SetGetlink(n);
        SetHide(!Hide);
      }
      
      



//getlink
//Upper
//Lower

  return (
    <div className="App">

      <motion.h1 whileHover={{scale:1.2,transition: { duration: 1 }}}  whileTap={{ scale: 0.9 }} className="headers">SHARKIFY</motion.h1>
     {Hide &&

      <div className="field">
        
        <input name = "upper" type="text" onChange={(e)=>{SetUpper(e.target.value)}} placeholder = "upper"></input>
        <input name="lower" type="text" onChange={(e)=>{SetLower(e.target.value)}} placeholder="lower"></input>
        <a href={`https://api.memegen.link/images/custom/${Upper}/${Lower}.png?background=${Getlink}`} rel="noreferrer" target="_blank" ><motion.button whileHover={{ scale: 1.2 }} className ="submit button">Submit pa</motion.button></a>
        </div>
        

      }

      <div>
        {
    Pics?.length > 0 ?(
     
      <div className='content'>
        {
          Meme.map((n)=>(
            <motion.img whileHover={{scale:1.1,transition: { duration: 0.1 }}}  whileTap={{ scale: 0.9 }} width="300" height="300" onClick={()=>handleClick(n)} alt="meme"src={n}></motion.img>
          ))
        }
      {
        Pics.map((n)=>(
         <motion.img whileHover={{scale:1.1,transition: { duration: 0.1 }}}  whileTap={{ scale: 0.9 }} width="300" height="300"  onClick={()=>handleClick(n)} alt="shark pic" src={n}></motion.img>
        ))
      }
      </div>
    ):
    (
      <div className='empty'>
        <h2>Loading now..</h2>
        <img alt="loading images" src="	https://mpng.subpng.com/20180322/aaw/kisspng-super…-sharks-5ab421009051d0.3867857415217543685911.jpg"></img>

      </div>
    )

   }
      </div>

      
      
    </div>
  );
}

export default App;
