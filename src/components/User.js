import React, { useEffect, useState } from "react";
import Table from "./Table";
import PaginationUI from "./Pagination";
import "../styles/User.css";
import config from "../config/config";

import axios from "axios";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

const AdminUI = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  //
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isAdding, setIsAdding] = useState(false);
  //

  const { firstName, lastName, email, department } = formFields;

  const fetchData = () => {
    fetch(config.apiEndPoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataRecieved) => {
        setData(dataRecieved);
        setSearchApiData(dataRecieved);
      })
      .catch((error) => {
        alert("Error fetching data:", error);
        // Handle the error or display an error message
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data);

  //handler function to handle form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value, id: data.length + 1 });
  };
  // const handleUserAdditionCancel = () => console.log("cancel clicked");

  //handler function to POST a new user to given API endpoint
  const handleUserAddFromSubmit = async (event) => {
    if (!firstName || !lastName || !email || !department) {
      alert("All form fields should be filled");
      return;
    }
    event.preventDefault();
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formFields
      );
      setIsAdding(false);
      setFormFields(defaultFormFields);
      alert("User added successfully!!");
    } catch (error) {
      setIsAdding(false);
      setFormFields(defaultFormFields);
      alert(error);
    }
  };

  return (
    <section className="adminui-container">
      <Table
        data={data}
        setData={setData}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        setEditingId={setEditingId}
        editingId={editingId}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />

      <PaginationUI
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        setData={setData}
        currentPage={currentPage}
        data={data}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />

      {isAdding && (
        <div className="overlay">
          <div className="add-form-container" id="modal">
            <form className="add-form">
              {/*<input
        name="id"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter ID"
      />*/}
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
              <input
                type="text"
                name="department"
                value={department}
                onChange={handleInputChange}
                placeholder="Enter department"
              />
              <div className="buttons-container">
                <button type="button" onClick={handleUserAddFromSubmit}>
                  SUBMIT
                </button>
                <button type="button" onClick={() => setIsAdding(false)}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setIsAdding(true)}>
        ADD NEW USER
      </button>
    </section>
  );
};

export default AdminUI;
