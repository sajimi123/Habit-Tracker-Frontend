import React, { useEffect, useState ,useContext} from 'react'
import {
  getAllHabitsAPI,
  deleteHabitAPI,
  completeHabitAPI
} from '../services/apiServices'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function MyHabits() {
const { darkMode } = useContext(ThemeContext)
  const [habits, setHabits] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const habitsPerPage = 3
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getHabits = async () => {

    setLoading(true)
    setError('')

    try {

      const loggedUser = JSON.parse(localStorage.getItem('user'))

      if (!loggedUser) {
        return
      }

    const response = await getAllHabitsAPI(loggedUser.id)

setHabits(response.data)

    } catch (error) {

      console.log(error)
      setError('Failed to load habits')

    } finally {

      setLoading(false)

    }
  }

  const deleteHabit = async (id) => {

   await deleteHabitAPI(id)

    getHabits()
  }

  const completeHabit = async (habit) => {

    const today = new Date().toISOString().split('T')[0]

    if (habit.completionDates?.includes(today)) {
      alert('Already completed today')
      return
    }

    const updatedDates = [
      ...(habit.completionDates || []),
      today
    ]

   await completeHabitAPI(habit.id, updatedDates)

    getHabits()
  }

  useEffect(() => {
    getHabits()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, category])


  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || habit.category === category)
  )

  const indexOfLastHabit = currentPage * habitsPerPage
  const indexOfFirstHabit = indexOfLastHabit - habitsPerPage

  const currentHabits = filteredHabits.slice(
    indexOfFirstHabit,
    indexOfLastHabit
  )

  const totalPages = Math.ceil(
    filteredHabits.length / habitsPerPage
  )


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

            <h1 className="text-3xl font-bold text-[#4A3428]">
              My Habits
            </h1>

            <p className="text-[#8B6F5A] mt-1">
              Track your routines and stay consistent.
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

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Search & Filter */}

<div
  className={`rounded-3xl p-6 mb-8 border shadow-sm ${
    darkMode
      ? 'bg-[#30241F] border-[#4A3428]'
      : 'bg-[#FFFDF8] border-[#E2D3C3]'
  }`}
