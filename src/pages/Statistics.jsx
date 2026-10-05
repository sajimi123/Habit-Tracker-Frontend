import React, { useEffect, useState, useContext } from 'react'
import { getAllHabitsAPI } from '../services/apiServices'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

function Statistics() {

  const { darkMode } = useContext(ThemeContext)

  const [habits, setHabits] = useState([])

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

  const totalHabits = habits.length

  const totalCompletions = habits.reduce(
    (total, habit) =>
      total + (habit.completionDates?.length || 0),
    0
  )

  const today = new Date().toISOString().split('T')[0]

  const completedToday = habits.filter((habit) =>
    habit.completionDates?.includes(today)
  ).length

  // Bar chart data
  const habitData = habits.map((habit) => ({
    name: habit.name,
    completions: habit.completionDates?.length || 0
  }))

  // Pie chart data
  const pendingToday = totalHabits - completedToday

  const pieData = [
    {
      name: 'Completed',
      value: completedToday
    },
    {
      name: 'Pending',
      value: pendingToday
    }
  ]

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
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Statistics
            </h1>

            <p
              className={`mt-1 ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#8B6F5A]'
              }`}
            >
              Understand your progress and consistency.
            </p>

          </div>

          <Link to="/">
            <button className="px-5 py-2.5 rounded-full border border-[#8B6F5A] text-[#6B4F3A] font-medium hover:bg-[#6B4F3A] hover:text-white transition duration-300">
              Dashboard
            </button>
          </Link>

        </div>

      </header>


      {/* Main */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Intro */}

        <section className="mb-8">

          <p className="text-sm uppercase tracking-widest text-[#9A806C]">
            Your Analytics
          </p>

          <h2
            className={`text-3xl font-bold mt-2 ${
              darkMode
                ? 'text-[#F5EFE6]'
                : 'text-[#4A3428]'
            }`}
          >
            Habit Statistics
          </h2>

          <p
            className={`mt-2 ${
              darkMode
                ? 'text-[#C9B8AA]'
                : 'text-[#8B6F5A]'
            }`}
          >
            Track your habit completion and daily progress.
          </p>

        </section>


        {/* Summary Cards */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Total Habits */}

          <div
            className={`rounded-3xl p-7 border shadow-sm hover:shadow-md transition ${
              darkMode
                ? 'bg-[#30241F] border-[#4A3428]'
                : 'bg-[#FFFDF8] border-[#E2D3C3]'
            }`}
          >

            <p
              className={`text-sm uppercase tracking-wider ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#9A806C]'
              }`}
            >
              Total Habits
            </p>

            <div className="flex items-end justify-between mt-5">

              <p
                className={`text-5xl font-bold ${
                  darkMode
                    ? 'text-[#F5EFE6]'
                    : 'text-[#4A3428]'
                }`}
              >
                {totalHabits}
              </p>

              <span className="text-3xl">
                🌱
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

            <p
              className={`text-sm uppercase tracking-wider ${
                darkMode
                  ? 'text-[#D8C7B8]'
                  : 'text-[#6B4F3A]'
              }`}
            >
              Completed Today
            </p>

            <div className="flex items-end justify-between mt-5">

              <p
                className={`text-5xl font-bold ${
                  darkMode
                    ? 'text-[#F5EFE6]'
                    : 'text-[#4A3428]'
                }`}
              >
                {completedToday}
              </p>

              <span className="text-3xl">
                ✓
              </span>

            </div>

          </div>


          {/* Total Completions */}

          <div className="bg-[#6B4F3A] rounded-3xl p-7 text-[#FFFDF8] shadow-sm hover:shadow-md transition">

            <p className="text-sm uppercase tracking-wider text-[#E8DCC8]">
              Total Completions
            </p>

            <div className="flex items-end justify-between mt-5">

              <p className="text-5xl font-bold">
                {totalCompletions}
              </p>

              <span className="text-3xl">
                ✨
              </span>

            </div>

          </div>

        </section>


        {/* Bar Chart */}

        <section
          className={`rounded-3xl border shadow-sm p-6 md:p-8 mb-8 ${
            darkMode
              ? 'bg-[#30241F] border-[#4A3428]'
              : 'bg-[#FFFDF8] border-[#E2D3C3]'
          }`}
        >

          <div className="mb-6">

            <p
              className={`text-sm uppercase tracking-widest ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#9A806C]'
              }`}
            >
              Habit Performance
            </p>

            <h2
              className={`text-2xl font-bold mt-1 ${
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Habit Completion Chart
            </h2>

            <p
              className={`mt-2 ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#8B6F5A]'
              }`}
            >
              Number of times each habit has been completed.
            </p>

          </div>


          <div className="w-full overflow-x-auto">

            <BarChart
              width={700}
              height={350}
              data={habitData}
              margin={{
                top: 10,
                right: 30,
                left: 10,
                bottom: 50
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? '#4A3428' : '#E2D3C3'}
              />

              <XAxis
                dataKey="name"
                angle={-20}
                textAnchor="end"
                interval={0}
                stroke={darkMode ? '#C9B8AA' : '#6B4F3A'}
              />

              <YAxis
                stroke={darkMode ? '#C9B8AA' : '#6B4F3A'}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#30241F' : '#FFFDF8',
                  border: `1px solid ${
                    darkMode ? '#4A3428' : '#E2D3C3'
                  }`,
                  color: darkMode ? '#F5EFE6' : '#4A3428'
                }}
              />

              <Bar
                dataKey="completions"
                fill="#6B4F3A"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </div>

        </section>


        {/* Pie Chart */}

        <section
          className={`rounded-3xl border shadow-sm p-6 md:p-8 ${
            darkMode
              ? 'bg-[#30241F] border-[#4A3428]'
              : 'bg-[#FFFDF8] border-[#E2D3C3]'
          }`}
        >

          <div className="mb-6">

            <p
              className={`text-sm uppercase tracking-widest ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#9A806C]'
              }`}
            >
              Today's Progress
            </p>

            <h2
              className={`text-2xl font-bold mt-1 ${
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Today's Habit Status
            </h2>

            <p
              className={`mt-2 ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#8B6F5A]'
              }`}
            >
              See how many habits are completed and pending today.
            </p>

          </div>


          <div className="flex justify-center overflow-x-auto">

            <PieChart width={450} height={350}>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >

                <Cell fill="#6B4F3A" />

                <Cell
                  fill={
                    darkMode
                      ? '#8B6F5A'
                      : '#D6C2AE'
                  }
                />

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#30241F' : '#FFFDF8',
                  border: `1px solid ${
                    darkMode ? '#4A3428' : '#E2D3C3'
                  }`,
                  color: darkMode ? '#F5EFE6' : '#4A3428'
                }}
              />

              <Legend
                wrapperStyle={{
                  color: darkMode ? '#C9B8AA' : '#6B4F3A'
                }}
              />

            </PieChart>

          </div>


          {/* Progress Summary */}

          <div className="flex justify-center gap-8 mt-4">

            <div className="text-center">

              <p
                className={`text-2xl font-bold ${
                  darkMode
                    ? 'text-[#F5EFE6]'
                    : 'text-[#4A3428]'
                }`}
              >
                {completedToday}
              </p>

              <p
                className={`text-sm ${
                  darkMode
                    ? 'text-[#C9B8AA]'
                    : 'text-[#8B6F5A]'
                }`}
              >
                Completed
              </p>

            </div>

            <div className="text-center">

              <p
                className={`text-2xl font-bold ${
                  darkMode
                    ? 'text-[#F5EFE6]'
                    : 'text-[#4A3428]'
                }`}
              >
                {pendingToday}
              </p>

              <p
                className={`text-sm ${
                  darkMode
                    ? 'text-[#C9B8AA]'
                    : 'text-[#8B6F5A]'
                }`}
              >
                Pending
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Statistics