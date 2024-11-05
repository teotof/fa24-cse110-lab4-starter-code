import { Expense } from "../../types/types";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = ({ expense }: { expense: Expense }) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      // Call the backend to delete the expense
      await deleteExpense(expenseId);

      // Update the local state by removing the expense
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
      console.log("Expense deleted successfully");
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{expense.description}</div>
      <div>${expense.cost.toFixed(2)}</div> {/*Two decimal places*/}
      <div>${expense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(expense.id)} aria-label="delete">x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
