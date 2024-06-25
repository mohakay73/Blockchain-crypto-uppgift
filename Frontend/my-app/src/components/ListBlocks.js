import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/v1/blockchain');
        setBlocks(res.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch blocks');
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Blockchain Blocks</h1>
      {blocks.length === 0 ? (
        <p>No blocks found</p>
      ) : (
        blocks.map((block, index) => (
          <div key={index}>
            <h2>Block #{index + 1}</h2>
            <pre>{JSON.stringify(block, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
};

export default ListBlocks;
