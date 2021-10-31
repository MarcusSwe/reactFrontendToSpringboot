
import React, {useState} from "react";


function App() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("not logged in");

 function addUser() {
   async function fetchAdd(){
     const resp = await fetch('http://localhost:8080/user/register', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         username: user,
         password: password
       }) 
     })
     switch(resp.status) {
       case 409:
         alert("user already exist")
         break;
       case 500:
         alert("something went wrong")
         break;
      default:
        alert("user created")         
     }
   }
   fetchAdd();
 }

  return (
    <div>
      <div>
    Name: <input type="text" name="username" onChange={e => {setUser(e.target.value)}}/>
    Password: <input type="text" name="username" onChange={e => {setPassword(e.target.value)}}/>
    <button onClick={e =>alert(user)}>Login</button><button onClick={e =>{addUser()}}>Register </button>
    <button>show own favorites</button><button>log off</button>{loggedIn}
      </div>      
    </div>
  );
}

export default App;


// <button onClick={e =>alert(user)}>