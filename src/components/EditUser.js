//  EditUser
import React,{useState, useEffect} from 'react'

import { signOut ,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {db,auth} from '../config/firebaseConfig'
import 'firebase/firestore'
import userImg from '../pics/icons8-user-96.png'
import { addDoc, collection, getDoc, doc,getDocs,query, where,serverTimestamp ,updateDoc} from 'firebase/firestore'
// import { document } from 'postcss'
// import "../pics/Snap.jpg"
import pic from './pic/dosri.jpg'
function EditUser() {
  document.title="CodeCache | Edit your Profile"
    const [htmlCode,setHtmlCode]=useState("")
    const [jsCode,setJsCode]=useState("")
    
    const [actualCode, setActualCode]= useState("")
    const [codeTitle, setCodeTitle]= useState("")
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate()
    const userDetails = collection(db,"Code")
    
    const newPage=()=>{
        navigate('/GetCode')
    }
    const newPage2=()=>{
      navigate('/SetCode')
  }
    const logOut = async()=>{
      await signOut(auth)
      localStorage.clear()
      // console.log("logged out");
      navigate('/')
    }
    const [count,setCount]=useState(0)
    const [disappearDiv , setDisappearDiv] = useState(false)
    const handleHtmlChange = (e) => {
    setHtmlCode(e.target.value);
  };
  
  // console.log(auth?.currentUser?.uid);
  const [userDocs, setUserDocs] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tasveer,setTasveer] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const currentUserId = user.uid;
          const usersCollection = collection(db, 'coder');
          const userQuery = query(usersCollection, where('userId', '==', auth?.currentUser?.uid));
          const userQuerySnapshot = await getDocs(userQuery);
          const userDocuments = userQuerySnapshot.docs.map((doc) => doc.data());
          setUserDocs(userDocuments);
          setNewName(userDocuments[0]?.name);
          setTasveer(userDocs[0]?.imageUrl)
          setEmail(userDocuments[0]?.Email);
          // console.log();
        } catch (error) {
          // console.error('Error fetching user documents:', error.message);
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db]);
// Call the fetchImageUrl function
const handleInputChange = (e) => {
  setNewName(e.target.value);
  };

  // console.log(imageUrl);
 const [newName , setNewName] = useState('')
  // console.log(userDocs[0]?.Date==formattedDate);
  const handleJsChange = (e) => {
    setJsCode(e.target.value);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
        const toggleDropdown = () => {
          setDropdownOpen(!isDropdownOpen);
        };
        const selectedPicture = pic;
        const maxDivs = 3; // Set your desired maximum limit
    const [divs, setDivs] = useState(Array(3).fill({ language: 'javascript', code: '' }));

  const handleLanguageChange = (index, language) => {
    setDivs((prevDivs) => {
      const newDivs = [...prevDivs];
      newDivs[index] = { ...newDivs[index], language };
      return newDivs;
    });
  };
  const updateField = async (docRef, fieldName, newValue) => {
    try {
        await docRef.update({ [fieldName]: newValue });
        // console.log('Field updated successfully!');
    } catch (error) {
        console.error('Error updating field:', error);
    }
};

  const handleEditField = async () => {
    
    const q = query(collection(db, 'coder'), where('userId', '==', auth?.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    let thatid = ''
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      // console.log('Document ID:', doc.id);
      thatid = doc.id
      // console.log('Document data:', doc.data());
      // You can perform further operations with the document here
    });
  }
  // console.log(thatid);
      const docRef = doc(db, 'coder', thatid); // Replace 'collectionName' and 'documentId' with your actual collection name and document ID
      const newData = {
        'name': newName
        // Add more fields as needed
      };
      
      // Update the document with the new data
      updateDoc(docRef, newData)
        .then(() => {
          // console.log('Document updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating document:', error);
        });
      // await docRef.update({})
  // await updateField(docRef, 'name', newName); // Replace 'fieldName' with your actual field name

      // const userRef = doc(db, "coder",userDocs[0]["userId"]);
      // const userDocRef = db.collection("coder").doc(auth?.currentUser?.uid);
      // await updateDoc(userRef, {
      //   "name": newName});
      // await userDocRef.update({ name: name });
      
    
  };
  const [visibleDivs, setVisibleDivs] = useState(0);

  const handleAddDiv = () => {
    if (visibleDivs < maxDivs) {
      setVisibleDivs((prevVisibleDivs) => prevVisibleDivs + 1);
    }
  };
  
  const handleCodeChange = (index, code) => {
    setDivs((prevDivs) => {
      const newDivs = [...prevDivs];
      newDivs[index] = { ...newDivs[index], code };
      return newDivs;
    });
  };
 const submitCode = async ()=>{
  const userId = auth?.currentUser?.uid
  try {
    const usersCollection = collection(db, 'coder');
    const userQuery = query(usersCollection, where('userId', '==', userId));
    const userQuerySnapshot = await getDocs(userQuery);

    const userDocuments = userQuerySnapshot.docs.map((doc) => doc);

    if (userDocuments.length > 0) {
      const userDoc = userDocuments[0];
      const currentCounter = userDoc.data().counter || 0;
      const currentDate = userDoc.data().Date 
      const currentDatePc = new Date();
      const formattedDate = currentDatePc.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    
      // Update the document with the incremented counter
      // console.log(currentCounter)
      if(currentDate!=formattedDate){
        await updateDoc(userDoc.ref, { Date: formattedDate });
        await updateDoc(userDoc.ref, { counter: 0 });
      }
      else{
        if(currentCounter>=3){
          // console.log("Limited is exceded")
          setDisappearDiv(true)
        }
        else{
          const userId = auth?.currentUser?.uid
          const usersCollection = collection(db, 'Code')
          if (codeTitle.length > 2 && actualCode.length > 6){
          const codeContent = {
                  Title: codeTitle,
                  Code: actualCode,
                };
          await addDoc(usersCollection,{
            Email:auth?.currentUser?.email,
            userId:userId,
            createdDate:formattedDate,
            content:codeContent,
            timeId : Date.now()
          })
          await updateDoc(userDoc.ref, { counter: currentCounter + 1 });
          setActualCode('')
          setCodeTitle('')
        }

        }
      }

    }
  } catch (error) {
    // console.error('Error updating counter:', error.message);
  }
 }
  
