
import React, {useState} from "react";


function App() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
    Name: <input type="text" name="username" onChange={e => {setUser(e.target.value)}}/>
    Password: <input type="text" name="username" onChange={e => {setPassword(e.target.value)}}/>
    <button onClick={e =>alert(user)}>Login</button><button onClick={e =>alert(password)}>Register </button>
      </div>
      lets see if git is retarded
    </div>
  );
}

export default App;
