import { useState, useEffect, memo } from "react";
import { TailSpin, Hearts } from "react-loading-icons";
import classes from "./home.module.scss"
import {AiOutlineReload} from "react-icons/ai"

export default memo( function Home(params) {
  const [quote, setQuote] = useState({ author: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState(false)


  function getData() {
    fetch(`https://api.quotable.io/random`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          setQuote({ author: data.author, content: data.content });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false)
        
      });
  }

  useEffect(() => {
    setIsLoading(true);
  const handleLoad =  setTimeout(() => {  getData();}, 1000)

   return ()=> clearTimeout(handleLoad )
     
  }, [next]);


const handleNext = () =>{
        setNext(!next)
}
  let contentView = isLoading ? (
    <Hearts stroke="#4FBF90" speed={1} fill="#FFE5A4"  className={classes["loading"]}  />
  ) : (
    <div  className={classes["cont"]}>
         <div className={classes["quote-cont"]}>
       <h3 className={classes["quote"]}> <q>{quote.content}</q> </h3> 
      <p className={classes["author"]}>{quote.author}</p> 
       <AiOutlineReload className={classes["reload"]} onClick={handleNext}/>
    </div>
       
    </div>
   
   
  );

  console.log(quote, 99);

  return <div>{contentView}</div>;

})
