import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebaseConfig'
function Protected(props) {
    const {element} = props
    const navigate = useNavigate()
    useEffect(()=>{
    // const iflog = auth?.currentUser?.uid
    const iflog = localStorage.getItem('login')
    // console.log(iflog);
    if(!iflog){
        navigate('/')
    }
    })
  return (
    <div>
      {/* <Component></Component> */}
    </div>
  )
}

export default Protected
