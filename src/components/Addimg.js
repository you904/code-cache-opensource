import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {db,auth} from '../config/firebaseConfig'
import { addDoc, collection, getDoc, getDocs,setDoc } from 'firebase/firestore'
import {getStorage,ref,uploadBytes,updateMetadata,getDownloadURL} from "firebase/storage"

function Addimg() {
    
        const [selectedPicture, setSelectedPicture] = useState(null);
        const [downloadURL, setDownloadURL] = useState(null);
        const navigate = useNavigate()
        const taker = ()=>{
        navigate('/SetCode')
        }
        const storage = getStorage();
        // const handlePictureChange = (event) => {
        //   const userId = auth?.currentUser?.uid
        //   const usersCollection = collection(db, 'coder');
        //   const file = event.target.files[0];
        //   const storage = getStorage()
          
        //   const image = ref(storage,`/profile/${file.name}`)
        //   if (file) {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //       setSelectedPicture(e.target.result);
        //       // console.log(selectedPicture);
              
        //     };
            
        //     reader.readAsDataURL(file);
        //     uploadBytes(image, file)
        //     .then((snap) => {
        //       const contentType = file.type || 'application/octet-stream';
        //       return updateMetadata(image, { contentType });
        //     })
        //       .then( () => {
        //         return getDownloadURL(image);
        //       })
        //       .then(async(url) => {
        //          setDownloadURL(url);
        //         console.log('Download URL:', url);
        //         console.log(userId);
        //         console.log(downloadURL);
        //         const currentDate = new Date();
        //         const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        //         const username = localStorage.getItem("userName")
        //         await addDoc(usersCollection,{
        //           Email:auth?.currentUser?.email,
        //           imageUrl:url,
        //           userId:userId,
        //           code:[],
        //           counter:0,
        //           Date:formattedDate,
        //           name:username
        //         })
        //       })
        //       .catch((error) => {
        //         console.error('Error:', error);
        //       });
            
              
              
        //     }
            
        //   };
        const registerUser = ()=>{}
         const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setSelectedPicture(file);
    // Optionally, you can preview the selected image here using FileReader
  };

  const handleStartJourney = async () => {
    const userId = auth?.currentUser?.uid;
    const usersCollection = collection(db, 'coder');
    const imageRef = ref(storage, `/profile/${selectedPicture.name}`);

    await uploadBytes(imageRef, selectedPicture)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then(async (url) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });
        const username = localStorage.getItem('userName');
        await addDoc(usersCollection, {
          Email: auth?.currentUser?.email,
          imageUrl: url,
          userId: userId,
          code: [],
          counter: 0,
          Date: formattedDate,
          name: username,
        });
        navigate('/SetCode');
      })
      .catch((error) => {
        // console.error('Error:', error);
      });
  };
  return (
    <div className="bg-black h-screen flex items-center justify-center">
  <div className="bg-white p-6 md:p-14 px-4 md:px-9 rounded-lg shadow-md w-[90%] max-w-md">
    <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-6 font-sans">
      {selectedPicture ? 'Start Using CodeCache' : 'Add Profile Picture'}
    </h1>
    <p className="font-sans text-sm">
      {selectedPicture ? 'Transfer your code safely anywhere anytime' : ''}
    </p>

    {selectedPicture ? (
      <div className="mt-4">
        <img
          src={selectedPicture ? URL.createObjectURL(selectedPicture) : ''}
          alt="Selected Profile Picture"
          className="rounded-full w-20 h-20 mb-3 ml-56 md:ml-72 sm:ml-96 cursor-pointer"
          onClick={handlePictureChange}
        />
        <div className='flex items-center '>
        <label
          htmlFor="profilePictureInput"
          className="cursor-pointer bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 mr-3 rounded-full  transition duration-300 inline text-center"
          >
          Change Picture
        </label>
        <input
          type="file"
          id="profilePictureInput"
          className="hidden"
          onChange={handlePictureChange}
        
          />
        <button
          onClick={handleStartJourney}
          className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300 block"
          >
          Start Your Journey
        </button></div>
          </div>
    ) : (
      <div className="flex flex-col items-center mt-4">
        <label
          htmlFor="profilePictureInput"
          className="cursor-pointer bg-blue-500 text-white py-2 px-2.5 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="profilePictureInput"
          className="hidden"
          onChange={handlePictureChange}
        />
      </div>
    )}
    {!selectedPicture && (
      <p className="text-gray-600 text-sm mt-4 md:mt-6">
        Please upload a profile picture to personalize your account.
      </p>
    )}
  </div>
</div>


  )
}

export default Addimg
