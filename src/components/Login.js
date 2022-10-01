import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"

function Login() {
    const [credentials,setCredentials]=useState({email:"",password:""});
    const navigate=useNavigate();
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    const submit= async (e)=>{
        e.preventDefault();
        console.log("login");
        console.log(credentials);
        const response = await fetch(`http://localhost:5000/api/auth/loginuser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json= await response.json();
        console.log(json);
        debugger;
        if(json.success){
            
            navigate('/');
            localStorage.setItem('Auth-Token',json.authtoken);
        }
        else{
            alert('wrong credentials');
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} placeholder="Enter email" required/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credentials.password} onChange={onChange} required/>
                </div>
                <div className="form-group form-check my-2">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary my-1">Login</button>
            </form>
        </div>
    )
}

export default Login