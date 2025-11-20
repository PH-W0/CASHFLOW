import { useState } from "react";
import { X } from "lucide-react";
import type { Transaction } from "../context/TransactionContext";

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
  onCancel: () => void;
}

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Bonus",
  "Other",
];
const EXPENSE_CATEGORIES = [
  "Rent",
  "Utilities",
  "Food",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Other",
];

export function TransactionForm({
  onAddTransaction,
  onCancel,
}: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split("T")[0],
      dueDate: dueDate || undefined,
    });

    setAmount("");
    setCategory("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-foreground">Add Transaction</h3>
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Selection */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setType("income");
              setCategory("");
            }}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              type === "income"
                ? "bg-success text-success-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => {
              setType("expense");
              setCategory("");
            }}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              type === "expense"
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Expense
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2 bg-secondary border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 bg-secondary border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Monthly rent payment"
            className="w-full px-4 py-2 bg-secondary border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Due Date (optional, for expenses) */}
        {type === "expense" && (
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium mt-6"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
