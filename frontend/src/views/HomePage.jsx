import { useState, useEffect } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import "../App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setUsers(data.users);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    if (isModalOpen) return;
    setCurrentUser(user);
    console.log("currentUser", user);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchUsers();
  };

  return (
    <>
      <UserList
        users={users}
        updateUser={openEditModal}
        updateCallback={onUpdate}
      />
      <button class="bg-blue-400 text-white" onClick={openCreateModal}>
        Create New User
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <UserForm existingUser={currentUser} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
