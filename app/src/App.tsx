import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(function () {
    console.log("Ewqe");

    const response = axios.get('http://localhost:3000/')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])

  const handleSignup = () => {
    const response = axios.post('http://localhost:3000/register', {name, email, password})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(name, email, password, response);
  }

  const handleLogin = () => {
    const response = axios.post('http://localhost:3000/users', {email, password})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(email, password);
  }
  
  return (
    <div className="App">
      <span>name</span>
      <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <span>email</span>
      <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <span>password</span>
      <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignup}>submit</button>
      <button onClick={handleLogin}>submit</button>
    </div>
  );
}

export default App;
