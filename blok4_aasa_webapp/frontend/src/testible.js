import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const [data, setData] = useState({
  //   message: "",
  //   count: null
  // });

  // useEffect(() => {
  //   axios.get("http://145.49.127.248:1880/groep10")
  //     .then(response => {
  //       setData({
  //         message: response.data.message,
  //         count: response.data.count,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setData({
  //         message: "Error fetching data",
  //         count: null,
  //       });
  //     });
  // }, []);


  // const [image, setImage] = useState('/images/background.png')

  // useEffect(() => {
  //   const randomNumber = Math.floor(Math.random() * 10) + 1;
  //   if (randomNumber == 7) {
  //     setImage('/images/lebron.jpg')
  //   }
  // }, [])

  // const [inputValue, setInputValue] = useState("");
  // const [messages, setMessages] = useState([]);

  // const sendCommand = (e) => {
  //   if (e.key === "Enter") {
  //     setMessages(prev => [...prev, ">> " + inputValue]);
  //     setInputValue("");
  //   }
  // };

  return (
    // <div className="h-screen bg-center bg-cover flex flex-row bg-gray-100 overflow-hidden" style={{backgroundImage: "url("+image+")"}}>
    //   {/* <img className="h-screen w-full" src="/images/background.png" alt="background" /> */}
    //   <div className="w-32 h-screen" style={{backgroundColor: "#060c1c"}}>
    //     <img src="/images/AASA_Black_Background.png" alt="Logo"/>
    //     <div>
    //     </div>
    //   </div>
    //   <div className="w-full">
    //     {/* <h1 className="text-4xl font-bold text-blue-600">{data.message}</h1> */}
    //     <h1 id="title" className="text-4xl font-bold text-white m-8">Dashboard</h1>
    //     <div id="dashboard" className="bg-center m-32 flex flex-row items-center justify-center" style={{ height: "32rem" }}>
    //       <div id="function-panel" className="flex flex-col justify-between h-full w-96 mr-3" style={{ width: "36rem"}}>
    //         <div className="flex-1 bg-black rounded-2xl mb-3 opacity-85" style={{backgroundColor: "#060c1c"}}></div>
    //         <div className="h-32 bg-black rounded-2xl flex items-center justify-center opacity-85" style={{backgroundColor: "#060c1c"}}>
    //           <button className="p-2 rounded-lg mr-2 font-bold text-xl text-white" style={{backgroundColor: "#c6002a"}}>
    //             Meting maken
    //           </button>
    //           <button className="p-2 rounded-lg font-bold text-xl text-white" style={{backgroundColor: "#c6002a"}}>
    //             Vlag Planten
    //           </button>
    //         </div>
    //       </div>
    //       <div id="console-container" className="flex flex-col h-full w-96 rounded-2xl">
    //         <div id="console-panel" className="bg-black flex-1 p-4 rounded-2xl overflow-auto opacity-80 font-sourcecode">
    //           {messages.map((msg, index) => (
    //             <p key={index} className="font-sourcecode text-white">{msg}</p>
    //           ))}
    //           <p className="font-sourcecode text-white">{data.message}</p>
    //           <div className="flex flex-row">
    //             <p className="text-white font-sourcecode">{'>>'}</p>
    //             <input id="console-input" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={sendCommand} className="bg-black pl-2 w-full rounded-xl text-white font-sourcecode focus:outline-none focus:ring-0 focus:border-transparent" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <h1 className="text-4xl font-bold text-blue-600">Landing Page</h1>
    </div>
  );
}

export default App;
