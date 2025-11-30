import { IonPage, IonContent } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, PieChart, TrendingUp, TrendingDown } from "lucide-react";
import { useTransactions, Transaction } from "../context/TransactionContext";

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { transactions, addTransaction } = useTransactions();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transaction from context
  useEffect(() => {
    const found = transactions.find((t) => t.id === id) || null;
    setTransaction(found);
    setIsLoading(false);
  }, [id, transactions]);

  const handleDelete = async () => {
    if (!transaction) return;

    // Using Firestore: delete the doc
    try {
      // Import deleteDoc & doc from firebase/firestore in your context file
      // We'll assume TransactionContext handles real-time updates after deletion
      await addTransaction({ ...transaction, _delete: true } as any);
      history.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      alert("Could not delete transaction. Try again.");
    }
  };

  if (isLoading) {
    return (
      <IonPage>
        <IonContent className="flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (!transaction) {
    return (
      <IonPage>
        <IonContent className="bg-background px-4 py-6">
          <button
            onClick={() => history.push("/dashboard")}
            className="p-2 hover:bg-muted rounded-lg transition-colors mb-4"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <p className="text-muted-foreground">Transaction not found</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="bg-background px-4 pt-6 pb-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => history.push("/dashboard")}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Transaction</h1>
          </div>
        </div>

        {/* Transaction Card */}
        <div className="bg-card border border-border/40 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {transaction.description}
              </h2>
              <p className="text-muted-foreground mt-1">{transaction.category}</p>
            </div>

            <div className="flex flex-col items-end">
              {transaction.type === "income" ? (
                <TrendingUp className="w-7 h-7 text-success" />
              ) : (
                <TrendingDown className="w-7 h-7 text-destructive" />
              )}

              <p
                className={`text-3xl font-bold mt-2 ${
                  transaction.type === "income" ? "text-success" : "text-destructive"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Type</p>
              <p className="font-medium text-foreground capitalize">
                {transaction.type}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="font-medium text-foreground">
                {new Date(transaction.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {transaction.dueDate && (
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                <p className="font-medium text-foreground">
                  {new Date(transaction.dueDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full py-3 bg-destructive text-destructive-foreground rounded-xl font-medium hover:bg-destructive/90 transition-colors"
        >
          Delete Transaction
        </button>
      </IonContent>
    </IonPage>
  );
}
