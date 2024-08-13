import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React,{useState} from 'react'
import { auth } from '../config/firebaseConfig'
// import { auth,googleProvider } from '../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
function SignUp() {
    document.title="CodeCache | Sign up "
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [differError, setDifferError] = useState('')
    const [showerror,setShowError]= useState(false)
    const navigate = useNavigate()
    const logInPage= ()=>{navigate('/')}
    const [userName,setUserName]= useState('')
    function generateRandomString() {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]:;<>,.?~-';
      const passwordLength = getRandomInt(8, 32);
    
      let password = '';
    
      while (!isStrongPassword(password)) {
        password = '';
        for (let i = 0; i < passwordLength; i++) {
          const randomIndex = getRandomInt(0, charset.length - 1);
          password += charset[randomIndex];
        }
      }
    
      return password;
    }
    
    // Helper function to generate a random integer in a specified range
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Helper function to check if a password matches the regex pattern
    function isStrongPassword(password) {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,32}$/;
      return regex.test(password);
    }
    
    // Example usage
    
    
    const onSubmitData= async()=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,32}$/;
      if(emailRegex.test(email)&& passwordRegex.test(password)){
        // console.log("valid email and password");
        setShowError(false)
        await createUserWithEmailAndPassword(auth,email,password).catch((e)=>setDifferError(e))
        // console.log(differError);
        
        // console.log(auth?.currentUser?.uid)
        localStorage.setItem("userName",userName)
        const usid = auth?.currentUser?.uid +"Vu/12"
        localStorage.setItem("YBFYBVu/12",usid)
        
        navigate('/setimg')
        // try {
          // } catch (error) {
          //   console.log(error);
          //   // setDifferError(error)
          // }
        }
        else{
          // console.log("Invalid email or password")
          setShowError(true)
        }
        // console.log("Email : ",email,"\nPassword : ",password);
    }
    
    return (
    <div className='bg-black h-screen flex items-center justify-center'>
      
    
      <div className='flex flex-col items-center w-96 p-8 rounded-xl mt-10 mb-10'>
        <h1 className='font-sans text-white text-3xl pt-4 pb-10'>| CodeCache |</h1>
        <small className='text-white font-sans text-sm mb-10'>Transfer your code safely anywhere anytime</small>
        <input type="text" placeholder='Enter your Name ' className=
        'pl-4 w-full h-12 text-xl outline-none bg-gray-300 mb-4 rounded-lg' onChange={(e)=>{setUserName(e.target.value)}} /> 
        <input type="email" placeholder='Enter your Email ' className=
        "pl-4 w-full h-12 text-xl outline-none bg-gray-300 mb-4 rounded-lg" onChange={(e)=>{setEmail(e.target.value)}} /> 
      {/* <input type="password" minLength={8} placeholder='Enter your Password ' className=' w-96 mt-4 font-sans text-xl pl-6 h-[53px] outline-none bg-gray-300 py-3 text-black rounded-lg' onChange={(e)=>{setPassword(e.target.value)}} />  */}
 <div className='relative w-full mb-7'>
    <input
        type={showPassword ? 'text' : 'password'}
        minLength={8}
        placeholder='Enter your Password'
        className='pl-4 w-full h-12 text-xl outline-none bg-gray-300 rounded-lg pr-12'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className='text-white absolute top-0 right-0 mr-2 mt-3'>
        <input
        
          type='checkbox'
          className='mr-1'
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>
      
      </div>
      <small className={`text-white font-sans text-sm mb-8 ${showerror ? "" : "hidden"}`}
      >Please Write the correct email and password. <br /> password must be 8 or more characters . 1 number , <br /> and 1 special character . One lower and One uppercase character</small>
         <button className='w-[88%] h-12 cursor-pointer hover:bg-blue-700 rounded-lg bg-blue-800 text-white mb-6' onClick={onSubmitData}>Sign Up</button>  
      <small className='text-white ml-4 mt-6 font-sans text-sm'>Have an account? <span><a onClick={logInPage} className='text-blue-400 hover:text-blue-600 cursor-pointer'>Sign in</a></span></small> 
  </div>
  
      
        {/* <button className='w-[180px] cursor-pointer hover:bg-yellow-700 rounded-lg ml-[620px] h-[42px] bg-yellow-800 text-white mt-9' type='submit' onClick={onSubmitData} >Sign Up</button> */}
        {/* <button className='w-[180px] cursor-pointer hover:bg-yellow-700 rounded-lg ml-[620px] h-[42px] bg-yellow-800 text-white mt-9' onClick={logOut}>log out</button> */}
    </div>
  )
}

export default SignUp