>
          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1">

              <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                Search
              </label>

              <input
                type="text"
                placeholder="Search your habits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] placeholder-[#A89584] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
              />

            </div>


            <div className="md:w-64">

              <label className="block text-sm font-semibold text-[#6B4F3A] mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCCDBD] bg-[#F9F5EF] text-[#4A3428] outline-none focus:border-[#8B6F5A] focus:ring-2 focus:ring-[#E8DCC8] transition"
              >

                <option value="">
                  All Categories
                </option>

                <option value="Health">
                  Health
                </option>

                <option value="Study">
                  Study
                </option>

                <option value="Fitness">
                  Fitness
                </option>

                <option value="Personal">
                  Personal
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* Section Heading */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">

          <div>

            <p className="text-sm uppercase tracking-widest text-[#9A806C]">
              Your Collection
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Habits
            </h2>

          </div>

          <Link to="/addhabit">

            <button className="px-5 py-3 rounded-xl bg-[#6B4F3A] text-white font-semibold hover:bg-[#4A3428] transition duration-300">
              + Add Habit
            </button>

          </Link>

        </div>


        {/* Content */}

        {
          loading ? (

            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E2D3C3] p-12 text-center">

              <p className="text-[#8B6F5A]">
                Loading habits...
              </p>

            </div>

          ) : error ? (

            <div className="bg-[#FFFDF8] rounded-3xl border border-[#D9B8A8] p-12 text-center">

              <p className="text-[#8B4F3A] font-medium">
                {error}
              </p>

            </div>

          ) : filteredHabits.length === 0 ? (

            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E2D3C3] p-12 text-center">

              <div className="text-5xl mb-4">
                🌱
              </div>

              <h3 className="text-xl font-bold">
                No habits found
              </h3>

              <p className="text-[#8B6F5A] mt-2">
                Try changing your search or category filter.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {
                currentHabits.map((item) => {

                  const completedToday =
                    item.completionDates?.includes(
                      new Date().toISOString().split('T')[0]
                    )

                  return (

                    <div
  key={item.id}
  className={`rounded-3xl border p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 ${
    darkMode
      ? 'bg-[#30241F] border-[#4A3428]'
      : 'bg-[#FFFDF8] border-[#E2D3C3]'
  }`}
>

                      {/* Card Header */}

                      <div className="flex items-start justify-between gap-4 mb-5">

                        <div>

                          <h3 className="text-2xl font-bold text-[#4A3428]">
                            {item.name}
                          </h3>

                          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#E8DCC8] text-[#6B4F3A] text-xs font-semibold">
                            {item.category}
                          </span>

                        </div>

                        {
                          completedToday && (
                            <span className="w-10 h-10 rounded-full bg-[#E8DCC8] text-[#6B4F3A] flex items-center justify-center font-bold">
                              ✓
                            </span>
                          )
                        }

                      </div>


                      {/* Details */}

                      <div className="space-y-3 text-sm mb-6">

                        <div className="flex justify-between border-b border-[#EEE5DA] pb-2">

                          <span className="text-[#9A806C]">
                            Frequency
                          </span>

                          <span className="font-semibold text-[#6B4F3A]">
                            {item.frequency}
                          </span>

                        </div>


                        <div className="flex justify-between border-b border-[#EEE5DA] pb-2">

                          <span className="text-[#9A806C]">
                            Target
                          </span>

                          <span className="font-semibold text-[#6B4F3A]">
                            {item.target || 'Not set'}
                          </span>

                        </div>


                        <div className="flex justify-between border-b border-[#EEE5DA] pb-2">

                          <span className="text-[#9A806C]">
                            Start Date
                          </span>

                          <span className="font-semibold text-[#6B4F3A]">
                            {item.startDate || 'Not set'}
                          </span>

                        </div>


                        {
                          item.notes && (
                            <div className="pt-1">

                              <span className="text-[#9A806C]">
                                Notes
                              </span>

                              <p className="mt-1 text-[#6B4F3A]">
                                {item.notes}
                              </p>

                            </div>
                          )
                        }

                      </div>


                      {/* Actions */}

                      <div className="flex flex-wrap gap-3">

                        <Link to={`/edithabit/${item.id}`}>

                          <button className="px-4 py-2 rounded-lg border border-[#8B6F5A] text-[#6B4F3A] font-medium hover:bg-[#E8DCC8] transition">
                            Edit
                          </button>

                        </Link>


                        <button
                          onClick={() => completeHabit(item)}
                          disabled={completedToday}
                          className={`px-4 py-2 rounded-lg font-medium transition ${
                            completedToday
                              ? 'bg-[#E8DCC8] text-[#8B6F5A] cursor-not-allowed'
                              : 'bg-[#6B4F3A] text-white hover:bg-[#4A3428]'
                          }`}
                        >
                          {completedToday
                            ? 'Completed ✓'
                            : 'Complete Today'
                          }
                        </button>


                        <button
                          onClick={() => deleteHabit(item.id)}
                          className="px-4 py-2 rounded-lg border border-[#C9A99A] text-[#8B4F3A] font-medium hover:bg-[#F1DDD4] transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )
                })
              }

            </div>

          )
        }


        {/* Pagination */}

        {
          filteredHabits.length > 0 && (

            <div className="flex items-center justify-center gap-5 mt-10">

              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-xl border border-[#8B6F5A] text-[#6B4F3A] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8DCC8] transition"
              >
                ← Previous
              </button>


              <span className="px-4 py-2 rounded-xl bg-[#6B4F3A] text-white font-medium">
                Page {currentPage} of {totalPages}
              </span>


              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-xl border border-[#8B6F5A] text-[#6B4F3A] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8DCC8] transition"
              >
                Next →
              </button>

            </div>

          )
        }

      </main>

    </div>
  )
}

export default MyHabits