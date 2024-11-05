import { Expense } from "../../types/types";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = ({ expense }: { expense: Expense }) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = (expenseId: string) => {
    // Exercise: Remove expense from expenses context array
    setExpenses(expenses.filter(exp => exp.id !== expenseId));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{expense.name}</div>
      <div>${expense.cost.toFixed(2)}</div> {/*Two decimal places*/}
      <div>${expense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(expense.id)} aria-label="delete">x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
