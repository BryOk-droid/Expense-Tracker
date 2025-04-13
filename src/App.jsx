import { useState, useEffect } from "react";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [
          {
            id: 1,
            name: "Coffee",
            description: "Morning coffee",
            amount: 4.5,
            category: "Food",
            date: "01/04/2025",
          },
          {
            id: 2,
            name: "Movie",
            description: "Weekend entertainment",
            amount: 12.0,
            category: "Entertainment",
            date: "05/04/2025",
          },
        ];
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    if (!newExpense.name || !newExpense.amount || !newExpense.category) {
      console.error("Missing required fields");
      return;
    }

    const formattedDate =
      newExpense.date || new Date().toLocaleDateString("en-GB");

    setExpenses((prev) => [
      ...prev,
      {
        ...newExpense,
        id: Date.now(),
        amount: parseFloat(newExpense.amount),
        date: formattedDate,
      },
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="app-title">Expense Tracker</h1>
        <p className="app-subtitle">
          Start taking control of your finances and life. Record, categorize and
          analyze your spending
        </p>
      </div>

      <div className="app-content">
        <div className="form-section">
          <ExpenseForm addExpense={addExpense} />
        </div>

        <div className="table-section">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h2>Your Expenses</h2>
          <ExpenseTable
            expenses={filteredExpenses}
            deleteExpense={deleteExpense}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
