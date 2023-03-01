import { DynamicStar } from 'react-dynamic-star';
import { addDoc, collection } from "firebase/firestore"
import { db } from '../firebase/firebaseConfig';
const Card = ({ data, user }) => {

  const productData = {
    category: data.category,
    price: data.price,
    rating: data.rating.rate,
    image: data.image,
    userId: user?.uid
  }

  const columnRef = collection(db, "products");

  const handleAdd = () => {
    addDoc(columnRef, productData).then(()=>{
      console.log("product added");
    })
  }

  return (
    <div className="card">
      <img src={data.image} />
      <p>{data.category}</p>
      <div className="add-btn-div">
        <div>
          <h3 className="price-text" >${data.price}</h3>
          <DynamicStar width={10} height={10} rating={data.rating.rate} outlined={true} />
        </div>
        <button onClick={handleAdd} className="add-btn" type="button">+</button>
      </div>
    </div>
  );
}
 
export default Card;