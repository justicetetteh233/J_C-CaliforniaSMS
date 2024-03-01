import React, { useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([
    { name: "John Doe", id: 1, role: "Admin" },
    { name: "Jane Smith", id: 2, role: "User" },
    { name: "Bob Johnson", id: 3, role: "Moderator" },
    { name: "Alice Brown", id: 4, role: "User" },
    { name: "Derrick", id: 5, role: "User" },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRemoveUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    setSelectedRow(null); // Reset selectedRow after removing the user
  };

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>All Users</h2>
        <div>
          <span style={{ marginRight: "5px" }}>Add User</span>
          <button onClick={() => console.log("Add User")} style={{ fontSize: "20px" }}>
            +
          </button>
        </div>
      </div>

      <hr style={{ border: "1px solid white", margin: "0", marginTop: "10px", marginBottom: "20px" }} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index)}
              style={{
                cursor: "pointer",
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#ddedfa", // Alternate row background color
              }}
            >
              <td>{user.name}</td>
              <td>{user.id}</td>
              <td>{user.role}</td>
              <td>{selectedRow === index && <button className="table-remove-button" onClick={() => handleRemoveUser(index)}>Remove</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
