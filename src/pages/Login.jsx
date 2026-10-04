import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Login() {

  const navigate = useNavigate()

  const { darkMode } = useContext(ThemeContext)

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      alert('Please fill all fields')
      return
    }

    try {

      const response = await axios.get(
        `https://habit-tracker-backend-lt76.onrender.com/users?email=${loginData.email}&password=${loginData.password}`
      )

      if (response.data.length === 0) {
        alert('Invalid email or password')
        return
      }

      const loggedUser = response.data[0]

      localStorage.setItem(
        'user',
        JSON.stringify(loggedUser)
      )

      alert('Login successful')

      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
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
            Build better habits, one day at a time.
          </p>

        </div>


        {/* Login Card */}

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
              Welcome Back
            </p>

            <h2
              className={`text-2xl font-bold mt-1 ${
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Login to your account
            </h2>

          </div>


          <form onSubmit={handleLogin} className="space-y-5">

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
                value={loginData.email}
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
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                  darkMode
                    ? 'border-[#4A3428] bg-[#241B17] text-[#F5EFE6] placeholder-[#8B6F5A] focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#4A3428]'
                    : 'border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89280] focus:border-[#6B4F3A] focus:ring-2 focus:ring-[#E8DCC8]'
                }`}
              />

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#4A3428] text-[#FFFDF8] font-semibold hover:bg-[#6B4F3A] transition duration-300 shadow-sm"
            >
              Login
            </button>

          </form>


          {/* Register */}

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

              Don't have an account?

              <Link
                to="/register"
                className="ml-1 font-semibold text-[#8B6F5A] hover:text-[#F5EFE6] transition"
              >
                Register
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
          Stay consistent. Keep growing. 🌱
        </p>

      </div>

    </div>
  )
}

export default Login