import { useEffect, useState } from "react";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { DynamicStar } from "react-dynamic-star";
const Sold = () => {
  let navigate = useNavigate()

  const [userProducts, setUserProducts] = useState([])

  useEffect(()=>{

    onAuthStateChanged(auth, (currentUser)=> {
      if(!currentUser){
        navigate("/")
      } else {

        const colRef = collection(db, "products")
        getDocs(colRef).then(snapshot=>{
          let userProductsArray = [];
          snapshot.docs.forEach(doc => {
            if(doc.data().userId === auth.currentUser.uid){
              userProductsArray.push({ ...doc.data(), id: doc.id })
            }
          })     
          setUserProducts(userProductsArray);
          localStorage.setItem("alert", "alert");
        }).catch(error => console.log(error.message))
      }
    })
  }, [])

  const handleCancel = (docId) => {
    setUserProducts(prev => [...prev].filter((element)=> element.id !== docId))
    const getDocument = doc(db, "products", docId)
    deleteDoc(getDocument).then(()=>{
      console.log("product canceled");
    })
  }

  return (
    <div className="sold-products-page">
      <div className="sold-cards-container">
        {userProducts.length ? userProducts.map((product)=> (
          <div key={product.id} className="sold-card">
            <img className="sold-product-image" src={product.image} alt="product image" />
            <p>{product.category}</p>
            <div className="cancel-btn-div">
              <div>
                <h3 className="price-text" >${product.price}</h3>
                <DynamicStar width={10} height={10} rating={product.rating} outlined={true} />
              </div>
              <button onClick={()=> handleCancel(product.id)} className="cancel-btn" type="button">Cancel</button>
            </div>
          </div>
        )) : <h3>Nothing for now😥</h3>}
      </div>
    </div>
  );
}
 
export default Sold;