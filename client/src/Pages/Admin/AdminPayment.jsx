import { useEffect, useState } from "react";
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const BuyerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); // To hold the user being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const [alert, setAlert] = useState({
    message: "",
    type: "", // "success" or "error"
    isVisible: false,
  });

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users?role=buyer"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch buyers");
        }
        const buyers = await response.json();
        setUsers(buyers);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBuyers();
  }, []);


  // Function to save the edited buyer
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
      setAlert({
        message: "User updated successfully.",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      setAlert({
        message: "Error updating user: " + error.message,
        type: "error",
        isVisible: true,
      });
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
      setUsers(users.filter((user) => user._id !== id));
      setAlert({
        message: "User deleted successfully.",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      setAlert({
        message: "Error deleting user: " + error.message,
        type: "error",
        isVisible: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="items-center justify-center min-h-screen p-6 bg-emerald-200">
      <h1 className="py-4 mb-4 text-2xl font-bold text-center">Buyer Dashboard</h1>

      <div className="flex justify-center py-6 mb-4">

      {/* Alert Popup */}
      <AlertPopup
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={() => setAlert({ ...alert, isVisible: false })}
      />

      <table className="bg-white border rounded-lg shadow-md w-[900px]">
        <thead className="text-sm text-gray-700 uppercase bg-gray-300 ">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-center">Address</th>
            <th className="px-4 py-2 text-center">Zipcode</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="transition duration-200 border-b hover:bg-gray-50"
            >
              <td className="px-4 py-2">Isura</td>
              <td className="px-4 py-2">isura@gmail.com</td>
                <td className="px-4 py-2 text-center">Passara, Badulla</td>
                <td className="px-4 py-2 text-center">10500</td>
              <td className="flex px-4 py-2 space-x-2">
                
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
            <h2 className="mb-4 text-xl font-bold">Edit Buyer</h2>
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
    </div>
  );
};

export default BuyerDashboard;