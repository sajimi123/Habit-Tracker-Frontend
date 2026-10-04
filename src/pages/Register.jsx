import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Register() {

  const navigate = useNavigate()

  const { darkMode } = useContext(ThemeContext)

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!user.name || !user.email || !user.password) {
      alert('Please fill all fields')
      return
    }

    try {

      const response = await axios.get(
        `https://habit-tracker-backend-lt76.onrender.com//users?email=${user.email}`
      )

      if (response.data.length > 0) {
        alert('Email already registered')
        return
      }

      await axios.post(
        'https://habit-tracker-backend-lt76.onrender.com//users',
        user
      )

      alert('Registration successful')

      navigate('/login')

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div
      className={`min-h-screen flex items-center justify-center px-6 py-10 ${
        darkMode
          ? 'bg-[#241B17]'
          : 'bg-[#F5EFE6]'
      }`}
    >

      <div className="w-full max-w-md">

        {/* Logo / Heading */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4A3428] text-[#FFFDF8] text-2xl mb-5 shadow-md">
            ✓
          </div>

          <h1
            className={`text-3xl font-bold ${
              darkMode
                ? 'text-[#F5EFE6]'
                : 'text-[#4A3428]'
            }`}
          >
            Habit Tracker
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? 'text-[#C9B8AA]'
                : 'text-[#8B6F5A]'
            }`}
          >
            Start building better habits today.
          </p>

        </div>


        {/* Register Card */}

        <div
          className={`rounded-3xl border shadow-lg p-8 md:p-10 ${
            darkMode
              ? 'bg-[#30241F] border-[#4A3428]'
              : 'bg-[#FFFDF8] border-[#E2D3C3]'
          }`}
        >

          <div className="mb-7">

            <p
              className={`text-sm uppercase tracking-widest ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#9A806C]'
              }`}
            >
              Get Started
            </p>

            <h2
              className={`text-2xl font-bold mt-1 ${
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Create your account
            </h2>

          </div>


          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}

            <div>

              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode
                    ? 'text-[#D8C7B8]'
                    : 'text-[#6B4F3A]'
                }`}
              >
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                  darkMode
                    ? 'border-[#4A3428] bg-[#241B17] text-[#F5EFE6] placeholder-[#8B6F5A] focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#4A3428]'
                    : 'border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89280] focus:border-[#6B4F3A] focus:ring-2 focus:ring-[#E8DCC8]'
                }`}
              />

            </div>


            {/* Email */}

            <div>

              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode
                    ? 'text-[#D8C7B8]'
                    : 'text-[#6B4F3A]'
                }`}
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                  darkMode
                    ? 'border-[#4A3428] bg-[#241B17] text-[#F5EFE6] placeholder-[#8B6F5A] focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#4A3428]'
                    : 'border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89280] focus:border-[#6B4F3A] focus:ring-2 focus:ring-[#E8DCC8]'
                }`}
              />

            </div>


            {/* Password */}

            <div>

              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode
                    ? 'text-[#D8C7B8]'
                    : 'text-[#6B4F3A]'
                }`}
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={user.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                  darkMode
                    ? 'border-[#4A3428] bg-[#241B17] text-[#F5EFE6] placeholder-[#8B6F5A] focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#4A3428]'
                    : 'border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89280] focus:border-[#6B4F3A] focus:ring-2 focus:ring-[#E8DCC8]'
                }`}
              />

            </div>


            {/* Register Button */}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#4A3428] text-[#FFFDF8] font-semibold hover:bg-[#6B4F3A] transition duration-300 shadow-sm"
            >
              Create Account
            </button>

          </form>


          {/* Login */}

          <div
            className={`text-center mt-7 pt-6 border-t ${
              darkMode
                ? 'border-[#4A3428]'
                : 'border-[#E8E0D6]'
            }`}
          >

            <p
              className={
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#8B6F5A]'
              }
            >

              Already have an account?

              <Link
                to="/login"
                className="ml-1 font-semibold text-[#8B6F5A] hover:text-[#F5EFE6] transition"
              >
                Login
              </Link>

            </p>

          </div>

        </div>


        {/* Footer */}

        <p
          className={`text-center text-sm mt-6 ${
            darkMode
              ? 'text-[#9F8B7C]'
              : 'text-[#9A806C]'
          }`}
        >
          Small steps. Better habits. 🌱
        </p>

      </div>

    </div>
  )
}

export default Register