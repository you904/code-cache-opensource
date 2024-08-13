import React,{useState} from 'react'
import {db,auth} from '../config/firebaseConfig'
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'
function Store() {
    const [name,setName]=useState('')
    const [age,setAge]=useState(0)
    const [userInfo,setUserInfo]=useState([])
    const userDetails = collection(db,"userTable")
    const onCheckUser = async()=>{
      try {
        const data = await getDocs(userDetails)
        const filteredData = data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id
        }))
        setUserInfo(filteredData)
      } catch (error) {
        
      }
    }
    // console.log(userInfo);
    const onSubmitUser = async()=>{ ///add data in firestore via addDoc 
        try {
            await addDoc(userDetails,{Name:name,Age:age,userId: auth?.currentUser?.uid})
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <input type="text" placeholder='enter your name ' onChange={(e)=>{setName(e.target.value)}}/>
      <input type="number" placeholder='enter your Age ' onChange={(e)=>{setAge(e.target.value)}} />
        <button type='submit' onClick={onSubmitUser} >Submit User</button>
        <button type='submit' onClick={onCheckUser}>Check User</button>
        {/* <div id="div" > */}
    {
          userInfo.map((user)=>(
            <div key={user.userId}>
              <section class="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" >
  <div class="row d-flex justify-content-center">
    <div class="col-md-10">
      <div class="card">
        <div class="card-body m-3">
          <div class="row">
            <div class="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
              <img src={user.Picture}
                class="rounded-circle img-fluid shadow-1" alt="woman avatar" width="200" height="200" />
            </div>
            <div class="col-lg-8">
              <p class="text-muted fw-light mb-4">
                {user.Para}
              </p>
              <p class="fw-bold lead mb-2"><strong>{user.Name}</strong></p>
              <p class="fw-bold lead mb-2"><strong>{user.Age}</strong></p>
              <p class="fw-bold text-muted mb-0">{user.Profess}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
              {/* <h1>Name : {user.Name}</h1>
              <h1>Age : {user.Age}</h1> */}
            </div>

          ))
        }
        {/* </div> */}
        
    </div>
  )
}

export default Store
