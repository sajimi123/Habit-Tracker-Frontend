import React, { useEffect, useState ,useContext } from 'react'
import { getAllHabitsAPI } from '../services/apiServices'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Home() {
const { darkMode, toggleTheme } = useContext(ThemeContext)
  const [habits, setHabits] = useState([])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const getHabits = async () => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem('user'))

      if (!loggedUser) {
        return
      }

     const response = await getAllHabitsAPI(loggedUser.id)
setHabits(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHabits()
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const completedToday = habits.filter((habit) =>
    habit.completionDates?.includes(today)
  ).length

  const totalHabits = habits.length

  const completionRate = totalHabits === 0
    ? 0
    : Math.round((completedToday / totalHabits) * 100)
    const getCurrentStreak = () => {

  let streak = 0
  let currentDate = new Date()

  while (true) {

    const date = currentDate.toISOString().split('T')[0]

    const completed = habits.some((habit) =>
      habit.completionDates?.includes(date)
    )

    if (!completed) {
      break
    }

    streak++

    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

const currentStreak = getCurrentStreak()

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
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1
  className={`text-3xl font-bold tracking-tight ${
    darkMode ? 'text-[#F5EFE6]' : 'text-[#4A3428]'
  }`}
>
              Habit Tracker
            </h1>

           <p className={darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'}>
  Build better habits, one day at a time.
</p>
          </div>

         <div className="flex items-center gap-3">

  <button
    onClick={toggleTheme}
    className="px-4 py-2.5 rounded-full border border-[#8B6F5A] text-[#6B4F3A] hover:bg-[#6B4F3A] hover:text-white transition duration-300"
  >
    {darkMode ? '☀️ Light' : '🌙 Dark'}
  </button>

  <button
    onClick={handleLogout}
    className="px-5 py-2.5 rounded-full border border-[#8B6F5A] text-[#6B4F3A] font-medium hover:bg-[#6B4F3A] hover:text-white transition duration-300"
  >
    Logout
  </button>

</div>

        </div>
      </header>


      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome Section */}
        <section className="bg-[#4A3428] rounded-3xl p-8 md:p-10 text-[#FFFDF8] mb-10 shadow-lg">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div>
              <p className="text-[#DCC7B5] text-sm uppercase tracking-widest mb-2">
                Your Dashboard
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold">
                Welcome back 👋
              </h2>

              <p className="text-[#E8DCC8] mt-3 max-w-lg">
                Stay consistent, track your progress and make small changes
                every day.
              </p>
            </div>

            <Link to="/addhabit">
              <button className="px-6 py-3 rounded-full bg-[#E8DCC8] text-[#4A3428] font-semibold hover:bg-[#FFFDF8] transition duration-300">
                + Add New Habit
              </button>
            </Link>

          </div>

        </section>


        {/* Statistics */}
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* Total Habits */}
        <div
  className={`rounded-3xl p-7 border shadow-sm hover:shadow-md transition ${
    darkMode
      ? 'bg-[#30241F] border-[#4A3428]'
      : 'bg-[#FFFDF8] border-[#E2D3C3]'
  }`}
>

            <p className="text-sm uppercase tracking-wider text-[#9A806C]">
              Total Habits
            </p>

            <div className="flex items-end justify-between mt-5">

              <p className="text-5xl font-bold text-[#4A3428]">
                {totalHabits}
              </p>

              <span className="text-3xl">
                🦾
              </span>

            </div>

          </div>


          {/* Completed Today */}
          <div
  className={`rounded-3xl p-7 border shadow-sm hover:shadow-md transition ${
    darkMode
      ? 'bg-[#3A2C25] border-[#4A3428]'
      : 'bg-[#E8DCC8] border-[#D6C2AE]'
  }`}
>

            <p className="text-sm uppercase tracking-wider text-[#6B4F3A]">
              Completed Today
            </p>

            <div className="flex items-end justify-between mt-5">

              <p className="text-5xl font-bold text-[#4A3428]">
                {completedToday}
              </p>

              <span className="text-3xl">
                ✓
              </span>

            </div>

          </div>


          {/* Completion Rate */}
          <div className="bg-[#6B4F3A] rounded-3xl p-7 text-[#FFFDF8] shadow-sm hover:shadow-md transition">

            <p className="text-sm uppercase tracking-wider text-[#E8DCC8]">
              Completion Rate
            </p>

            <div className="flex items-end justify-between mt-5">

              <p className="text-5xl font-bold">
                {completionRate}%
              </p>

              <span className="text-3xl">
                ✨
              </span>

            </div>

          </div>
        <div
  className={`rounded-3xl p-7 border shadow-sm hover:shadow-md transition ${
    darkMode
      ? 'bg-[#30241F] border-[#4A3428]'
      : 'bg-[#FFFDF8] border-[#E2D3C3]'
  }`}
>
  <p className="text-sm uppercase tracking-wider text-[#9A806C]">
    Current Streak
  </p>

  <div className="flex items-end justify-between mt-5">
    <p className="text-5xl font-bold text-[#4A3428]">
      {currentStreak}
    </p>

    <span className="text-3xl">
      🔥
    </span>
  </div>

  <p className="text-sm text-[#8B6F5A] mt-2">
    consecutive days
  </p>
</div>

        </section>


        {/* Quick Navigation */}
        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <p className="text-sm uppercase tracking-widest text-[#9A806C]">
                Quick Access
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Manage your habits
              </h2>
            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Add Habit */}
  <Link
    to="/addhabit"
    className={`p-6 rounded-2xl border transition hover:scale-[1.01] ${
      darkMode
        ? 'bg-[#30241F] border-[#4A3428] text-[#FFFDF8]'
        : 'bg-[#FFFDF8] border-[#E2D3C3] text-[#4A3428]'
    }`}
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
        darkMode ? 'bg-[#4A3428]' : 'bg-[#E8DCC8]'
      }`}
    >
      +
    </div>

    <h3 className="text-xl font-bold mt-5">
      Create a Habit
    </h3>

    <p
      className={`mt-2 ${
        darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
      }`}
    >
      Add a new habit and start tracking your progress.
    </p>
  </Link>


  {/* My Habits */}
  <Link
    to="/myhabits"
    className={`p-6 rounded-2xl border transition hover:scale-[1.01] ${
      darkMode
        ? 'bg-[#30241F] border-[#4A3428] text-[#FFFDF8]'
        : 'bg-[#FFFDF8] border-[#E2D3C3] text-[#4A3428]'
    }`}
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
        darkMode ? 'bg-[#6B4F3A]' : 'bg-[#E8DCC8]'
      }`}
    >
      ✓
    </div>

    <h3 className="text-xl font-bold mt-5">
      My Habits
    </h3>

    <p
      className={`mt-2 ${
        darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
      }`}
    >
      View, complete, edit and manage all your habits.
    </p>
  </Link>

  {/* Calendar */}
  <Link
    to='/calender'
    className={`p-6 rounded-2xl border ${
      darkMode
        ? 'bg-[#30241F] border-[#4A3428] text-[#FFFDF8]'
        : 'bg-[#FFFDF8] border-[#E2D3C3] text-[#4A3428]'
    }`}
  >
    <div className="text-3xl mb-4">📅</div>
    <h3 className="text-xl font-bold">Calender</h3>
    <p className="mt-2 opacity-70">
      Track your completed habits by date.
    </p>
  </Link>

  {/* Statistics */}
  <Link
    to="/statistics"
    className={`p-6 rounded-2xl border ${
      darkMode
        ? 'bg-[#30241F] border-[#4A3428] text-[#FFFDF8]'
        : 'bg-[#FFFDF8] border-[#E2D3C3] text-[#4A3428]'
    }`}
  >
    <div className="text-3xl mb-4">📊</div>
    <h3 className="text-xl font-bold">Statistics</h3>
    <p className="mt-2 opacity-70">
      View your habit progress and charts.
    </p>
  </Link>

  {/* Reports */}
  <Link
    to="/reports"
    className={`p-6 rounded-2xl border ${
      darkMode
        ? 'bg-[#30241F] border-[#4A3428] text-[#FFFDF8]'
        : 'bg-[#FFFDF8] border-[#E2D3C3] text-[#4A3428]'
    }`}
  >
    <div className="text-3xl mb-4">📄</div>
    <h3 className="text-xl font-bold">Reports</h3>
    <p className="mt-2 opacity-70">
      Generate and download your habit report.
    </p>
  </Link>

</div>

        </section>

      </main>

    </div>
  )
}

export default Home