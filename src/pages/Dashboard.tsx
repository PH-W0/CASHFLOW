import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { Plus } from "lucide-react";

export function Dashboard() {
  const history = useHistory();
  const { transactions, income, expenses, netIncome } = useTransactions();

  return (
    <IonPage>
      <IonContent fullscreen className="bg-background">
        <div className="px-4 pt-6 pb-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Overview of your finances
              </p>
            </div>
            <button
              onClick={() => history.push("/add-transaction")}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90"
            >
              <Plus size={16} /> Add Transaction
            </button>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-success/10 p-4 rounded-xl text-center">
              <p className="text-muted-foreground text-sm">Income</p>
              <p className="font-bold text-success">R{income.toFixed(2)}</p>
            </div>
            <div className="bg-error/10 p-4 rounded-xl text-center">
              <p className="text-muted-foreground text-sm">Expenses</p>
              <p className="font-bold text-error">R{expenses.toFixed(2)}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-xl text-center">
              <p className="text-muted-foreground text-sm">Net</p>
              <p className="font-bold text-primary">R{netIncome.toFixed(2)}</p>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No transactions yet.
              </p>
            ) : (
              transactions.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center p-4 bg-card rounded-xl shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{t.category}</p>
                    {t.description && (
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(t.date).toLocaleDateString()}
                      {t.dueDate
                        ? ` | Due: ${new Date(t.dueDate).toLocaleDateString()}`
                        : ""}
                    </p>
                  </div>
                  <p
                    className={`font-bold ${
                      t.type === "income" ? "text-success" : "text-error"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} R{t.amount.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
