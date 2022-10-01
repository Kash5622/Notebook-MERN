import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [credentials,setCredentials]=useState({name:"",email:"",password:""});
    const navigate=useNavigate();
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    const onSubmit= async (e)=>{
        e.preventDefault();
        const responce= await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const json=await responce.json();
        console.log(json);
        localStorage.setItem('Auth-Token',json.authtoken);
        if(json.success){
            navigate('/');
        }
        else{
            alert('User already exist');
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control my-2" id="name" name='name' onChange={onChange} value={credentials.name} placeholder="Enter your name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-2" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-2" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" required/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input my-2" id="exampleCheck1" required/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary my-1">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;