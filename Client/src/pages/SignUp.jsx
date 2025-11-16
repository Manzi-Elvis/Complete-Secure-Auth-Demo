import {useState} from 'react';
import SignIn from './SignIn';
import {Link} from 'react-router-dom';

export default function SignUp() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      
      const handleSubmit = async (e) => {
            e.preventDefault();
            axios.post('', {name, email, password})
                  .then(response => {
                        console.log('User registered successfully:', response.data);
                  })
                  .catch(error => {
                        console.error('There was an error registering the user!', error);
                  });
            }
      return (
            <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
                  <div className='bg-white p-3 rounded w-25'>
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                              <div className='mb-3'>
                                    <label htmlFor="name">
                                          <strong>Name</strong>
                                    </label>
                                    <input type="text" placeholder='Enter your name' name='name' className='form-control rounded-0' />
                              </div>
                              <div className='mb-3'>
                                    <label htmlFor="email">
                                          <strong>Email</strong>
                                    </label>
                                    <input type="email" placeholder='Enter your email' autoComplete='off' name='email' className='form-control rounded-0' />
                              </div>
                              <div className='mb-3'>
                                    <label htmlFor="name">
                                          <strong>Password</strong>
                                    </label>
                                    <input type="password" placeholder='Enter your password' name='password' className='form-control rounded-0' />
                              </div>
                              <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
                        </form>
                        <p>Already have an account?<Link to={SignIn}>Login</Link></p>

                  </div>
            </div>
      );
}