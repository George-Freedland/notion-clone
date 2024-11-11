import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pages on component mount
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in local storage
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pages`, { userId });
        setPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-200 h-screen">
        <button className="w-full p-2 mb-4 text-white bg-blue-500 rounded">
          New Page
        </button>
        {loading ? (
          <p>Loading pages...</p>
        ) : pages.length > 0 ? (
          <ul>
            {pages.map((page) => (
              <li key={page.pageId} className="py-2">
                {page.pageTitle}
              </li>
            ))}
          </ul>
        ) : (
          <p>No pages</p>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
      </main>
    </div>
  );
};

export default Home;
