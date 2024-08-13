import React, { useEffect, useState } from 'react'
import { signOut,onAuthStateChanged } from 'firebase/auth'
import {  useNavigate } from 'react-router-dom'
import { db, auth } from '../config/firebaseConfig'
import {addDoc,
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc } from 'firebase/firestore'
import pic from './pic/dosri.jpg'
function CodeGet() {
  const [Codebase, setCodebase] = useState([])
  const [changeEdit,setChangeEdit]= useState('')
  document.title="CodeCache | Get Code From database"
    const userDetails = collection(db, "Code")
    const [buttonVisible, setButtonVisible] = useState(true);
    
    const [usid, setuserid] = useState("");
    const navigate = useNavigate()
    const newPage2=()=>{
        navigate('/editUser')
    }
    const newPage=()=>{
      navigate('/SetCode')
    }
    const logOut = async()=>{
        await signOut(auth)
        // console.log("logged out");
        localStorage.clear()
        navigate('/')
      }
      const [userCode,setUserCode] = useState([])
      const [userDocs, setUserDocs] = useState([]);
      
   
      const editDocument = async (userId, timeId, newTitle, newContent) => {
        // console.log('Editing document with userId:', userId, 'and timeId:', timeId);
        try {
          const q = query(
            collection(db, 'Code'), // Replace 'yourCollectionName' with your actual collection name
            where('userId', '==', userId),
            where('timeId', '==', timeId)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              // console.log('Document ID:', doc.id);
              await updateDoc(doc.ref, {
                'content.Title': newTitle,
                'content.Code': newContent,
              });
              // setEditedDocs((prevEditedDocs) => [...prevEditedDocs, doc.id]);
            });
          } else {
            // console.log('No matching documents found for userId:', userId, 'and timeId:', timeId);
          }
        } catch (error) {
          console.error('Error editing document:', error);
        }
      };
    const onCheckUser = async () => {
      const userId = auth?.currentUser?.uid
      try {
          const usersCollection = collection(db, 'Code');
              const userQuery = query(usersCollection, where('userId', '==', auth?.currentUser?.uid));
              const userQuerySnapshot = await getDocs(userQuery);
              
              // Extract the documents from the query snapshot
              const userDocuments = userQuerySnapshot.docs.map((doc) => doc.data());
              // console.log(userDocuments.length);
              // console.log(userCode[0]);
              setUserCode(userDocuments)
              // setChangeEdit(user)
              setButtonVisible(false)
            } catch (error) {

        }
    }
    const [delset,setdelset] = useState(false)
    const reverse = ()=>{setdelset(!delset)}
    const [tobedel,settobedel] = useState('')
    const reversedel = (x)=>{
      setdelset(!delset)
      settobedel(x)
      // console.log(tobedel);
      // console.log(x);
    }
    
    const handleContentChange = (e) => {
      setChangeEdit(e.target.value);
      };
    const deleteDocument = async (userId, timeId) => {
      try {
        const q = query(
          collection(db, 'Code'), // Replace 'yourCollectionName' with your actual collection name
          where('userId', '==', userId),
          where('timeId', '==', timeId)
        );
        // console.log(q);
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            // console.log('Document ID:', doc.id);
            await deleteDoc(doc.ref);
            // setDeletedDocs((prevDeletedDocs) => [...prevDeletedDocs, doc.id]);
          });
          setDeletedFlag(true);
        } else {
          // console.log('No matching documents found.');
        }
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    };
    const finalyDel = async()=>{
      const q = query(
        collection(db, 'code'),
        where('userId', '==', auth?.currentUser?.uid),
        where('timeId', '==', tobedel)
      );
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
      const docRef = doc(db, 'code', thatid); // Replace 'collectionName' and 'documentId' with your actual collection name and document ID
      
      
      deleteDoc(docRef)
        .then(() => {
          // console.log('Document deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
    }
    const [newTitleValue,setnewTitleValue]=useState('')
    const [newContentValue,setnewContentValue]=useState('')
    const [deletedFlag, setDeletedFlag] = useState(false);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            // Get the UID of the currently authenticated user
            const currentUserId = user.uid;
            // console.log(currentUserId);
            // Query the Firestore "users" collection based on the current user's UID
            const usersCollection = collection(db, 'coder');
            const userQuery = query(usersCollection, where('userId', '==', auth?.currentUser?.uid));
            const userQuerySnapshot = await getDocs(userQuery);
  
            // Extract the documents from the query snapshot
            const userDocuments = userQuerySnapshot.docs.map((doc) => doc.data());
  
            // Set the userDocs state with the retrieved documents
            setUserDocs(userDocuments);
            // console.log(userDocs);
          } catch (error) {
            // console.error('Error fetching user documents:', error.message);
          }
        }
      });
  
      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    }, [auth, db,deletedFlag]);
     useEffect(() => {
    // Call onCheckUser when the component mounts
    // console.log("Time : ",);
    onCheckUser();
  }, [setUserCode,deletedFlag]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
        const toggleDropdown = () => {
          setDropdownOpen(!isDropdownOpen);
        };
        const selectedPicture = pic;
        const handleDelete = async (id) => {
    try {
      // console.log(String(id));
      try {
        await deleteDoc(doc(db, 'Code', id));
        // console.log('Code deleted successfully');
        setUserCode(userCode.filter((code) => code.timeId !== id)); // Remove the deleted code from state
      } catch (error) {
        // console.error('Error deleting code:', error.message);
      }      
    } catch (error) {
      // console.error('Error deleting code:', error.message);
    }
  };
    return (

        <div className={`bg-black text-white ${userCode.length > 0 ? '' : 'min-h-screen'}`}>
                <div className='pt-3 flex items-center justify-between mb-10'>
      <h1 className='font-sans text-white pl-4 md:pl-10 text-2xl inline'>| CodeCache |</h1>
        
      
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
        Change Profile
      </a>
    </li>
    <li>
      <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:bg-white-400 hover:text-black" onClick={newPage}>
        Send Code
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
            
<button
  className={`w-[80%] ml-10 xl:w-[10%]  mb-[40%] xl:ml-[45%] h-10 sm:w-180 cursor-pointer bg-blue-900 hover:bg-blue-700 rounded-lg mx-auto sm:ml-36 sm:mr-4  mt-9 ${buttonVisible ? '' : 'hidden'}`}
  onClick={onCheckUser}
>
  Fetch Data
</button>



<div id="popup-modal" tabindex="-1" className={`${delset?'':'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={reverse} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button onClick={finalyDel} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
        </div>
    </div>
</div>

{userCode.length >= 2 ? (
<div className={` text-white`}>
  {userCode.map((code) => (
    <div className='mx-auto sm:ml-36 pb-5' key={code.content?.Title}> 
      <h1 className='font-sans xl:mr-[50%] ml-5 xl:text-2xl text-xl sm:text-2xl md:text-3xl lg:text-4xl  mt-6 sm:mt-24 mb-3 sm:mb-5 text-white '>
        Title 
      </h1>
      <input
        type="text"
        maxLength={23}
        onChange={(e)=>{setnewTitleValue(e.target.value)}}
        className='text-white  xl:ml-[23%] bg-gray-800 ml-5 px-4 sm:px-10 w-[90%] sm:w-[600px] py-2 sm:py-3 font-sans text-xl sm:text-2xl outline-none rounded-2xl mb-3 sm:mb-5 mx-auto'
        value={code.content.Title}
      />

      <h1 className='font-sans ml-5 xl:mr-[48%] xl:text-2xl text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 sm:mt-24 mb-3 sm:mb-5 text-white '>
        Content
      </h1>
      <textarea
        type="text"
        maxLength={3000}
        onChange={(e)=>{setnewContentValue(e.target.value)}}
        className='text-white xl:ml-[23%] ml-5 bg-gray-800 p-2 sm:p-4 font-sans text-xl sm:text-2xl outline-none rounded-2xl mb-6 sm:mb-10 w-[90%] sm:w-[600px] mx-auto'
        cols="50"
        rows="8"
        value={code.content.Code}
      />

      <div className='flex justify-center'>
        <button disabled onClick={() => editDocument(code.userId, code.timeId, newTitleValue, newContentValue)} className='bg-blue-700 cursor-pointer hover:bg-blue-600 font-sans outline-none rounded-md p-2 m-3 px-6 sm:px-10 text-white'>
          Edit
        </button>
        <button  onClick={()=>deleteDocument(code.userId,code.timeId)} className='bg-slate-100 cursor-pointer hover:bg-slate-300 font-sans outline-none rounded-md p-2 m-3 px-6 sm:px-8 font-bold text-blue-700'>
          Delete
        </button>
      </div>

      <hr className='text-white mt-6 sm:w-full md:w-[780px] mx-auto' />
    </div>
  ))}
</div>):( <div className='text-white h-screen text-center pt-56 justify-center items-center '>
{/* <h1 className='text-5xl pb-10'>| Code Cache |</h1> */}
      <p>You Should Send atleast 2 Codes to cloud</p>
      </div>)}
        </div>
    )
}

export default CodeGet
