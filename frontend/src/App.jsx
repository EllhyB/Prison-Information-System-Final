import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://prison-information-system.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <Outlet />
    </div>
  );
}
export default App;
