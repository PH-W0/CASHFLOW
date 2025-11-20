import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import type { Transaction } from "../context/TransactionContext";

interface TransactionListProps {
  transactions: Transaction[];
  onRemoveTransaction: (id: string) => void;
}

export function TransactionList({
  transactions,
  onRemoveTransaction,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-card border border-border/40 rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">
          No transactions yet. Add one to get started!
        </p>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border/40">
        <h3 className="font-bold text-lg text-foreground">
          Recent Transactions
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40 bg-secondary/20">
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-border/40 hover:bg-secondary/10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`font-bold ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {transaction.date}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onRemoveTransaction(transaction.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Delete transaction"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 border-b border-border/40 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                {transaction.type === "income" ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveTransaction(transaction.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between pl-8">
              <span className="text-xs bg-secondary rounded-full px-2 py-1 text-muted-foreground">
                {transaction.category}
              </span>
              <span
                className={`font-bold ${
                  transaction.type === "income"
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
