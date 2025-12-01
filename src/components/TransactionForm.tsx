import { useState, useEffect } from "react";
import { Transaction } from "../context/TransactionContext";
import { Plus, Minus } from "lucide-react";

const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Bonus", "Gift", "Other"];
const EXPENSE_CATEGORIES = ["Food", "Transportation", "Entertainment", "Utilities", "Shopping", "Healthcare", "Other"];

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  initialData?: Omit<Transaction, "id">;
}

export function TransactionForm({ onSubmit, initialData }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">(initialData?.type || "income");
  const [amount, setAmount] = useState<number>(initialData?.amount || 0);
  const [category, setCategory] = useState<string>(initialData?.category || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [date, setDate] = useState<string>(initialData?.date || new Date().toISOString().split("T")[0]);

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Reset category if it doesn't exist in the new type
  useEffect(() => {
    if (!categories.includes(category)) {
      setCategory("");
    }
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || amount <= 0 || !date) {
      alert("Please fill all required fields correctly");
      return;
    }

    onSubmit({
      type,
      amount,
      category,
      description,
      date,
    });

    // Reset form
    setType("income");
    setAmount(0);
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  // Format number as South African Rand
  const formatRands = (value: number) => {
    return value.toLocaleString("en-ZA", { style: "currency", currency: "ZAR" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type Selector */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            type === "income" ? "bg-success text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          <Plus size={20} /> Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            type === "expense" ? "bg-error text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          <Minus size={20} /> Expense
        </button>
      </div>

      {/* Amount */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="0.00"
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {amount > 0 && <div className="text-sm text-muted-foreground">You entered: {formatRands(amount)}</div>}

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Description */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Submit */}
      <button
        type="submit"
        className={`w-full py-3 rounded-lg font-semibold text-white transition-opacity ${
          type === "income" ? "bg-success hover:opacity-90" : "bg-error hover:opacity-90"
        }`}
      >
        Add {type === "income" ? "Income" : "Expense"}
      </button>
    </form>
  );
}
