import React, { useState } from 'react';
import './tableForm.css';

const TableForm = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState(null); // Add error state

  const handleSubmit = () => {
    setLoading(true);
    setError(null); // Reset error state
    const URL = `https://app.zipcodebase.com/api/v1/search?apikey=955ea840-f4f0-11ed-9283-3ff108ecb606&codes=${postalCode}`;
    fetch(URL)
      .then(response => response.json())
      .then(json => {
        if (json.results && json.results[postalCode]) {
          setUsers(json.results[postalCode]);
        } else {
          setError('Invalid postal code'); // Set error message
        }
      })
      .catch(error => {
        setError('An error occurred.'); // Set error message
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="tableForm">
      <div className='container'>
        <input
          type="text"
          value={postalCode}
          onChange={event => setPostalCode(event.target.value)}
          placeholder="Enter postal code"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div style={{color: "red", fontSize: "18px", fontWeight: "bold", marginTop: "25px"}}>Error: {error}</div> // Display error message
          ) : (
            <>
              <h1>Zip Code</h1>
              <table border={1}>
              <tr>
                <th>S.no</th>
                <th>Postal Code</th>
                <th>Country Code</th>
                <th>City</th>
                <th>State</th>
                <th>City Enteries</th>
                <th>State Enteries</th>
              </tr>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="sno">{index}</td>
                  <td>{user.postal_code}</td>
                  <td>{user.country_code}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.city_en}</td>
                  <td>{user.state_en}</td>
                </tr>
              ))}
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TableForm;
