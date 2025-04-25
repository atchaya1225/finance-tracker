import React, { useState, useEffect } from 'react';

const AddTransaction = () => {
    const [formData, setFormData] = useState({ type: 'Expense', amount: '', category: '', date: '' });
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        fetch('http://localhost:5000/transactions')
            .then(res => res.json())
            .then(data => setTransactions(data));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingTransaction
            ? `http://localhost:5000/transactions/${editingTransaction.id}`
            : `http://localhost:5000/transactions`;

        fetch(url, {
            method: editingTransaction ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(() => {
            setEditingTransaction(null);
            fetchTransactions();
        });
    };

    const handleEdit = (transaction) => {
        setFormData(transaction);
        setEditingTransaction(transaction);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/transactions/${id}`, { method: 'DELETE' })
            .then(() => fetchTransactions());
    };

    return (
        <div className="transaction-container">
            <h2>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Type:</label>
                <select name="type" onChange={handleChange} value={formData.type}>
                    <option>Expense</option>
                    <option>Income</option>
                </select>

                <label>Amount:</label>
                <input type="number" name="amount" placeholder="Enter amount in ₹" onChange={handleChange} required />

                <label>Category:</label>
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required />

                <label>Date:</label>
                <input type="date" name="date" onChange={handleChange} required />

                <button type="submit">{editingTransaction ? "Update Transaction" : "Add Transaction"}</button>
            </form>

            <h3>Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{tx.type}</td>
                            <td>₹{tx.amount}</td>
                            <td>{tx.category}</td>
                            <td> {new Date(tx.date).toLocaleDateString('en-GB')}</td>
                            <td className="action-buttons">
                                <button onClick={() => handleEdit(tx)} className="edit-btn">
                                    ✏️
                                </button>
                                <button onClick={() => handleDelete(tx.id)} className="delete-btn">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddTransaction;
