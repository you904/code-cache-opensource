import React,{useState, useEffect} from 'react'
import { signOut ,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {db,auth} from '../config/firebaseConfig'
import 'firebase/firestore'
import { addDoc, collection, getDoc, doc,getDocs,query, where,serverTimestamp ,updateDoc} from 'firebase/firestore'
// import { document } from 'postcss'
// import "../pics/Snap.jpg"
import pic from './pic/dosri.jpg'
function CodeSet() {
    const [htmlCode,setHtmlCode]=useState("")
    const [jsCode,setJsCode]=useState("")
    const [actualCode, setActualCode]= useState("")
    const [codeTitle, setCodeTitle]= useState("")
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate()
    const userDetails = collection(db,"Code")
    document.title="CodeCache | Send your Code to CodeCache's Database"
    const newPage=()=>{
        navigate('/GetCode')
    }
    const newPage1=()=>{
        navigate('/editUser')
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
    }, [auth, db]);
    // Call the fetchImageUrl function
   

  // console.log(imageUrl);
 
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
  // const submitCode = async (index) => {
  //   const currentDiv = divs[index];
  //   const { language, code } = currentDiv;
  
  //   console.log(language, code);
  
  //   const codeData = {
  //     userId: auth?.currentUser?.uid,
  //   };
  
  //   if (code.trim() !== '') {
  //     const Code = 'code'
  //     // Assuming you want to submit the code only if it is not empty
  //     codeData["language"] = language;
  //     codeData["code"] = code;
  //     // codeData[Code] = {language:language,code:code}
  //     try {
  //       // Attempt to add the code to the database
  //       if(count<=3){
  //       await addDoc(userDetails, codeData);
  //       alert('Code added successfully');
  //       setCount(count+1)
  //       // If successfully added, remove the div from the array
  //       setDivs((prevDivs) => prevDivs.filter((_, i) => i !== index));}
  //     } catch (error) {
  //       console.error('Error adding code to the database:', error);
        
  //     }
  //   } else {
  //     alert('Write something');
  //   }
  // };
//   const submitCode = async () => {
//     console.log('submitCode function called');
  
//     // const userCollection = collection(db, 'coder');
//     // const userDocRef = doc(userCollection, { userId: auth?.currentUser?.uid });
    
//     const userCollection = collection(db, 'coder');
//     const userId = auth?.currentUser?.uid;
//     console.log(userId);
//     if (codeTitle.length > 2 && actualCode.length > 6) {
//       console.log('Code and title are valid.');
      
//       const codeContent = {
//       Title: codeTitle,
//       Code: actualCode,
//     };
//   // Create a query to find the document with the matching userId
//   const userQuery = query(userCollection, where('userId', '==', userId));

//   // Execute the query and get the result
//   getDocs(userQuery)
//     .then((querySnapshot) => {
//       if (!querySnapshot.empty) {
//         // Assuming there's only one document with the matching userId
//         const userDoc = querySnapshot.docs[0];
//         const userData = userDoc.data();

//         // Check if notes_sent_today property exists before accessing it
//         const notesSentToday = userData?.notes_sent_today || 0;

//         // Check if the user has reached the daily limit
//         if (notesSentToday >= 3) {
//           console.log('User has reached the daily limit of notes.');
//           return;
//         }

//         // Proceed with adding the new note
//         addNewNote(userId, codeContent, notesSentToday);
//       } else {
//         console.log('User document does not exist.');
//       }
//     })
//     .catch((error) => {
//       console.error('Error querying user collection:', error);
//     });
// } else {
//   console.log('Fields should not be empty or invalid.');
// }
//   };
  
  //   function addNewNote(user_id, noteContent, notesSentToday) {
  //     const notesRef = db.collection('programs');
  //     console.log(notesRef);
  //     notesRef.add({
  //         user_id: user_id,
  //         content: noteContent,
  //         timestamp: serverTimestamp()
  //     })
  //     .then(docRef => {
  //         console.log('Note added with ID:', docRef.id);
  //         // Update user's notes_sent_today
  //         // updateUserNotesSentToday(auth?.currentUser?.uid, notesSentToday + 1);
  //     })
  //     .catch(error => {
  //         console.error('Error adding note:', error);
  //     });
  // }

  
//   function updateUserNotesSentToday(user_id, newNotesSentToday) {
//     const userRef = db.collection('coder').doc(user_id);

//     userRef.update({
//         notes_sent_today: newNotesSentToday
//     })
//     .then(() => {
//         console.log('User notes_sent_today updated.');
//     })
//     .catch(error => {
//         console.error('Error updating user notes_sent_today:', error);
//     });
// }
  return (
    <div className='bg-black pt-5 pb-5 text-white' >
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
      <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:bg-white-400 hover:text-black" onClick={newPage1}>
        Change Profile
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

  
    
    
      
     <h1 className='font-sans text-center text-4xl font-bold text-white mb-5'>Transfer your Code to the Cloud</h1>
     <p className='font-sans text-sm text-center p-2  text-gray-200'>Content field can be up to 3000 characters long, Title can be up to 23 characters long. you can send <br /> up to three codes per day. You have to Send atleast two codes to the Cloud.</p>
     
           
     <div className="flex flex-col items-center justify-center min-h-screen ">

  <div className="w-full sm:w-[600px] xl:ml-[28.5%] mx-auto">
       <h1 className={`text-white ${disappearDiv ? 'sm:relative sm:left-[50%] sm:-translate-x-1/2' : 'hidden'} bg-red-800 w-full sm:w-[480px] text-2xl p-3 text-center mx-auto sm:mx-0`}>Error: you can only send 3 codes per day</h1>
    <h1 className="font-sans pl-2 text-xl sm:text-2xl xl:text-3xl text-white mt-6 sm:mt-24 mb-3 sm:mb-5">
      Title
    </h1>
    <input
      type="text"
      maxLength={23}
      value={codeTitle}
      className="text-white bg-gray-800 px-4 sm:px-10 w-full py-2 sm:py-3 font-sans text-xl sm:text-2xl outline-none rounded-2xl mb-3 sm:mb-5"
      onChange={(e) => setCodeTitle(e.target.value)}
    />

    <h1 className="font-sans pl-2  text-xl sm:text-2xl xl:text-3xl text-white mt-6 sm:mt-24 mb-3 sm:mb-5">
      Content
    </h1>
    <textarea
      type="text"
      maxLength={3000}
      value={actualCode}
      className="text-white bg-gray-800 p-2 sm:p-4 font-sans text-xl sm:text-2xl outline-none rounded-2xl mb-6 sm:mb-10 w-full"
      cols="50"
      rows="8"
      onChange={(e) => setActualCode(e.target.value)}
    />
  </div>
  
  <div className={`flex justify-center pt-10 mb-1 ${disappearDiv ? 'hidden' : ''}`}>
    <button
      className="w-36 h-10 mr-4 sm:mr-6 rounded-2xl bg-blue-700 hover:bg-blue-500 text-white"
      onClick={submitCode}
    >
      Submit Code
    </button>
    <button
      className="w-36 h-10 rounded-2xl bg-blue-700 hover:bg-blue-500 text-white"
    >
      Get Code
    </button>
  </div>
</div>

    
     
      
    
    </div>
  )
}

export default CodeSet
