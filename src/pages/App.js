import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}`
      );
      setUsers(response.data.items.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="flex flex-col text-center">
      <header className="mt-10">
        <h1 className="text-3xl font-bold text-gray-700">
          Pley Home Assignment
        </h1>
        <h2 className="italic">Gustav Walter</h2>
      </header>
      <main className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="search">
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Search Github
            </button>
          </div>
        </form>
        <div className="display_data mt-10">
          {users.map((user) => (
            <div
              key={user.login}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border-2 border-solid mt-5 mb-5 border-zinc-600"
            >
              <a href={user.html_url}>
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-48 w-full object-cover md:h-full md:w-48"
                      src={user.avatar_url}
                      alt="Modern building architecture"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                      {user.login}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
