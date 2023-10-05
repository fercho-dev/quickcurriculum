'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link.js';
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../lib/firebase-config";
import { getAuth } from '../../lib/firebase-utils'

const SignUpForm = () => {
  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }
      getAuth(undefined, undefined, router, true, true, userCred)
    });
  }, []);

  function loginWithGoogle() {
    signInWithRedirect(auth, provider);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateEmail = (email) => {
    // Check for a valid email using a simple regex
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 6 characters long
    return password.length >= 6;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear previous errors
    setErrors({});

    let formErrors = {};
    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(formErrors).length === 0) {
      // Implement your sign-up logic here
      getAuth(email.trim(), password, router, true, false, undefined)
    } else {
      // There are validation errors, update the state
      setErrors(formErrors);
    }
  };

  return (
    <div className='w-screen h-screen bg-purple-50 flex flex-col justify-center items-center md:justify-start'>
      <div className='md:mt-14'>
          <p className='text-3xl text-purple-600'>Crea tu cuenta</p>
        </div>
      <form className='border-2 border-purple-200 rounded p-2 m-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <label className='text-slate-600 mr-2' htmlFor="email">Email:</label>
          <input
            className='border-2 border-slate-200 rounded p-2 w-full'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label className='text-slate-600 mr-2' htmlFor="password">Password:</label>
          <input
            className='border-2 border-slate-200 rounded p-2 w-full'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button
          className='w-full py-3 px-4 bg-purple-600 shadow-md shadow-orange-300 text-white font-bold rounded hover:bg-purple-800 mt-5'
          type="submit">
            Crear Cuenta
        </button>
      </form>

      <div>
        <p className='text-slate-600'>¿Ya tienes cuenta? <Link className='cursor-pointer underline' href="/login">Inicia Sesión</Link></p>
      </div>

      <button className='my-6 underline' onClick={() => loginWithGoogle()}>Registrarse con Google</button>
    </div>
  );
};

export default SignUpForm;
