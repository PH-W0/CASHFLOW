import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Transaction } from "../context/TransactionContext";

export interface DueDateTimerProps {
  transaction: Transaction;
}

export default function DueDateTimer({ transaction }: DueDateTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!transaction.dueDate) return;

      const now = new Date().getTime();
      const due = new Date(transaction.dueDate).getTime();
      const diff = due - now;

      if (diff <= 0) {
        setTimeLeft("Overdue");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [transaction.dueDate]);

  return (
    <div className="p-4 bg-card shadow-sm rounded-xl flex items-center justify-between border border-border">
      <div>
        <p className="font-semibold">{transaction.category}</p>
        {transaction.description && (
          <p className="text-sm text-muted-foreground">{transaction.description}</p>
        )}

        <p className="text-xs text-muted-foreground mt-1">
          Due: {new Date(transaction.dueDate!).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        <p
          className={`font-bold ${
            timeLeft === "Overdue" ? "text-destructive" : "text-primary"
          }`}
        >
          {timeLeft}
        </p>
      </div>
    </div>
  );
}
