import {useState } from "react";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const handleLogin = (currentToken) => {
    localStorage.setItem('token', currentToken);
    setToken(currentToken);
  }

  return (
    <>
      {!token ? <Login onLogin={handleLogin} /> : <Home token={token} handleToken={handleLogin} />}
    </>
  );
}

export default App;
