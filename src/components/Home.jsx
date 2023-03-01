import { useEffect, useState, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Card from './Card';
import thunkFunction from '../redux/fetchRequest';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "./Spinner"
import { auth } from '../firebase/firebaseConfig';
export const apiURI = "https://fakestoreapi.com/products";
import { onAuthStateChanged, signOut } from 'firebase/auth';
function Home() {
  let navigate = useNavigate()
  
  const [data, setData] = useState([])
  const [user, setUser] = useState()
  
  let dispatch = useDispatch();
  

  useEffect(()=>{
    
    onAuthStateChanged(auth, (currentUser)=> {
      if(!currentUser) navigate("/")
      setUser(currentUser)
    })

    dispatch(thunkFunction())
  }, [])

  let state = useSelector((state)=> state);
  const categories = useSelector((state)=> [...new Set(state.map((i)=> i.category))]);

  useEffect(()=>{
    setData(state)

  }, [state])

  const handleSort = (e)=> {
    switch(e.target.value){
      case "Expensive":
        setData(prev=> [...prev].sort((a,b)=> b.price - a.price))
        break
      case "Cheap":
        setData(prev => [...prev].sort((a,b)=> a.price - b.price))
        break
      case "Rating":
        setData(prev => [...prev].sort((a,b)=> b.rating.rate - a.rating.rate))
        break
      default:
        break
    }
  }

  const handleCategory = (e) => {
    setData(state.filter((element)=> element.category === e.target.value));
  }

  let categoryRef = useRef();
  let sortRef = useRef();

  const handleClear = () => {
    setData(state)
    categoryRef.current.value = "category-default"
    sortRef.current.value = "Default";
  }

  return (
    <div className="App">
      <select ref={categoryRef} onChange={handleCategory} defaultValue="category-default">
        <option value="category-default" disabled hidden>Categories</option>
        {categories.length ? categories.map((i)=> <option key={i}>{i}</option>) : null}
      </select>
      <select ref={sortRef} onChange={handleSort} defaultValue="Default">
        <option value="Default" disabled hidden>Sort by</option>
        <option>Expensive</option>
        <option>Cheap</option>
        <option>Rating</option>
      </select>
      <button onClick={handleClear}>Clear filters</button>
      <main>
        {data.map(card => <Card key={card.id} user={user} data={card} />)}
      </main>
    </div>
  )
}

export default Home
