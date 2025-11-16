import {useState} from 'react';
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
                        <form onSubmit={handleSubmit}></form>
                  </div>
            </div>
      );
}