import { API_BASE_URL } from "../constants/constants";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }

    // Parsing the response to get the data in a consistent way
    const data = await response.json().then((jsonResponse) => {
        console.log("Fetched budget data:", jsonResponse);
        return jsonResponse.data;
    });

    return data;
};

// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: budget }), // Send the updated budget as 'amount'
        });

        if (!response.ok) {
            throw new Error("Failed to update budget");
        }

        const data = await response.json();
        return data.data; // Assuming the backend response format is { "data": updatedBudget }
    } catch (error) {
        console.error("Error updating budget:", error);
        throw error;
    }
};