import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './../Style/signUp.css'

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    useEffect(()=>{
    const auth = localStorage.getItem('user')
        if(auth){
            navigate("/")
        }
    } , [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { name, email, password }
        try {
            let res = await axios.post('http://localhost:3000/users', user)
            console.log(res.data) 
            setName('')
            setEmail('')
            setPassword('')
            localStorage.setItem('user' , JSON.stringify(res))
            alert('User created successfully !!')
            navigate('/') 
        } catch (err) {
            console.log(err)
        }
    }

    const handleSignIn = () => {
        navigate('/signin')
    }

    return (
        <div className='signup-wrapper'>
            <div className='signup-form'>
                <div className='sign-up-heading'>
                <h2>Register</h2> <br />
                <p>Enter your information below to create an account</p> 

                </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        placeholder="Enter your name..." 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </label>
                
                <label>
                    Email:
                    <input 
                        type="email" 
                        placeholder="Enter your email..." 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </label>
            
                <label>
                    Password:
                    <input 
                        type="password" 
                        placeholder="Enter your password..." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
            <br />
                <button type="submit">Create an account</button> <br />
                <p>Already have an account? <span onClick={handleSignIn}>Login</span></p>
            </form>
            </div>
        </div>
    )
}

export default SignUp
