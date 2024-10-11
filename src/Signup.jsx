import { useState } from 'react';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [validationMessage, setValidationMessage] = useState('');

  const onSubmit = (data) => {
    console.log('Form Data:', data); // Log form data to the console

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('POST user signup Success:', data);
        setValidationMessage('Success!');
      })
      .catch((error) => {
        console.error('POST user signup Error:', error);
        setValidationMessage('Error occurred!');
      });
  };

  return (
    <>
      <Navbar />
      <h1 className='center'>Sign up</h1>

      <div className="flex" id="signup-container">
        <form className="form-flex" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            {...register('first-name', { required: 'First name is required' })}
            placeholder="First name"
          />
          {errors['first-name'] && <div>{errors['first-name'].message}</div>}

          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            {...register('last-name', { required: 'Last name is required' })}
            placeholder="Last name"
          />
          {errors['last-name'] && <div>{errors['last-name'].message}</div>}

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required', minLength: { value: 4, message: 'Username must be at least 4 characters' } })}
            placeholder="username"
          />
          {errors.username && <div>{errors.username.message}</div>}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            placeholder="password"
          />
          {errors.password && <div>{errors.password.message}</div>}

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            {...register('confirm-password', {
              required: 'Confirm password is required',
              validate: value => value === watch('password') || 'Passwords do not match'
            })}
            placeholder="Confirm password"
          />
          {errors['confirm-password'] && <div>{errors['confirm-password'].message}</div>}

          <button type="submit">Submit</button>
        </form>
      </div>
        {validationMessage && <div className='center red'>{validationMessage}</div>}
    </>
  );
}

export default Signup;