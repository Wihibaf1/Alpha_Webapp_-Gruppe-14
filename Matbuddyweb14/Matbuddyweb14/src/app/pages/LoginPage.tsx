"use client"

import { useState } from "react"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("loggedIn", "true")
      window.location.href = "/home" // Redirect
    } else {
      alert("Skriv inn e-post og passord!")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFA726]">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center">
        <div className="bg-[#F5F5F5] rounded-t-2xl py-3 mb-6">
          <h1 className="text-2xl font-bold flex justify-center items-center gap-2 text-gray-700">
            <span role="img" aria-label="fork and knife">🍴</span> MatBuddy
          </h1>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Logg inn</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-gray-500 transition mt-2"
          >
            Logg inn
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-700">
          Har du ikke en konto?{" "}
          <a href="#" className="font-bold text-gray-800 hover:underline">
            Registrer deg
          </a>
        </p>
      </div>
    </div>
  )
}
