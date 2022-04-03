import React, { useState } from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search, { checkValidity } from "./Components/Search";
import Error from "./Components/Error";
import { STUDENTS } from "./studentList";
//not verified
//validity has expired
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("")

  
  const listName = STUDENTS.map((student) => student.name).filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isValidName = () => {
    let validName = []
    STUDENTS.forEach(student => {
      if (student.name.toLowerCase() === searchTerm.toLowerCase()) {
        validName.push(student.name)
      }
    });
    return validName.length === 0 ? false : true
  }

  const isValidDate = () => {
    let listValid = STUDENTS.map((student) => student.name.toLowerCase() === searchTerm.toLowerCase() ? student.validityDate : null).filter(item => item !== null)
    let validDate = checkValidity(date, listValid.toString())
    return validDate
  }
  
  const handleClick = () => {
    if (isValidName() === true && isValidDate() === false) {
      console.log("validity expired")
      setError("validity expired")
    } else if (isValidName() === false && isValidDate() === false) {
      console.log("student not found")
      setError("student not found")
    } else {
      setCart([...cart, listName])
    }

    console.log("isValidName: ", isValidName() , "isValidDate :", isValidDate())
    setDate("");
    setSearchTerm("");
    setTimeout(() => {
      setError("")
    },5000)
  };

  return (
    <div className="App">
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          date={date}
          setDate={setDate}
          handleClick={handleClick}
        />
        <Error error={error !== "" ? error : ""} setError={setError}/>
        <ResidentsList cart={cart} />
      </div>
    </div>
  );
}

export default App;
