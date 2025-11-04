export function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-100">
      <h1 className="text-5xl font-bold mb-4 text-orange-700">Velkommen til MatBuddy 🍴</h1>
      <p className="text-lg mb-6">Oppdag deilige oppskrifter og logg inn for mer!</p>
      <div className="flex gap-4">
        <a href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
          Logg inn
        </a>
        <a href="/recipes" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Se oppskrifter
        </a>
      </div>
    </div>
  )
}
