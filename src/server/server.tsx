// src/components/MoodUPContent.tsx
import React, { useEffect, useState } from 'react';

interface MoodContent {
  content: string;
  countContent: number;
}

const Server: React.FC = () => {
  const [data, setData] = useState<MoodContent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = 'your-jwt-token'; // Replace with actual JWT token
    const date = '28/09/2024'; // Optional: You can leave it empty to use today's date

    fetch(`http://localhost:5000/MoodUPContent?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT in Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Mood Content Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.content}: {item.countContent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Server;
