import React, { useEffect, useState } from 'react';

const Report = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categoryExpenseSummary, setCategoryExpenseSummary] = useState({});
    const [categoryIncomeSummary, setCategoryIncomeSummary] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/transactions')
            .then(res => res.json())
            .then(data => {
                setTransactions(data);

                let income = 0, expenses = 0;
                let expenseData = {}, incomeData = {};

                data.forEach(tx => {
                    if (tx.type === 'Income') {
                        income += tx.amount;
                        incomeData[tx.category] = (incomeData[tx.category] || 0) + tx.amount;
                    } else {
                        expenses += tx.amount;
                        expenseData[tx.category] = (expenseData[tx.category] || 0) + tx.amount;
                    }
                });

                setTotalIncome(income);
                setTotalExpenses(expenses);
                setCategoryExpenseSummary(expenseData);
                setCategoryIncomeSummary(incomeData);
            });
    }, []);

    return (
        <div className="report-container">
            <h2>📊 Financial Report</h2>

            {/* Total Income vs Expenses */}
            <div className="summary-box">
                <h3>Total Income vs Expenses</h3>
                <p>💰 Income: <strong>₹{totalIncome.toFixed(2)}</strong></p>
                <p>💸 Expenses: <strong>₹{totalExpenses.toFixed(2)}</strong></p>
                <p>🧐 Balance: <strong>₹{(totalIncome - totalExpenses).toFixed(2)}</strong></p>
            </div>

            {/* Income Breakdown */}
            <div className="summary-box">
                <h3>💵 Income Breakdown</h3>
                <ul>
                    {Object.keys(categoryIncomeSummary).map((category) => (
                        <li key={category}>
                            {category}: <strong>₹{categoryIncomeSummary[category].toFixed(2)}</strong>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Expense Breakdown */}
            <div className="summary-box">
                <h3>📂 Expense Breakdown</h3>
                <ul>
                    {Object.keys(categoryExpenseSummary).map((category) => (
                        <li key={category}>
                            {category}: <strong>₹{categoryExpenseSummary[category].toFixed(2)}</strong>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Transactions */}
            <div className="summary-box">
                <h3>📝 Recent Transactions</h3>
                <ul>
                    {transactions.slice(-5).map(tx => (
                        <li key={tx.id}>
                            {tx.type} - ₹{tx.amount} ({tx.category}) on {new Date(tx.date).toLocaleDateString('en-GB')}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Report;
