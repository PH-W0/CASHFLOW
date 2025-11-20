import { useState, useEffect } from "react";
import { RotateCw } from "lucide-react";
import type { Transaction } from "../context/TransactionContext"; 

interface AutoRefreshWidgetProps {
  transactions: Transaction[];
}

export function AutoRefreshWidget({ transactions }: AutoRefreshWidgetProps) {
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
      setLastRefresh(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setRefreshCount((prev) => prev + 1);
    setLastRefresh(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground">
          Live Transaction Feed
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            Updated: {formatTime(lastRefresh)}
          </span>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-lg transition-all ${
              isRefreshing
                ? "bg-primary/20 text-primary animate-spin"
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            }`}
            title="Refresh now"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">
            Total Transactions
          </p>
          <p className="text-2xl font-bold text-foreground">
            {transactions.length}
          </p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Auto-Refreshes</p>
          <p className="text-2xl font-bold text-primary">{refreshCount}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 ? (
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">
                  {transaction.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold text-sm ${
                    transaction.type === "income"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          <p>No transactions to display</p>
        </div>
      )}

      {/* Widget Info */}
      <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          This widget automatically refreshes every 10 seconds and displays your
          5 most recent transactions.
        </p>
      </div>
    </div>
  );
}
