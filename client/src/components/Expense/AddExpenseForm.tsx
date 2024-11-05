import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array

    // Add new expense to the expenses context array
    const newExpense = {
      id: (expenses.length + 1).toString(), // Assuming there's an 'id' field for uniqueness
      description: name,
      cost: parseFloat(cost), // Convert cost to a number
    };

    // Call createExpense before setting the expenses in context
    createExpense(newExpense);

    setExpenses([...expenses, newExpense]);

    // Clear the form fields after submission
    setName('');
    setCost('');
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={e => setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
