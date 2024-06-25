import React, { useState } from 'react';
import axios from 'axios';

const MineBlockForm = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/v1/block/mine', {
        data,
      });
      console.log('Mined Block:', res.data.data);
      // Optionally, you can handle success (e.g., show a success message, reset form)
    } catch (error) {
      setError('Failed to mine block');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Mine a New Block</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Mining...' : 'Mine Block'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default MineBlockForm;
