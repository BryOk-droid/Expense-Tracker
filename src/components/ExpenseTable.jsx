const ExpenseTable = ({ expenses, deleteExpense }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }

    if (dateString.includes("-")) {
      const [year, month, day] = dateString.split("-");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }

    return dateString;
  };

  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
            <th>CATEGORY</th>
            <th>DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
