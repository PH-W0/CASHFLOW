import { IonPage, IonContent } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { Plus, Minus, Calendar } from "lucide-react";

const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Bonus", "Gift", "Other"];
const EXPENSE_CATEGORIES = ["Food", "Transportation", "Entertainment", "Utilities", "Shopping", "Healthcare", "Other"];

export function AddTransaction() {
  const history = useHistory();
  const { addTransaction } = useTransactions();

  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>(""); // <-- new due date state

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category) {
      alert("Please fill in all required fields");
      return;
    }

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined, // optional
    });

    setAmount("");
    setCategory("");
    setDescription("");
    setDueDate("");

    history.push("/dashboard");
  };

  return (
    <IonPage>
     <IonContent fullscreen className="bg-background">
  <div className="px-4 pt-6 pb-20">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Add Transaction</h1>
            <p className="text-muted-foreground text-sm">Record a new income or expense</p>
          </div>

          {/* Type Selector */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => { setType("income"); setCategory(""); }}
              className={`flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${type === "income" ? "bg-success text-white" : "bg-muted text-muted-foreground"}`}
            >
              <Plus size={20} /> Income
            </button>
            <button
              onClick={() => { setType("expense"); setCategory(""); }}
              className={`flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${type === "expense" ? "bg-error text-white" : "bg-muted text-muted-foreground"}`}
            >
              <Minus size={20} /> Expense
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Amount *</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-lg text-muted-foreground">R</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add notes about this transaction..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Optional Due Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Calendar size={16} /> Optional Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => history.push("/dashboard")}
                className="flex-1 px-4 py-3 rounded-lg border border-input text-foreground font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-3 rounded-lg text-white font-semibold transition-opacity ${type === "income" ? "bg-success hover:opacity-90" : "bg-error hover:opacity-90"}`}
              >
                Add {type === "income" ? "Income" : "Expense"}
              </button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
