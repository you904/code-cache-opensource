import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {db,auth} from '../config/firebaseConfig'
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'
// import '../index.css'
function Form() {
    const [name,setName]= useState('')
    const [rollNum,setRollNum]= useState('')
    const [Phone,setPhone]= useState('')
    const [cash,setCash]= useState('')
    const [course,setCourse]= useState('')
    const [remarks,setRemarks]= useState('')
    const navigate = useNavigate()
    const userDetails = collection(db,"feeForm")
    const submitForm= async()=>{
        console.log(name);
        console.log(rollNum);
        console.log(Phone);
      //   console.log(cur,cash);
        console.log(remarks);

        try {
         await addDoc(userDetails,{Name:name,RollNum:rollNum,PhoneNum:Phone,Cash:cash,Course:course,Remarks:remarks,userId: auth?.currentUser?.uid})
         alert('added')
         setName('')
        setRollNum('')
        setPhone('')
        setCash('')
        setCourse('')
        setRemarks('')
        navigate('/Reciept')
     } catch (error) {
         console.log(error);
     }

        
  }
  return (
    <body className='bg-black h-screen'>
         <div >
      <h1 className="text-3xl text-yellow-800 font-bold pt-12 text-center mb-[20px]">
      Donation voucher
      </h1>
        <h1 className='text-white text-xl ml-56 inline'>Donor Name:-</h1>
        <input  type="text"  value={name} onChange={(e)=>setName(e.target.value)} className='outline-none w-64 pl-5 rounded-lg ml-[90px] h-[42px]' placeholder='Enter the Donor Name'/> 
        
        <input type="number" value={rollNum} onChange={(e)=>setRollNum(e.target.value)} className='outline-none w-64 pl-5 rounded-lg ml-9 h-[42px] mt-9 mb-9' placeholder='Enter the Roll Num'  />
    <br />   
     <h1 className='text-white text-xl ml-56 inline'>Phone number:-</h1>
        
        <input type="tel" value={Phone} onChange={(e)=>setPhone(e.target.value)} className='outline-none w-[550px] pl-5 rounded-lg ml-[75px] h-[42px] mt-9 mb-9'placeholder='Enter the phone number' />
        <br />
     <h1 className='text-white text-xl ml-56 inline mt-9 mb-9'>Cash amount:-</h1>
        <input type="text" value={course} onChange={(e)=>setCourse(e.target.value)} className='outline-none w-64 pl-5 rounded-lg ml-[85px] h-[42px] mt-9 mb-9'placeholder='Enter the Course name' />
        <input type="number" value={cash} onChange={(e)=>setCash(e.target.value)} className='outline-none w-64 pl-5 rounded-lg ml-9 h-[42px] mt-9 mb-9'placeholder='Enter the Amount' />
     <br />
     <h1 className='text-white text-xl ml-56 inline'>Remarks:-</h1>
        
        <input type="text" value={remarks} onChange={(e)=>setRemarks(e.target.value)} className='outline-none w-[550px] pl-5 rounded-lg ml-[120px] h-[42px] mt-9 mb-9'placeholder='Enter the Remarks' />
        <br />
     <button onClick={submitForm} className='w-[180px] cursor-pointer hover:bg-yellow-700 rounded-lg ml-[620px] h-[42px] bg-yellow-800 text-white mt-9'>Submit</button>
    </div>
    </body>
   
  )
}

export default Form
