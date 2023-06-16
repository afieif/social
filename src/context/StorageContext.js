import React, { useContext, useState} from 'react';
import { collection, query, where, getCountFromServer, addDoc, orderBy, getDocs} from "firebase/firestore"; 
import { db } from '../firebase';

const StorageContext = React.createContext();

export function useStore(){
    return useContext(StorageContext)
}


export function StorageProvider({children}) {
  const[items,setItems] = useState([]);

    async function isNewUser(uid){
        const userDataRef = collection(db,"UserData");
        const q = query(userDataRef, where("uid", "==", uid));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count===0;
    }

    // add loading and routing to home functionality

    async function storeUser(uid, branch, year) {
        try {
          await addDoc(collection(db, "UserData"), {
            uid : uid,
            Branch : branch,
            GradYear : year
          });
          console.log("User data stored successfully!");
        } catch (error) {
          alert("Error storing user data");
          console.log(error);
        }
      }

    async function uploadItem(data,setLoader,navigate){
      try {
        await addDoc(collection(db, "SellerItems/"), data);
        console.log("Item uploaded");
        setLoader(false);
        navigate()
        alert('Upload complete')
      } catch (error) {
        alert("Error uploading item");
        setLoader(false)
        console.log(error);
      }
    }

    async function getItems(){
      const q = query(collection(db,"SellerItems"),orderBy("timestamp","desc"));
      const querySnapshot = await getDocs(q);
      let newItem = [];
      querySnapshot.forEach((doc)=>{
        newItem.push(doc.data());
        console.log(doc.data());
        setItems(newItem);
      })
    }

    const value = {
        isNewUser,
        storeUser,
        uploadItem,
        getItems,
        items
    }

    return (
        <StorageContext.Provider value={value}>
          {children}
        </StorageContext.Provider>
        );
}