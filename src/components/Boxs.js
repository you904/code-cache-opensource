import React,{useState} from 'react'
function Boxs(){
    const [divCount, setDivCount] = useState(0);
    const [selBtn, setSelBtn] = useState("");
const first = ()=>{ 
    setSelBtn('first')}
const second = ()=>{
    setSelBtn('second')
    
    }
const third = ()=>{ 
setSelBtn('third')
}

const [selectedLanguage, setSelectedLanguage] = useState('javascript');
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
 
  const [code, setCode] = useState('');

 
    
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <button
  onClick={handleAddDiv}
  disabled={visibleDivs >= maxDivs}
  className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded ${
    visibleDivs >= maxDivs && 'hidden'
  }`}
>
  Add Div
</button>

        <div class="flex flex-wrap hidden bg-gray-200 p-1 rounded border border-gray-300">
  <label class="flex-1 text-center radio group" onClick={first}>
    <input type="radio" name="radio" checked class="opacity-0 absolute"/>
    <span class={`${selBtn === "first" ? "bg-white" : "bg-gray-200"} name flex items-center justify-center rounded cursor-pointer p-2 transition duration-150 ease-in-out  group-hover:bg-white`}>
      HTML
    </span>
  </label>

  <label class="flex-1 text-center radio group" onClick={second}>
    <input type="radio" name="radio" class="opacity-0 absolute"/>
    <span class={`${selBtn === "second" ? "bg-white" : "bg-gray-200"} name flex items-center justify-center rounded cursor-pointer p-2 transition duration-150 ease-in-out  group-hover:bg-white`}>
      React
    </span>
  </label>

  <label class="flex-1 text-center radio group" onClick={third}>
    <input type="radio" name="radio" class="opacity-0 absolute"/>
    <span class={`${selBtn === "third" ? "bg-white" : "bg-gray-200"} name flex items-center justify-center rounded cursor-pointer p-2 transition duration-150 ease-in-out  group-hover:bg-white`}>
      Vue
    </span>
  </label>
</div>




        
        


  <div className="mt-4 space-y-4">
  {[...Array(visibleDivs).keys()].map((index) => (
    <div key={index} className="text-white px-20 py-2 rounded">
      <div className="mr-10">
        <label className="text-white">Select Language:</label>
        <select
          value={divs[index].language}
          onChange={(e) => handleLanguageChange(index, e.target.value)}
          className="bg-white text-black p-2 rounded ml-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          {/* Add more options for other languages */}
        </select>
      </div>

      <div className="flex pt-20 pb-11 ml-10 bg-black">
        <h1 className="ml-10 mr-12 text-xl">{divs[index].language.toUpperCase()} Code:</h1>
        <textarea
          className="text-black p-4 font-sans text-2xl outline-none rounded-2xl mr-36"
          cols="71"
          rows="10"
          placeholder={`Enter your ${divs[index].language} code here`}
          value={divs[index].code}
          onChange={(e) => handleCodeChange(index, e.target.value)}
          maxLength={3200}
        ></textarea>
        </div>
        <div className='flex pb-10 bg-black items-center justify-center'>
        <button className='w-36 h-10 mr-6 rounded-2xl bg-blue-700 hover:bg-blue-500  text-white' >Submit Code</button></div>

    </div>
  ))}
</div>

      </div>)
}
export default Boxs