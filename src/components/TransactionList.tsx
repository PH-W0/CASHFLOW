import React from "react";
import { Transaction } from "../context/TransactionContext";
import DueDateTimer from "../components/DueDate.Timer";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="p-4 bg-card rounded-xl shadow-sm border border-border"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{t.category}</p>
              {t.description && (
                <p className="text-sm text-muted-foreground">
                  {t.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(t.date).toLocaleDateString()}
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

          {/* Show Timer Only If Transaction Has Due Date */}
          {t.dueDate && (
            <div className="mt-3">
              <DueDateTimer transaction={t} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
