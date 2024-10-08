import { useState, useEffect } from "react";

const UserForm = ({ existingUser = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingUser.firstName || "");
  const [lastName, setLastName] = useState(existingUser.lastName || "");
  const [email, setEmail] = useState(existingUser.email || "");

  useEffect(() => {
    console.log("exitingUser", existingUser);
  }, []);

  const updating = Object.entries(existingUser).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };
    const url =
      "http://localhost:5000/" +
      (updating ? `update_user/${existingUser.id}` : "create_user");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default UserForm;
