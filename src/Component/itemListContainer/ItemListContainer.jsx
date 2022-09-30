import React from "react";
import { useEffect, useState } from "react";
import Item from "./Item.jsx";
import { Link } from "react-router-dom";
import {getFirestore, collection, getDocs} from "firebase/firestore"
const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);

   /* const buscarProductos = async () => {
        try {
            const response = await fetch(`/datos.json`)
            const data = await response.json();
            setProductos(data);

        } catch (e) {
            console.log(`error ${e}`);
        }
    }*/

    useEffect(() => {
        const db= getFirestore();
        const items= collection(db,"items");
        getDocs(items).then((snapshot)=>{
           const docs= snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
           }))
           setProductos(docs);
})
       // buscarProductos()
    },[]);
    
return (
        <>
            <div className="container mt-5">  
                <div className="row ">
                    {productos.map((productos, index) => {
                return ( 
                        <div className="col-md-3 " key={index}>
                        <Link to={`Item/${index}`}>
                            <Item producto={productos} />
                        </Link>
                        </div>
                        )})}
                </div>
            </div>
        </>
        )
};
                           
export default ItemListContainer;

                        

                        
                        





