import { IonPage, IonContent } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTransactions, Transaction } from "../context/TransactionContext";
import { TransactionForm } from "../components/TransactionForm";

export function AddTransaction() {
  const history = useHistory();
  const { addTransaction } = useTransactions();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (transaction: Omit<Transaction, "id">) => {
    setLoading(true);

    try {
      await addTransaction(transaction); // push to Firestore
      history.push("/dashboard"); // redirect after success
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-background">
        <div className="px-4 pt-6 pb-20">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Add Transaction</h1>
            <p className="text-muted-foreground text-sm">Record a new income or expense</p>
          </div>

          {/* Only the TransactionForm — handles type, amount, category, description, dates */}
          <TransactionForm
            onSubmit={handleSubmit}
            initialData={{
              type: "income",
              amount: 0,
              category: "",
              description: "",
              date: new Date().toISOString(),
              dueDate: "",
            }}
          />

          {/* Cancel Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => history.push("/dashboard")}
              className="w-full px-4 py-3 rounded-lg border border-input text-foreground font-semibold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
