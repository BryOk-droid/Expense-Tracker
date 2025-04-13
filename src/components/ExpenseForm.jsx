import { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "date") {
      setShowDatePlaceholder(!value);
    }
  };

  const handleDateFocus = () => {
    setShowDatePlaceholder(false);
  };

  const handleDateBlur = () => {
    setShowDatePlaceholder(!formData.date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.amount || !formData.category) {
      alert("Please fill in Name, Amount, and Category");
      return;
    }

    // Format date to DD/MM/YYYY
    let formattedDate;
    if (formData.date) {
      const dateObj = new Date(formData.date);
      formattedDate = dateObj.toLocaleDateString("en-GB");
    } else {
      formattedDate = new Date().toLocaleDateString("en-GB");
    }

    const newExpense = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: formattedDate,
    };

    addExpense(newExpense);

    // Reset form
    setFormData({
      name: "",
      description: "",
      amount: "",
      category: "",
      date: "",
    });
    setShowDatePlaceholder(true);
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <p className="form-instruction">Enter your expense details below</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Expense Name"
            required
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Expense Description"
          />
        </div>

        <div className="form-field">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-field">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount ($)"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-field date-input-wrapper">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            className="date-input"
          />
          {showDatePlaceholder && (
            <span className="date-placeholder">DD/MM/YYYY</span>
          )}
        </div>

        <button type="submit" className="add-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