const [isHovered, setIsHovered] = useState(false);

  return (<>
    <div className='bg-black pt-5 pb-5 h-screen text-white' >
      <div className="pt-3 flex items-center justify-between mb-10">
  <h1 className="font-sans text-white pl-4 md:pl-10 text-2xl inline">| CodeCache |</h1>

  <img
    src={userDocs[0]?.imageUrl}
    alt="Selected Profile Picture"
    className="rounded-full w-14 h-14 md:mr-20 ml-2 md:ml-4 cursor-pointer"
    onClick={toggleDropdown}
  />

  {/* Dropdown menu */}
  <div
  id="dropdownInformation"
  className={`${
    isDropdownOpen ? '' : 'hidden'
  } w-44 absolute right-0 sm:right-[53%] lg:right-0 top-14 inline bg-black divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
>
  <div className="px-4 py-3 text-sm text-white-900 dark:text-white">
    <div>{userDocs[0]?.name}</div>
    <div className="font-medium truncate">{userDocs[0]?.Email}</div>
  </div>
  <ul className="py-2 w-44 text-sm text-white-900 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
    <li>
      <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:bg-white-400 hover:text-black" onClick={newPage2}>
        Send Code
      </a>
    </li>
    <li>
      <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:bg-white-400 hover:text-black" onClick={newPage}>
        Check Database
      </a>
    </li>
  </ul>
  <div className="py-2 w-44">
    <a href="#" className="px-4 py-2 text-sm text-white-900 hover:text-white hover:bg-blue-500 mt-1" onClick={logOut}>
      Sign out
    </a>
  </div>
</div>
</div>

  
    
    
<div className='flex justify-center items-center sm:mt-0 mt-40'>
  <div className='relative w-36 h-36 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden'>
    <img
      src={userDocs[0]?.imageUrl}
      alt="image"
      className={`w-full h-full rounded-full outline-none ${isHovered ? 'blur' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
    {isHovered && (
      <div className='absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
        <img src={userImg} alt="edit icon" className='w-36' />
      </div>
    )}
  </div>
</div>

<h1 className='text-xl text-center p-5 text-white'>{email}</h1>
<input
  type="text"
  value={newName}
  onChange={handleInputChange}
  className='text-white bg-gray-800 px-4 sm:px-10 mb-7 ml-4 w-[90%] sm:w-[600px] py-2 sm:py-3 font-sans text-xl sm:text-2xl outline-none rounded-3xl sm:mb-5 xl:ml-[28.5%] mx-auto mt-3'
/>

<br />

<button  className='ml-[130px] mr-auto sm:ml-[600px]  sm:mr-[600px] p-4 px-16 rounded-3xl hover:bg-blue-800 outline-none bg-gray-700 text-white' onClick={handleEditField}>
  Edit
</button>

    </div>
      </>
  )
}

export default EditUser
