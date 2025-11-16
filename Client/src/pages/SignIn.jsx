import React from "react";
import { Link } from "react-router-dom";
export default function SignIn() {

  const handleSubmit = async (e) => {
    e.preventDefault();
      axios.post(process.env.SERVER_URL, {email, password})
        .then(response => {
          console.log('User signed in successfully:', response.data);
          navigate('/signin')
        })
        .catch(error => {
          console.error('There was an error signing in the user!', error);
        });
    }

  return(
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className='bg-white p-3 rounded w-25'>
      <h2>Sign In</h2>
      <form action = { handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input type="email" placeholder='Enter your email' autoComplete='off' name='email' className='form-control rounded-0'  onChange={(e) => setEmail(e.target.value)}  />
        </div>
        <div className='mb-3'>
          <label htmlFor="name">
            <strong>Password</strong>
          </label>
          <input type="password" placeholder='Enter your password' name='password' className='form-control rounded-0'  onChange={(e) => setPassword(e.target.value)}  />
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'>Sign In</button>
      </form>
      <p>Don't have an account?<Link to='/'>SignUp </Link></p>
    </div>                    
    </div>
  )
}