import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";
import "./Budget.css";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(budget.toString());

  // Fetch the budget from the backend on component mount
  useEffect(() => {
    const loadBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget); // Set the fetched budget in the context
        setInputValue(fetchedBudget.toString()); // Synchronize input value with fetched budget
      } catch (error) {
        console.error("Failed to load budget:", error);
      }
    };

    loadBudget();
  }, [setBudget]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const updatedBudget = parseFloat(inputValue);
    setBudget(updatedBudget); // Update budget in context immediately

    try {
      // Save the updated budget to the backend
      await updateBudget(updatedBudget);
      console.log("Budget updated successfully");
    } catch (error) {
      console.error("Failed to update budget:", error);
    }

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
