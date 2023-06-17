import React, {useState, useRef} from 'react'
import SellAppBar from './SellAppBar';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import {useStore} from '../../context/StorageContext';
import { useNavigate } from 'react-router-dom';


export default function Sell() {
    const [bookName, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [branch, setBranch] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [image, setImage] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [preview, setPreview] = useState('');
    const [loader,setLoader] = useState(false);
    const inputRef = useRef(null);
    const {user} = useAuth();
    const {uploadItem} = useStore();
    const Navigate = useNavigate();

    function NavigateToHome(){
      Navigate('/')
    }

    async function upload(file){
      // console.log(getFileExtensionFromBase64(file));
      setLoader(true);
      let d = new Date();
      let timeStamp = d.getTime()
      let uid = user.uid + timeStamp;
      const storageRef = ref(storage,'SellerImages/'+uid);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      setLoader(false)
      console.log(error);}, () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url);
        const data = {
          uid : uid,
          timestamp : timeStamp,
          Branch : branch,
          name : bookName,
          price : price,
          whatsapp : whatsappNumber,
          description : description,
          image: url
        };
        uploadItem(data,setLoader,NavigateToHome);
      })});
  }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(bookName===''||branch===''||price===''||whatsappNumber.length!==10||image==='')
      {
          alert('Please Enter all details')
      }
      else
      {
        upload(image);
      }
    };
  
    const handleImageClick = () => {
      // Handle image click logic here
      inputRef.current.click();

    };
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // FileReader.onload event is triggered when the file is successfully read
          // The result property contains the base64 data URL of the file
          const base64Data = reader.result;
          // Set the base64 data in the state using the setImage function
          setImage(file);
          setPreview(base64Data);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDialogClose = (e) => {
      setShowImage(false);
    };
  
    return (
      <div className="body full center">
        <SellAppBar/>
        <form onSubmit={handleSubmit} className='flex-col'>
            <input className='sell-input first' type="text" placeholder='Name of Item' value={bookName} onChange={(e) => setBookName(e.target.value)} />
            <textarea rows={3} style={{"resize": "none"}} className='sell-input' type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input className='sell-input' type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            <select className='sell-input' value={branch} onChange={(e) => setBranch(e.target.value)} >
            <option value="">Select branch</option>
            <option value="COMPS">COMPS</option>
            <option value="MECH">MECH</option>
            <option value="ECS">ECS</option>
            <option value="AIDS">AIDS</option>
            </select>
            <input className='sell-input' type="number" name='phone' pattern="[0-9]{10}" placeholder='Whatsapp Number' value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
            <button className='btn-input' type="button" onClick={handleImageClick}>{image?"Select different image":"Add an Image"}</button>
            {image && <button className='btn-input' type="button" onClick={()=>setShowImage(true)}>View Image</button>}
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {showImage && 
            <dialog open onClick={handleDialogClose} className='image-container'>
            <img src={preview} alt='product' height={'200px'}/>
            </dialog>
            }
            <button className='btn-input submit-btn' type="submit">{loader?"Uploading..":"Submit"}</button>
        </form>
      </div>
    );
}
