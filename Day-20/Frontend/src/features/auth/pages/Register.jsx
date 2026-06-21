import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'


const Login = () => {

    const handlSubmit = (e)=>{
        e.preventDefault()
    }
  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handlSubmit}>
            <input type="text" name='username' id='username' placeholder='Enter username' />
            <input type="email" name='email' id='email' placeholder='Enter email address' />
            <input type="password" name='password' id='password' placeholder='Enter password' />
            <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account ? <Link to={'/login'}>Login to account</Link></p>

      </div>
    </main>
  )
}

export default Login
