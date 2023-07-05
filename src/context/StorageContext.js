import React, { useContext, useState} from 'react';
import { 
  collection, 
  query,
  where, 
  getCountFromServer,
  addDoc, 
  orderBy, 
  getDocs,
  limit, 
  deleteDoc,
} from "firebase/firestore"; 
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from '../firebase';

const StorageContext = React.createContext();

export function useStore(){
    return useContext(StorageContext)
}


export function StorageProvider({children}) {
  const[items,setItems] = useState([]);
  const[myItems,setMyItems] = useState([]);
  const[expandedItem,expandItem] = useState([]);
  const storage = getStorage();

    async function isNewUser(uid){
        const userDataRef = collection(db,"UserData");
        const q = query(userDataRef, where("uid", "==", uid));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count===0;
    }

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

    async function getItemByUid(uid) {
      const q = query(
        collection(db, "SellerItems"),
        where("uid", "==", uid),
        limit(1)
      );
    
      const querySnapshot = await getDocs(q);
    
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const itemData = doc.data();
        expandItem(itemData);
      } else {
        console.log("Item not found");
      }
    }

    async function deleteItem(itemId) {
      try {
        const querySnapshot = await getDocs(query(collection(db, "SellerItems"), where("uid", "==", itemId)));
        if (!querySnapshot.empty) {
          const docToDelete = querySnapshot.docs[0];


          const imageRef = ref(storage, `SellerImages/${docToDelete.data().uid}`);

        deleteDoc(docToDelete.ref).then(() =>{
          deleteObject(imageRef).then(() => {
            console.log("Item deleted successfully");
          }).catch((error) => {
            console.log(error)
          });
        }).catch((error) => {
          console.log(error)
        });


          // await deleteDoc(docToDelete.ref);
          setMyItems([]);
        } else {
          console.log("No matching item found");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
    
    async function getMyItems(uid){
      const q = query(
        collection(db, "SellerItems"),
        where("user", "==", uid),
        orderBy("timestamp", "desc")
      );
    
      const querySnapshot = await getDocs(q);
    
      let filteredItems = [];
      querySnapshot.forEach((doc) => {
        filteredItems.push(doc.data());
      });
    
      setMyItems(filteredItems);
    }

    async function getFilteredItems(branch){
      if(branch === "")
      {
        getItems();
        return;
      }

      const q = query(
        collection(db, "SellerItems"),
        where("Branch", "==", branch),
        orderBy("timestamp", "desc")
      );
    
      const querySnapshot = await getDocs(q);
    
      let filteredItems = [];
      querySnapshot.forEach((doc) => {
        filteredItems.push(doc.data());
      });
    
      setItems(filteredItems);
    }

    async function getItems(){
      const q = query(collection(db,"SellerItems"),orderBy("timestamp","desc"));
      const querySnapshot = await getDocs(q);
      let newItem = [];
      querySnapshot.forEach((doc)=>{
        newItem.push(doc.data());
        setItems(newItem);
      })
    }

    const value = {
        isNewUser,
        storeUser,
        uploadItem,
        getItems,
        items,
        expandItem,
        expandedItem,
        getItemByUid,
        myItems,
        setMyItems,
        getMyItems,
        deleteItem,
        getFilteredItems
    }

    return (
        <StorageContext.Provider value={value}>
          {children}
        </StorageContext.Provider>
        );
}