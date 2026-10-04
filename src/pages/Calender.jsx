import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Calendar() {

  const { darkMode } = useContext(ThemeContext)

  const [habits, setHabits] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  const getHabits = async () => {
    try {

      const loggedUser = JSON.parse(localStorage.getItem('user'))

      if (!loggedUser) {
        return
      }

      const response = await axios.get(
        `https://habit-tracker-backend-lt76.onrender.com/habit?userId=${loggedUser.id}`
      )

      setHabits(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHabits()
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthName = currentDate.toLocaleString('default', {
    month: 'long'
  })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const allCompletedDates = habits.flatMap(
    (habit) => habit.completionDates || []
  )

  const isCompleted = (day) => {

    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    return allCompletedDates.includes(date)
  }

  const getCompletedHabits = (day) => {

    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    return habits.filter((habit) =>
      habit.completionDates?.includes(date)
    )
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const today = new Date()

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
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

        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1
              className={`text-3xl font-bold tracking-tight ${
                darkMode ? 'text-[#F5EFE6]' : 'text-[#4A3428]'
              }`}
            >
              Habit Calendar
            </h1>

            <p
              className={`mt-1 ${
                darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
              }`}
            >
              Track your consistency day by day.
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
            Your Progress
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Habit Calendar
          </h2>

          <p
            className={`mt-2 ${
              darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
            }`}
          >
            See the days when you completed your habits.
          </p>

        </section>


        {/* Calendar Card */}

        <section
          className={`rounded-3xl border shadow-sm p-6 md:p-8 ${
            darkMode
              ? 'bg-[#30241F] border-[#4A3428]'
              : 'bg-[#FFFDF8] border-[#E2D3C3]'
          }`}
        >

          {/* Month Navigation */}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-8">

            <button
              onClick={previousMonth}
              className="px-5 py-2.5 rounded-full border border-[#D6C2AE] text-[#6B4F3A] font-medium hover:bg-[#E8DCC8] transition duration-300"
            >
              ← Previous
            </button>

            <h2
              className={`text-2xl md:text-3xl font-bold ${
                darkMode ? 'text-[#F5EFE6]' : 'text-[#4A3428]'
              }`}
            >
              {monthName} {year}
            </h2>

            <button
              onClick={nextMonth}
              className="px-5 py-2.5 rounded-full border border-[#D6C2AE] text-[#6B4F3A] font-medium hover:bg-[#E8DCC8] transition duration-300"
            >
              Next →
            </button>

          </div>


          {/* Week Days */}

          <div className="grid grid-cols-7 gap-2 mb-2">

            {[
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat'
            ].map((day) => (

              <div
                key={day}
                className={`text-center py-3 text-sm font-semibold ${
                  darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
                }`}
              >
                {day}
              </div>

            ))}

          </div>


          {/* Calendar Days */}

          <div className="grid grid-cols-7 gap-2">

            {/* Empty spaces */}

            {Array.from({ length: firstDay }).map((_, index) => (

              <div
                key={`empty-${index}`}
                className="min-h-[90px] md:min-h-[110px]"
              ></div>

            ))}


            {/* Days */}

            {Array.from({ length: daysInMonth }).map((_, index) => {

              const day = index + 1

              const completed = isCompleted(day)

              return (

                <div
                  key={day}
                  className={`
                    min-h-[90px] md:min-h-[110px]
                    rounded-2xl border p-2 md:p-3
                    transition duration-300
                    ${completed
                      ? darkMode
                        ? 'bg-[#3A2C25] border-[#6B4F3A]'
                        : 'bg-[#E8DCC8] border-[#C9B39E]'
                      : darkMode
                        ? 'bg-[#30241F] border-[#4A3428]'
                        : 'bg-[#F9F5EF] border-[#E8E0D6]'
                    }
                    ${isToday(day)
                      ? 'ring-2 ring-[#6B4F3A]'
                      : ''
                    }
                  `}
                >

                  {/* Date */}

                  <div className="flex items-center justify-between">

                    <span
                      className={`
                        w-7 h-7 flex items-center justify-center
                        rounded-full text-sm font-semibold
                        ${isToday(day)
                          ? 'bg-[#6B4F3A] text-white'
                          : darkMode
                            ? 'text-[#D8C7B8]'
                            : 'text-[#6B4F3A]'
                        }
                      `}
                    >
                      {day}
                    </span>

                    {completed && (
                      <span
                        className={`font-bold ${
                          darkMode
                            ? 'text-[#D8C7B8]'
                            : 'text-[#6B4F3A]'
                        }`}
                      >
                        ✓
                      </span>
                    )}

                  </div>


                  {/* Completed Habits */}

                  <div className="mt-3 space-y-1">

                    {getCompletedHabits(day).map((habit) => (

                      <div
                        key={habit.id}
                        className={`text-xs md:text-sm rounded-lg px-2 py-1 truncate border ${
                          darkMode
                            ? 'bg-[#3A2C25] text-[#E8DCC8] border-[#6B4F3A]'
                            : 'bg-[#FFFDF8] text-[#6B4F3A] border-[#DCCDBD]'
                        }`}
                        title={habit.name}
                      >
                        {habit.name}
                      </div>

                    ))}

                  </div>

                </div>

              )

            })}

          </div>


          {/* Legend */}

          <div
            className={`flex flex-wrap items-center gap-6 mt-8 pt-6 border-t ${
              darkMode ? 'border-[#4A3428]' : 'border-[#E8E0D6]'
            }`}
          >

            <div className="flex items-center gap-2">

              <div
                className={`w-4 h-4 rounded ${
                  darkMode
                    ? 'bg-[#3A2C25] border border-[#6B4F3A]'
                    : 'bg-[#E8DCC8] border border-[#C9B39E]'
                }`}
              ></div>

              <span
                className={`text-sm ${
                  darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
                }`}
              >
                Completed
              </span>

            </div>


            <div className="flex items-center gap-2">

              <div
                className={`w-4 h-4 rounded ${
                  darkMode
                    ? 'bg-[#30241F] border border-[#4A3428]'
                    : 'bg-[#F9F5EF] border border-[#E8E0D6]'
                }`}
              ></div>

              <span
                className={`text-sm ${
                  darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
                }`}
              >
                Not Completed
              </span>

            </div>


            <div className="flex items-center gap-2">

              <div className="w-4 h-4 rounded-full bg-[#6B4F3A]"></div>

              <span
                className={`text-sm ${
                  darkMode ? 'text-[#C9B8AA]' : 'text-[#8B6F5A]'
                }`}
              >
                Today
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Calendar