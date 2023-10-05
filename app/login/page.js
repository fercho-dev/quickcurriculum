'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link.js';
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from '../../lib/firebase-config'
import { getAuth } from '../../lib/firebase-utils'

const LoginForm = () => {
  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }
      getAuth(undefined, undefined, router, false, true, userCred)
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
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email.trim()); // trim email before validation
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({});

    let formErrors = {};
    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length === 0) {
      // Implement your login logic here
      getAuth(email.trim(), password, router, false, false, undefined)
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='w-screen h-screen bg-purple-50 flex flex-col justify-center items-center md:justify-start'>
      <div className='md:mt-14'>
        <p className='text-3xl text-purple-600'>Inicia Sesión</p>
      </div>

      <form className='border-2 border-purple-200 rounded p-2 m-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <label className='text-slate-600 mr-2' htmlFor="email">Email:</label>
          <input
            className='border-2 border-slate-200 rounded p-2 w-full'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())} // trim leading spaces in real time
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

        <button className='w-full py-3 px-4 bg-purple-600 shadow-md shadow-orange-300 text-white font-bold rounded hover:bg-purple-800 mt-5'
          type="submit">
            Iniciar Sesión
        </button>
      </form>

      <div>
        <p className='text-slate-600'>¿Aún no tienes cuenta? <Link className='cursor-pointer underline' href="/signup">Registrate</Link></p>
      </div>

      <button className='my-6 underline' onClick={() => loginWithGoogle()}>Iniciar sesión con Google</button>
    </div>
  );
};

export default LoginForm;
