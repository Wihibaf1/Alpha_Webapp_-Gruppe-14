"use client"

import { useState, useEffect } from "react"

export function Recipes() {
  const [search, setSearch] = useState("chicken")
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)

  interface Meal {
    idMeal: string
    strMeal: string
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string | null
    strYoutube: string
    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strIngredient8: string
    strIngredient9: string
    strIngredient10: string
    strIngredient11: string
    strIngredient12: string
    strIngredient13: string
    strIngredient14: string
    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    strMeasure11: string
    strMeasure12: string
    strMeasure13: string
    strMeasure14: string

    ingredients: { ingredient: string; measure: string }[]
  }

  const fetchMeals = async (term: string) => {
    try {
      setLoading(true)
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`
      )
      const data: { meals: Meal[] | null } = await res.json()

      if (!data.meals) {
        setMeals([])
        return
      }

      // Mapper hvert måltid for å legge til "ingredients"-feltet
      const mappedMeals: Meal[] = data.meals.map((meal) => {
        const ingredients: { ingredient: string; measure: string }[] = []

        for (let i = 1; i <= 14; i++) {
          const ing = meal[`strIngredient${i}` as keyof Meal] as unknown as string
          const meas = meal[`strMeasure${i}` as keyof Meal] as unknown as string

          if (ing && ing.trim() !== "") {
            ingredients.push({
              ingredient: ing,
              measure: (meas ?? "").trim(),
            })
          }
        }

        return {
          ...meal,
          ingredients,
        }
      })

      setMeals(mappedMeals)
    } catch (err) {
      console.error("Error fetching meals:", err)
      setMeals([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    
    e.preventDefault()
    fetchMeals(search)
  }

  // Funksjon for å lagre et måltid til databasen
const saveMeal = async (meal: Meal) => {
  try {
    await fetch('http://localhost:4000/favorites/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal),
    })
    alert(`🍴 ${meal.strMeal} ble lagret som favoritt!`)
  } catch (err) {
    console.error('Feil ved lagring av måltid:', err)
  }
}


  useEffect(() => {
    fetchMeals(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-6">
        🍽️ MatBuddy Oppskrifter
      </h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-8 gap-2">
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
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-md mb-3"
                loading="lazy"
              />

              <h2 className="text-lg font-semibold line-clamp-2">{meal.strMeal}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {meal.strArea} • {meal.strCategory}
              </p>

              {meal.strTags && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {meal.strTags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              )}

              <div className="mt-3">
                <h3 className="text-sm font-semibold mb-1">Ingredienser</h3>
                <ul className="text-sm text-gray-700 space-y-0.5 max-h-28 overflow-auto pr-1">
                  {meal.ingredients.map(({ ingredient, measure }, idx) => (
                    <li
                      key={`${meal.idMeal}-ing-${idx}`}
                      className="flex justify-between gap-2"
                    >
                      <span className="truncate">{ingredient}</span>
                      <span className="text-gray-500">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <details className="mt-3">
                <summary className="text-sm text-orange-700 cursor-pointer">
                  Vis instruksjoner
                </summary>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                  {meal.strInstructions}
                </p>
              </details>
              <button
              onClick={() => saveMeal(meal)}
              className="mt-3 inline-block text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md text-center"
            >
              ⭐ Lagre som favoritt
            </button>

              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-center"
                >
                  Se på YouTube
                </a>
              )}
            </div>
            
          ))}
        </div>
      )}
    </div>
  )
}

/* ---- DINE KOMMENTERTE DELER (uendret) NEDENFOR ----

const fetchMeals = async (term: string) => {
  try {
    setLoading(true)
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    )
    const data: { meals: Meal[] | null } = await res.json()
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
*/

/*return (
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
  )*/

