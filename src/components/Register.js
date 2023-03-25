import React, { useState } from 'react';
import axios from 'axios';
import "./reg.css"
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { email, password, confirmPassword, agreedToTerms } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = () =>
    setFormData({ ...formData, agreedToTerms: !agreedToTerms });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    } else if (!agreedToTerms) {
      console.log('Please agree to the terms and conditions');
      return;
    } else {
      try {
        const res = await axios.post('https://note-taker-backend-dhasneem.onrender.com/register', {
          email,
          password,
        });
        console.log(res.data);
        Navigate("/home");
      } catch (err) {
        console.log(err.response.data.errors[0].msg);
        alert(err.response.data.errors[0].msg)
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} id="reg-form">
      <input
        id='req-email'
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleChange}
        required
      />
      <input
        id='reg-password'
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={handleChange}
        required
      />
      <input
        id='reg-con-pass'
        type='password'
        placeholder='Confirm Password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={handleChange}
        required
      />
      <label id='conditions-label'>
        <input
          type='checkbox'
          name='agreedToTerms'
          checked={agreedToTerms}
          onChange={handleCheckboxChange}
          required
        />
        I agree to the terms and conditions
      </label>
      {errorMessage && <p id='error-msg'>{errorMessage}</p>}
      <button type='submit' id='reg-btn'>Register</button>
      <h3> If already exists <Link to="/"> Login Here</Link></h3>
    </form>
  );
};

export default Register;
