import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}/`); // Replace '/api/' with your API base URL
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetail();
  }, [userId]);

  return (
    <div>
      <h2>User Detail</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>User Type: {user.userType}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
