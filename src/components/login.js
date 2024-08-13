import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React,{useState} from 'react'
import { auth } from '../config/firebaseConfig'
// import { auth,googleProvider } from '../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showerror,setShowError]= useState(false)
    const notify = (x) => toast(x);
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    document.title="CodeCache | Sign in "
    
    const signUpPage = ()=>{
      navigate('/signup')
    }
    const logOut = async()=>{
      await signOut(auth)
    }

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
    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function isStrongPassword(password) {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,32}$/;
      return regex.test(password);
    }
    
    
    
    const signIn = async()=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,32}$/;
      if(emailRegex.test(email)&& passwordRegex.test(password)){
        setShowError(false)
        await signInWithEmailAndPassword(auth,email,password)
        const usid = auth?.currentUser?.uid +"Vu/12"
        navigate('/SetCode')
      }
      else{
          setShowError(true)
        }
    }
  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      
      <div className='flex flex-col items-center w-96 p-8 rounded-xl '>
        <h1 className='font-sans text-white text-3xl pt-4  pb-10'>| CodeCache |</h1>
        <small className='font-sans text-white text-sm mb-10'>Transfer your code safely anywhere anytime</small>
      <input type="email" placeholder='Enter your Email ' className=' pl-4 w-full h-12 text-xl outline-none bg-gray-300 mb-4 rounded-lg' onChange={(e)=>{setEmail(e.target.value)}} /> 
     <div className='relative w-full mb-7'>
     
       <input type={showPassword ? 'text' : 'password'} minLength={8} placeholder='Enter your Password ' className=
       'w-full h-12 text-xl outline-none bg-gray-300 rounded-lg pr-12 pl-4' value={password} onChange={(e)=>{setPassword(e.target.value)}} /> 
     <label className='text-white absolute top-0 right-0 mr-2 mt-3'>
        <input
        
          type='checkbox'
          className='mr-1'
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>

     </div>
     <small className={`text-white font-sans text-sm mb-8 ${showerror ? "" : "hidden"}`}>Please Write the correct email and password. <br /> password must be 8 or more characters . 1 number , <br /> and 1 special character . One lower and One uppercase character</small>

         <button className='w-[88%] h-12 cursor-pointer hover:bg-blue-700 rounded-lg bg-blue-800 text-white mb-6' onClick={signIn}>Sign In</button>  
      <small className='text-white font-sans text-sm'>Don't have an account? <span><a onClick={signUpPage} className='text-blue-400 hover:text-blue-600 hover:cursor-pointer ml-1'>Sign Up</a></span></small> 
 
  </div>
  
        </div>
  )
}

export default Login
