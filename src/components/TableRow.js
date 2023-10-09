import React, { useState } from "react";

const EditableUserRow = ({
  data,
  setData,
  item,
  setSearchApiData,
  setEditingId,
  searchApiData,
}) => {
  // saveEditData is a state variable to save the edited data
  const [saveEditData, setSaveEditData] = useState({ ...item });

  // Functionality to perform dynamic updates of user details by modifying the corresponding field value for a specific user.
  const handleInputChange = (field, value) => {
    if (field === "name.split[0]") {
      const [firstName, lastName] = saveEditData.name.split(" ");
      setSaveEditData((prevData) => ({
        ...prevData,
        name: `${value} ${lastName}`,
      }));
    } else if (field === "name.split[1]") {
      const [firstName, lastName] = saveEditData.name.split(" ");
      setSaveEditData((prevData) => ({
        ...prevData,
        name: `${firstName} ${value}`,
      }));
    } else {
      setSaveEditData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  
//validating the user input
  const validateInput = () => {
    if (saveEditData.name.split(" ")[0].trim() === "") {
      alert("First name  should not be empty");
      return false;
    }
    if (saveEditData.name.split(" ")[1].trim() === "") {
      alert("Last name should not be empty");
      return false;
    }
    if (saveEditData.email.trim() === "") {
      alert("Email should not be empty");
      return false;
    }
    if (saveEditData.company.name.trim() === "") {
      alert("Company name should not be empty");
      return false;
    }
    return true;
  };

  // Functionality to update the data after editing.
  const handleUpdate = (id) => {
    if (!validateInput()) {
      return;
    } else {
      const updatedData = data.map((userData) => {
        if (userData.id === id) {
          return { ...saveEditData };
        }
        return userData;
      });

      const updatedSearchApiData = searchApiData.map((searchData) => {
        if (searchData.id === id) {
          return { ...saveEditData };
        }
        return searchData;
      });

      setData(updatedData);
      setSearchApiData(updatedSearchApiData);
    }

    setEditingId(null);
    // Perform the update logic, such as making API calls or updating the state.
  };

  return (
    <>
      <td>{item.id}</td>
      <td>
        <input
          type="text"
          value={saveEditData.name.split(" ")[0]}
          onChange={(e) => handleInputChange("name.split[0]", e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.name.split(" ")[1]}
          onChange={(e) => handleInputChange("name.split[1]", e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.company.name}
          onChange={(e) => handleInputChange("company", { ...saveEditData.company, name: e.target.value })}
        />
      </td>
      <td>
        <button className="check-mark" onClick={() => handleUpdate(item.id)}>
          {String.fromCharCode(10003)}
        </button>
      </td>
    </>
  );
};

export default EditableUserRow;
