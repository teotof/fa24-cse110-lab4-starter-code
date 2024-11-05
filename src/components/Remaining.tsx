import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  // Calculate remaining budget
  const remaining = budget - totalExpenses;

  useEffect(() => {
    // Check if remaining balance is less than 0
    if (remaining < 0) {
      window.alert(`Warning: You are over budget by $${-remaining}`);
    }
  }, [remaining]);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;
