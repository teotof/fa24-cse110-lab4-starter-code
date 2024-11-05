import { createContext, useState, useEffect } from "react";
import { Expense } from "../types/types";
import { fetchBudget } from "../utils/budget-utils";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => { },
  budget: 0,
  setBudget: () => { },
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  // Fetch initial budget from the server on component mount
  useEffect(() => {
    const loadInitialBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget); // Set the initial budget from the server
      } catch (error) {
        console.error("Failed to load budget:", error);
      }
    };

    loadInitialBudget();
  }, []);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget,
        setBudget: setBudget
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
