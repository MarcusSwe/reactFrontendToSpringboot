
import React, {useState, useEffect} from "react";


function App() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("not logged in");
  const [token, setToken] = useState("");
  const [product, setProduct] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);

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
     const stringrespons = await resp.text();
     switch(resp.status) {
       case 409:         
         alert(stringrespons)
         break;
       case 500:
         alert(stringrespons)
         break;
      default:
        alert("user created")         
     }
   }
   fetchAdd();
 }

function loginUser() {
  async function fetchLogin(){
    const resp = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: ({
       'username': user,
       'password': password
      })
    })
    const tokenstring = await resp.text();
    if(resp.status===406){
      alert("something went wrong");
    } else {    
    setToken(tokenstring);
    setLoggedIn("logged in as: " + user);
    }
  }
  fetchLogin();
  
}

function logoffUser(){ 
  async function fetchLogOff(){    
    if(token.length>1){
    const resp = await fetch('http://localhost:8080/user/logout', {
      method: 'POST',
      headers: { 'token': token }
     }) 
     setToken("");
     setLoggedIn("not logged in");
    }
    else alert("not logged in!")
  }
  fetchLogOff();
}

function createProduct() {
  async function fetchCreate(){
    const resp = await fetch('http://localhost:8080/product/create', {
      method: 'PUT',
      headers: { 'token': token,
      'Content-Type': 'application/json'
     },
      body: JSON.stringify({
        name: product,
        description: productDesc,
        price: price
      })
    })
    const stringrespons = await resp.text();
    switch(resp.status) {
      case 409:         
        alert(stringrespons)
        break;
      case 500:
        alert(stringrespons)
        break;
     default:
       alert("product created")         
    }
    getProducts();
  }
  fetchCreate();
 
}

function getProducts() {
  fetch('http://localhost:8080/product/all', {
    method: 'GET',
    headers: { 'token': token }
   })
    .then(resp => resp.json())
    .then(data =>{setProducts(data);console.log(data)});
}

useEffect(() => {
   if(token.length>1){
    getProducts();
   } else setProducts([]);    
}, [token]);

  return (
    <div>
      <div>
    Name: <input type="text" name="username" onChange={e => {setUser(e.target.value)}}/>
    Password: <input type="text" name="username" onChange={e => {setPassword(e.target.value)}}/>
    <button onClick={e =>{loginUser()}}>Login</button><button onClick={e =>{addUser()}}>Register </button>
    <button>show own favorites</button><button onClick={e =>{logoffUser()}}>log off</button>{loggedIn}
      </div>     
      <div>
        Product: <input type="text" name="product" onChange={e => {setProduct(e.target.value)}}/>
        Product Description: <input type="text" name="productDesc" onChange={e => {setProductDesc(e.target.value)}}/>
        Product Price: <input type="number" name="price" onChange={e => {setPrice(e.target.value)}}/>
        <button onClick={e =>{createProduct()}}>Create</button>
      </div> 
      <div>
           <ul>
                {products.map((product, index) => {
                    return (<li key={index}>
                        {product.name} | {product.price} | {product.description}
                        <button onClick={() => {
                            fetch('http://localhost:8080/product/add-favorite', {
                                method: 'PUT',
                                headers: { 'token': token,
                              
                               },
                                body: ({
                                  productName: product                                  
                                })                                
                            }).then(resp => {                              
                              switch(resp.status) {
                                case 404:         
                                  alert(resp.text())
                                  break;
                                case 500:
                                  alert(resp.texg())
                                  break;
                               default:
                                 alert("product created")         
                              }                                
                            });
                        }}>Add favorite</button>
                    </li>);
                })}
            </ul>
      </div>

    </div>
  );
}

export default App;


