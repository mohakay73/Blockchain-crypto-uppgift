import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/listBlocks.css'; // Import your CSS file

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
    return <div className="loading">Loading...</div>; // Apply loading class
  }

  if (error) {
    return <div className="error">{error}</div>; // Apply error class
  }

  return (
    <div className="blockchain-container">
      {' '}
      {/* Apply container class */}
      <h1 className="title">Blocks</h1> {/* Apply title class */}
      {blocks.length === 0 ? (
        <p className="no-blocks">No blocks found</p>
      ) : (
        blocks.map((block, index) => (
          <div
            key={index}
            className="block"
          >
            <h2 className="block-title">Block #{index + 1}</h2>{' '}
            {/* Apply block-title class */}
            <pre className="block-content">
              {JSON.stringify(block, null, 2)}
            </pre>{' '}
            {/* Apply block-content class */}
          </div>
        ))
      )}
    </div>
  );
};

export default ListBlocks;
