import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface URL {
  _id: string;
  longUrl: string;
  shortUrl: string;
  user?: string;
}

const URLShortener = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState<URL[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      console.log("Fetching URLs...");
      const response = await axios.get("http://localhost:8000/api/url/urls", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response data:", response.data);
      setUrls(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch URLs");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Sending URL:", url);
      const response = await axios.post(
        "http://localhost:8000/api/url/shorten",
        { url: url },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.shortUrl) {
        fetchUrls();
        setUrl("");
      }
    } catch (err) {
      setError("Failed to create short URL");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/url/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUrls();
    } catch (err) {
      setError("Failed to delete URL");
    }
  };

  const handleSIgnOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Floating Menu */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative group">
          <button className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <button
              onClick={handleSIgnOut}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Shorten
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-400 text-center text-sm bg-red-900/50 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {urls.map((urlItem) => (
            <div
              key={urlItem._id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 relative group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-300 mb-2">
                    Original URL:{" "}
                    <span className="text-gray-400">{urlItem.longUrl}</span>
                  </p>
                  <p className="text-gray-300">
                    Short URL:{" "}
                    <a
                      className="text-blue-400 hover:text-blue-300 transition duration-200"
                      target="_blank"
                      href={`http://localhost:8000/${urlItem.shortUrl}`}
                    >
                      {`http://localhost:8000/${urlItem.shortUrl}`}
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(urlItem._id)}
                  className="text-gray-500 hover:text-red-500 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
