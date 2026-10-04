import React, { useState,useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function AddHabit() {

  const { darkMode } = useContext(ThemeContext)
  const [habit, setHabit] = useState({
    name: '',
    category: '',
    frequency: '',
    target: '',
    startDate: '',
    notes: '',
    completionDates: []
  })

  const handleChange = (e) => {
    setHabit({
      ...habit,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loggedUser = JSON.parse(localStorage.getItem('user'))

    if (!loggedUser) {
      alert('Please login first')
      return
    }

    if (
      !habit.name.trim() ||
      !habit.category ||
      !habit.frequency
    ) {
      alert('Please fill the required fields')
      return
    }

    if (habit.target && Number(habit.target) <= 0) {
      alert('Target must be greater than 0')
      return
    }

    const today = new Date().toISOString().split('T')[0]

    if (habit.startDate && habit.startDate < today) {
      alert('Start date cannot be in the past')
      return
    }

    const newHabit = {
      ...habit,
      userId: loggedUser.id,
      completionDates: []
    }

    await axios.post(
      'https://habit-tracker-backend-lt76.onrender.com//habit',
      newHabit
    )

    alert('Habit added successfully')

    setHabit({
      name: '',
      category: '',
      frequency: '',
      target: '',
      startDate: '',
      notes: '',
      completionDates: []
    })
  }

  return (
    <div
  className={`min-h-screen ${
    darkMode
      ? 'bg-[#241B17] text-[#F5EFE6]'
      : 'bg-[#F5EFE6] text-[#4A3428]'
  }`}
>

      {/* Header */}
    <header
  className={`border-b ${
    darkMode
      ? 'bg-[#30241F] border-[#4A3428]'
      : 'bg-[#FFFDF8] border-[#E2D3C3]'
  }`}
>
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#4A3428]">
              Add Habit
            </h1>

            <p className="text-[#8B6F5A] mt-1">
              Create a new habit and start your journey.
            </p>
          </div>

          <Link to="/">
            <button className="px-5 py-2.5 rounded-full border border-[#8B6F5A] text-[#6B4F3A] font-medium hover:bg-[#6B4F3A] hover:text-white transition duration-300">
              ← Dashboard
            </button>
          </Link>

        </div>
      </header>


      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* Intro */}
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-[#9A806C]">
            New Habit
          </p>

          <h2 className="text-2xl font-bold mt-2">
            What habit do you want to build?
          </h2>

          <p className="text-[#8B6F5A] mt-2">
            Set your goal, choose a routine and begin tracking your progress.
          </p>
        </div>


        {/* Form Card */}
       <div
  className={`rounded-3xl border shadow-sm p-6 md:p-10 ${
    darkMode
      ? 'bg-[#30241F] border-[#4A3428]'
      : 'bg-[#FFFDF8] border-[#E2D3C3]'
  }`}
>

          <form onSubmit={handleSubmit}>

            {/* Habit Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                Habit Name * 
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Read for 30 minutes"
                value={habit.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89584] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
              />
            </div>


            {/* Category + Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                  Category *
                </label>

                <select
                  name="category"
                  value={habit.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
                >
                  <option value="">Select Category</option>
                  <option value="Health">Health</option>
                  <option value="Study">Study</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>


              <div>
                <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                  Frequency *
                </label>

                <select
                  name="frequency"
                  value={habit.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

            </div>


            {/* Target + Start Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                  Target
                </label>

                <input
                  type="number"
                  name="target"
                  placeholder="Example: 30"
                  value={habit.target}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89584] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
                />
              </div>


              <div>
                <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={habit.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
                />
              </div>

            </div>


            {/* Notes */}
            <div className="mb-8">

              <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                Notes
              </label>

              <textarea
                name="notes"
                rows="5"
                placeholder="Add any notes about your habit..."
                value={habit.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89584] outline-none resize-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
              />

            </div>


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-[#6B4F3A] text-white font-semibold hover:bg-[#4A3428] transition duration-300 shadow-sm"
              >
                + Add Habit
              </button>

              <Link to="/myhabits" className="flex-1">
                <button
                  type="button"
                  className="w-full py-3.5 rounded-xl border border-[#8B6F5A] text-[#6B4F3A] font-semibold hover:bg-[#E8DCC8] transition duration-300"
                >
                  View My Habits
                </button>
              </Link>

            </div>

          </form>

        </div>

      </main>

    </div>
  )
}

export default AddHabit