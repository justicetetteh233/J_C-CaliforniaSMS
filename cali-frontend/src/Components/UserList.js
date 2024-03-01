import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchUsers();
  }, [refreshKey]); // Add refreshKey as a dependency to refresh the list

  const handleRefresh = () => {
    // Function to manually refresh the user list
    setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger useEffect
  };

  const handleUserSelect = (userId) => {
    // Function to toggle user selection
    if (selectedUsers.includes(userId)) {
      // If the user is already selected, remove them from the selectedUsers array
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // If the user is not selected, add them to the selectedUsers array
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelected = async () => {
    // Function to delete selected users
    try {
      // Loop through selectedUsers and send DELETE requests to delete each user
      for (const userId of selectedUsers) {
        await axios.delete(`http://127.0.0.1:8000/api/user/${userId}/`);
      }
      // After successful deletion, refresh the user list
      handleRefresh();
      // Clear the selectedUsers array
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleDeleteSelected}>Delete Selected</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleUserSelect(user.id)}
            />
            {user.username} - {user.userType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
