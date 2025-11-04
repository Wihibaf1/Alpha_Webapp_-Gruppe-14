"use client"

import { useState, useEffect } from "react"

export function Recipes() {
  const [search, setSearch] = useState("chicken")
  const [meals, setMeals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMeals = async (term: string) => {
  try {
    setLoading(true)
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    )
    const data: { meals: any[] | null } = await res.json()
    setMeals(data.meals || [])
  } catch (err) {
    console.error("Error fetching meals:", err)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    fetchMeals(search)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchMeals(search)
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-6">
        🍽️ MatBuddy Oppskrifter
      </h1>

      
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-2"
      >
        <input
          type="text"
          placeholder="Søk etter en oppskrift..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-80 focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-5 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Søk
        </button>
      </form>

      {loading ? (
        <p className="text-center text-lg">Laster oppskrifter...</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          Ingen oppskrifter funnet 😕
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 text-center"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {meal.strArea} • {meal.strCategory}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
