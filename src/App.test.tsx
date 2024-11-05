import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';

describe('App functionality', () => {
  test('creates an expense and updates totals', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Input Field and Buttons
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const addButton = screen.getByRole('button', { name: /save/i });
    const initialBudget = 1000;

    // Simulate adding an expense
    fireEvent.change(nameInput, { target: { value: 'Test Expense' } });
    fireEvent.change(costInput, { target: { value: '100' } });
    fireEvent.click(addButton);

    // Assertion
    expect(screen.getByText(/test expense!!/i)).toBeInTheDocument();
    let totalExpensesAfterAdd = extractNumbers(screen.getByText(/spent so far: \$100/i));
    let remainingAfterAdd = extractNumbers(screen.getByText(/remaining: \$900/i));
    verifyBudgetEquation(initialBudget, totalExpensesAfterAdd, remainingAfterAdd);
  });

  test('creates an expense, deletes an expense and updates totals', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Add an expense
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const addButton = screen.getByRole('button', { name: /save/i });
    const initialBudget = 1000;

    fireEvent.change(nameInput, { target: { value: 'Coffee' } });
    fireEvent.change(costInput, { target: { value: '5' } });
    fireEvent.click(addButton);

    // Assert Expense is Added
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.queryByText('$5.00')).toBeInTheDocument();
    let totalExpensesAfterAdd = extractNumbers(screen.getByText(/spent so far: \$5/i));
    let remainingAfterAdd = extractNumbers(screen.getByText(/remaining: \$995/i));
    verifyBudgetEquation(initialBudget, totalExpensesAfterAdd, remainingAfterAdd);

    // Delete an expense
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Assert Expense is Deleted
    expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
    expect(screen.queryByText('$5.00')).not.toBeInTheDocument();
    let totalExpensesAfterDelete = extractNumbers(screen.getByText(/spent so far: \$0/i));
    let remainingAfterDelete = extractNumbers(screen.getByText(/remaining: \$1000/i));
    verifyBudgetEquation(initialBudget, totalExpensesAfterDelete, remainingAfterDelete);
  });


  test('verifies budget balance equation after adding and deleting an expense', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Assume initial budget of $1000
    const initialBudget = 1000;
    expect(screen.getByText(/budget: \$1000/i)).toBeInTheDocument();

    // Simulate adding an expense
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const addButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(nameInput, { target: { value: 'Office Supplies' } });
    fireEvent.change(costInput, { target: { value: '300' } });
    fireEvent.click(addButton);

    // Assertion for Addition
    let totalExpensesAfterAdd = extractNumbers(screen.getByText(/spent so far: \$300/i));
    let remainingAfterAdd = extractNumbers(screen.getByText(/remaining: \$700/i));
    verifyBudgetEquation(initialBudget, totalExpensesAfterAdd, remainingAfterAdd);

    // Delete the Expense
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Assertion for Deletion
    let totalExpensesAfterDelete = extractNumbers(screen.getByText(/spent so far: \$0/i));
    let remainingAfterDelete = extractNumbers(screen.getByText(/remaining: \$1000/i));
    verifyBudgetEquation(initialBudget, totalExpensesAfterDelete, remainingAfterDelete);
  });
});


function verifyBudgetEquation(initialBudget: number, totalSpent: number, remaining: number) {
  expect(initialBudget).toEqual(totalSpent + remaining);
}

function extractNumbers(textElement: HTMLElement): number {
  return Number(textElement.textContent?.replace(/[^\d.]/g, ''));
}