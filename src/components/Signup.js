import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://note-backend-4b48349aa5cf.herokuapp.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        
        if (!response.ok) {
            const error = await response.json();
            console.error('Server error:', error);
            // Handle error...
            return;
        }
        
        const json = await response.json();
        console.log(json);
        
        
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            navigate("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
    <form  onSubmit={handleSubmit}>
    <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="name" />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}

export default Signup
