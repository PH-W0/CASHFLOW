import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { useTransactions } from "../context/TransactionContext";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { DueDateTimer } from "../components/DueDate.Timer"; // <-- import

export function Dashboard() {
  const { transactions, income, expenses, netIncome } = useTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <IonContent fullscreen className="bg-background">
      <div className="px-4 pt-6 pb-20">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Balance Cards */}
        <div className="space-y-3 mb-8">
          {/* Net Income */}
          <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Net Income</p>
                <h2 className="text-3xl font-bold">
                  {formatCurrency(netIncome)}
                </h2>
              </div>
              <div className="bg-card/20 rounded-full p-3">
                <DollarSign size={24} />
              </div>
            </div>
          </div>

          {/* Income */}
          <div className="bg-success/10 rounded-2xl p-6 border border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success mb-1">Income</p>
                <h3 className="text-2xl font-bold text-success">
                  {formatCurrency(income)}
                </h3>
              </div>
              <div className="bg-success/20 rounded-full p-3">
                <TrendingUp size={24} className="text-success" />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-error/10 rounded-2xl p-6 border border-error/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-error mb-1">Expenses</p>
                <h3 className="text-2xl font-bold text-error">
                  {formatCurrency(expenses)}
                </h3>
              </div>
              <div className="bg-error/20 rounded-full p-3">
                <TrendingDown size={24} className="text-error" />
              </div>
            </div>
          </div>
        </div>

        {/* View Timers Button */}
        <div className="mb-6">
          <Link
            to="/timers"
            className="block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-center cursor-pointer transition-colors"
          >
            View Timers
          </Link>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              Recent Transactions
            </h3>

            {transactions.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {transactions.length} total
              </p>
            )}
          </div>

          {transactions.length === 0 ? (
            <div className="bg-muted/30 rounded-2xl p-8 text-center border border-border">
              <DollarSign
                size={48}
                className="mx-auto text-muted-foreground mb-3 opacity-50"
              />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add your first transaction to get started
              </p>
            </div>
          ) : (
            <IonList className="space-y-2">
              {recentTransactions.map((transaction) => (
                <IonItem
                  key={transaction.id}
                  lines="none"
                  className="rounded-xl bg-card border border-border hover:border-primary/30 transition-colors p-3"
                  routerLink="/timers"
 // <-- use this for navigation
                >
                  <div className="flex items-center justify-between w-full">
                    {/* Left section */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`rounded-full p-2 ${
                          transaction.type === "income"
                            ? "bg-success/20"
                            : "bg-error/20"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp size={16} className="text-success" />
                        ) : (
                          <TrendingDown size={16} className="text-error" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {transaction.category}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <p
                      className={`font-bold text-sm ${
                        transaction.type === "income"
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                   {/* Due Date Timer */}
                      <div>
                    {transaction.dueDate && <DueDateTimer transaction={transaction} />}
                  </div>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>
       </div>
</IonContent>
  );
}
