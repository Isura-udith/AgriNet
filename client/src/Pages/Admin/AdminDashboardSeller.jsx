import { useEffect, useState } from "react";
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); // To hold the user being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const [alert, setAlert] = useState({
    message: '',
    type: '', // "success" or "error"
    isVisible: false,
  });

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users?role=seller"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sellers");
        }
        const sellers = await response.json();
        setUsers(sellers);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  // Function to handle editing a user
  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  // Function to save the edited user
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${editUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

   // Delete user by ID
   const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Remove deleted user from the state
      setUsers(users.filter((user) => user._id !== id));
      setAlert({
        message: "User deleted successfully.",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      alert("Error deleting user: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-emerald-200">
      <h1 className="py-4 mb-4 text-2xl font-bold text-center">Seller Dashboard</h1>

      {/* Alert Popup */}
                  <AlertPopup
                    message={alert.message}
                    type={alert.type}
                    isVisible={alert.isVisible}
                    onClose={() => setAlert({ ...alert, isVisible: false })}
                  />


      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead className="text-sm text-gray-700 uppercase bg-gray-300">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="transition duration-200 border-b hover:bg-gray-50"
            >
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.address}</td>
              <td className="flex px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Edit User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
