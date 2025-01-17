import React, { useState } from "react";

function Home({token}) {
  const [showUserInfo, setShowUserInfo] = useState(true);

  // Dummy user data, will not need this once integration with backend
  const user = {
    username: "Aatish",
    password: "Random123",
    age: '21'
  };

  const handleLogout = () => {
    console.log("need to write logout logic here")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>
        
        {/* Me Info Button */}
        <button
          onClick={() => setShowUserInfo(true)}
          className="w-full py-3 mb-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          Me Info
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* User Info Modal (Hidden by default) */}
      {showUserInfo && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-center mb-6">User Information</h3>
            <div className="space-y-4">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Password:</strong> {user.password}</p>
              <p><strong>Age:</strong> {user.age}</p>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowUserInfo(false)}
                className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
