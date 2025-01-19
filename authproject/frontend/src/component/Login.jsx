import { useState } from "react"

function Login({onLogin}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const areButtonsDisabled = !username || !password;

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/signin', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        })
      })

      if(!response.ok) {
        throw new Error(response)
      }
      const result = await response.json()
      onLogin(result.token)
    } catch (error) {
      console.error("error", error)
    }
  }

  const handleSignup = async () => {
    try {
      const response = await fetch(`http://localhost:5000/signup`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body : JSON.stringify({
          username,
          password
        })
      })

      const result = await response?.json();
      alert(result?.message)

      if(!response.ok) {
        throw new Error
      }
    } catch (error) {
      console.error("Error occured", error)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex flex-row">
            <button
              onClick={handleSignIn}
              disabled={areButtonsDisabled}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed">
              Sign in
            </button>

            <button
              onClick={handleSignup}
              disabled={areButtonsDisabled}
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-green-300 disabled:cursor-not-allowed">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
