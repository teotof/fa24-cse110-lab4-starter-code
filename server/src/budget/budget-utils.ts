import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const { amount } = body;

    // Validate that 'amount' is provided and is a valid number
    if (typeof amount !== 'number' || amount < 0) {
        return res.status(400).send({ error: "Invalid 'amount' field in request body" });
    }

    // Update the budget amount
    budget.amount = amount;

    // Respond with the updated budget
    res.status(200).send({ data: budget.amount });
}
