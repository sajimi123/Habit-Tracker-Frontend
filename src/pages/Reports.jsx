import React, { useEffect, useState, useContext } from 'react'
import { getAllHabitsAPI } from '../services/apiServices'
import jsPDF from 'jspdf'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Reports() {

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

  const downloadPDF = () => {

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text('Habit Tracker Report', 20, 20)

    doc.setFontSize(12)

    doc.text(`Total Habits: ${totalHabits}`, 20, 35)

    doc.text(
      `Total Completions: ${totalCompletions}`,
      20,
      45
    )

    let y = 60

    habits.forEach((habit, index) => {

      doc.text(
        `${index + 1}. ${habit.name}`,
        20,
        y
      )

      doc.text(
        `Category: ${habit.category}`,
        30,
        y + 8
      )

      doc.text(
        `Frequency: ${habit.frequency}`,
        30,
        y + 16
      )

      doc.text(
        `Completed: ${habit.completionDates?.length || 0} days`,
        30,
        y + 24
      )

      y += 35

    })

    doc.save('habit-report.pdf')
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
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Reports
            </h1>

            <p
              className={`mt-1 ${
                darkMode
                  ? 'text-[#C9B8AA]'
                  : 'text-[#8B6F5A]'
              }`}
            >
              Review your habit progress and achievements.
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

          <h2
            className={`text-3xl font-bold mt-2 ${
              darkMode
                ? 'text-[#F5EFE6]'
                : 'text-[#4A3428]'
            }`}
          >
            Habit Report
          </h2>

          <p
            className={`mt-2 ${
              darkMode
                ? 'text-[#C9B8AA]'
                : 'text-[#8B6F5A]'
            }`}
          >
            View a summary of your habits and download your report.
          </p>

        </section>


        {/* Summary Cards */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Total Habits */}

          <div
            className={`rounded-3xl p-7 border shadow-sm ${
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

            <div className="flex items-end justify-between mt-4">

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
                🦾
              </span>

            </div>

          </div>


          {/* Total Completions */}

          <div
            className={`rounded-3xl p-7 border shadow-sm ${
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
              Total Completions
            </p>

            <div className="flex items-end justify-between mt-4">

              <p
                className={`text-5xl font-bold ${
                  darkMode
                    ? 'text-[#F5EFE6]'
                    : 'text-[#4A3428]'
                }`}
              >
                {totalCompletions}
              </p>

              <span className="text-3xl">
                ✓
              </span>

            </div>

          </div>

        </section>


        {/* Download PDF */}

        <section className="bg-[#4A3428] rounded-3xl p-7 md:p-8 text-[#FFFDF8] mb-8">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

            <div>

              <p className="text-[#DCC7B5] text-sm uppercase tracking-widest">
                Export
              </p>

              <h3 className="text-2xl font-semibold mt-1">
                Download Your Report
              </h3>

              <p className="text-[#E8DCC8] mt-2">
                Save your habit progress as a PDF file.
              </p>

            </div>

            <button
              onClick={downloadPDF}
              className="px-6 py-3 rounded-full bg-[#E8DCC8] text-[#4A3428] font-semibold hover:bg-[#FFFDF8] transition duration-300"
            >
              Download PDF
            </button>

          </div>

        </section>


        {/* Habit Details */}

        <section>

          <div className="mb-5">

            <p className="text-sm uppercase tracking-widest text-[#9A806C]">
              Habit Details
            </p>

            <h2
              className={`text-2xl font-bold mt-1 ${
                darkMode
                  ? 'text-[#F5EFE6]'
                  : 'text-[#4A3428]'
              }`}
            >
              Your Habits
            </h2>

          </div>


          {habits.length === 0 ? (

            <div
              className={`rounded-3xl border p-10 text-center ${
                darkMode
                  ? 'bg-[#30241F] border-[#4A3428]'
                  : 'bg-[#FFFDF8] border-[#E2D3C3]'
              }`}
            >

              <div className="text-4xl mb-4">
                🦾
              </div>

              <h3 className="text-xl font-bold">
                No habits available
              </h3>

              <p
                className={`mt-2 ${
                  darkMode
                    ? 'text-[#C9B8AA]'
                    : 'text-[#8B6F5A]'
                }`}
              >
                Create your first habit to generate a report.
              </p>

              <Link to="/addhabit">

                <button className="mt-5 px-6 py-3 rounded-full bg-[#6B4F3A] text-white font-semibold hover:bg-[#4A3428] transition duration-300">
                  Add Habit
                </button>

              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {habits.map((habit) => (

                <div
                  key={habit.id}
                  className={`rounded-3xl p-7 border shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 ${
                    darkMode
                      ? 'bg-[#30241F] border-[#4A3428]'
                      : 'bg-[#FFFDF8] border-[#E2D3C3]'
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3
                        className={`text-xl font-bold ${
                          darkMode
                            ? 'text-[#F5EFE6]'
                            : 'text-[#4A3428]'
                        }`}
                      >
                        {habit.name}
                      </h3>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? 'bg-[#3A2C25] text-[#D8C7B8]'
                            : 'bg-[#E8DCC8] text-[#6B4F3A]'
                        }`}
                      >
                        {habit.category}
                      </span>

                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        darkMode
                          ? 'bg-[#3A2C25] text-[#D8C7B8]'
                          : 'bg-[#E8DCC8] text-[#6B4F3A]'
                      }`}
                    >
                      ✓
                    </div>

                  </div>


                  <div className="mt-6 space-y-3">

                    <div
                      className={`flex justify-between border-b pb-2 ${
                        darkMode
                          ? 'border-[#4A3428]'
                          : 'border-[#EEE6DC]'
                      }`}
                    >

                      <span
                        className={
                          darkMode
                            ? 'text-[#C9B8AA]'
                            : 'text-[#9A806C]'
                        }
                      >
                        Frequency
                      </span>

                      <span
                        className={`font-medium ${
                          darkMode
                            ? 'text-[#D8C7B8]'
                            : 'text-[#6B4F3A]'
                        }`}
                      >
                        {habit.frequency}
                      </span>

                    </div>


                    <div
                      className={`flex justify-between border-b pb-2 ${
                        darkMode
                          ? 'border-[#4A3428]'
                          : 'border-[#EEE6DC]'
                      }`}
                    >

                      <span
                        className={
                          darkMode
                            ? 'text-[#C9B8AA]'
                            : 'text-[#9A806C]'
                        }
                      >
                        Completed
                      </span>

                      <span
                        className={`font-semibold ${
                          darkMode
                            ? 'text-[#F5EFE6]'
                            : 'text-[#4A3428]'
                        }`}
                      >
                        {habit.completionDates?.length || 0} days
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default Reports