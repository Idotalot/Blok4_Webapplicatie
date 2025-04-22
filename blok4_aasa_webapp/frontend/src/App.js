import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    message: "",
    count: null
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test1/")
      .then(response => {
        setData({
          message: response.data.message,
          count: response.data.count,
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">{data.message}</h1>
      <h1 className="">{data.count}</h1>
    </div>
  );
}

export default App;
