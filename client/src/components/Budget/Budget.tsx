import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./Budget.css";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(budget.toString());

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setBudget(parseFloat(inputValue));
    setEditMode(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {editMode ? (
        <div className="d-flex justify-content-between w-100">
          <input type="number" value={inputValue} onChange={handleChange} className="form-control" />
          <button onClick={handleSave} className="btn btn-primary ml-2">Save</button>
        </div>
      ) : (
        <div className="d-flex justify-content-between w-100">
          <span>Budget: ${budget}</span>
          <button onClick={handleEdit} className="btn btn-secondary">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Budget;
