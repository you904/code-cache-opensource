import React,{useState} from 'react'
import {db,auth} from '../config/firebaseConfig'
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'
function Reciept() {
  const [userInfo,setUserInfo]=useState([])
  const userDetails = collection(db,"feeForm")
  const [buttonVisible, setButtonVisible] = useState(true);
  const onCheckUser = async()=>{
    try {
      const data = await getDocs(userDetails)
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
        
      }))
      console.log('Fetched Data:', filteredData);
      setUserInfo(filteredData)
      setButtonVisible(false)
    } catch (error) {
      
    }
  }
  return (
    <div className='bg-white text-black h-[100vh]'>
      {buttonVisible && (
        <button
          className='w-[180px] cursor-pointer hover:bg-yellow-700 rounded-lg ml-[620px] h-[42px] bg-yellow-800 text-white mb-5 mt-9'
          onClick={onCheckUser}
        >
          Fetch Data
        </button>
      )}      <br />{
          userInfo.map((user)=>(
            <div key={user.userId}>
              <h1 className='inline font-bold text-4xl ml-24' >DONATION VOUCHER </h1>
      <h1 className='inline ml-96 font-bold text-4xl '>SARFARAZ (hyderabad)</h1>
      <hr className='mt-20' />
              <table className='outline-dashed w-[560px] h-44 ml-96 mt-20 mb-20'>
              
              <h1 className='font-bold text-md ml-4 mt-4'>Branch: SARFARAZ (hyderabad)</h1>
              <h1 className='inline font-bold text-md ml-4 '>Name: {user.Name} |</h1> 
              <h1 className='inline font-bold text-md ml-4 '>Roll No: {user.RollNum}</h1> 
              <h1 className='font-bold text-md ml-4 '>Course: {user.Course}</h1> 
              <h1 className='font-bold text-md ml-4 '>Phone no : {user.PhoneNum}</h1>
              <h1 className='font-bold text-md ml-4 '>Amount Cash : {user.Cash}</h1>
              <h1 className='font-bold text-md ml-4 '>Remarks : {user.Remarks}</h1>

              </table>

            </div>

          ))
        }
    </div>
  )
}

export default Reciept
