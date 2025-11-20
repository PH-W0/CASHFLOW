import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import type { Transaction } from "../context/TransactionContext";

interface DueDateTimerProps {
  transaction: Transaction;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
}

export function DueDateTimer({ transaction }: DueDateTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOverdue: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!transaction.dueDate) return;

      const now = new Date();
      const dueDate = new Date(transaction.dueDate);
      const diff = dueDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOverdue: true,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          isOverdue: false,
        });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [transaction.dueDate]);

  const urgency =
    timeRemaining.days === 0 && !timeRemaining.isOverdue
      ? "critical"
      : timeRemaining.days <= 3
        ? "warning"
        : "normal";

  const bgColor =
    timeRemaining.isOverdue || urgency === "critical"
      ? "bg-destructive/10 border-destructive/30"
      : urgency === "warning"
        ? "bg-warning/10 border-warning/30"
        : "bg-secondary/30 border-border/40";

  const textColor =
    timeRemaining.isOverdue || urgency === "critical"
      ? "text-destructive"
      : urgency === "warning"
        ? "text-warning"
        : "text-foreground";

  return (
    <div className={`${bgColor} border rounded-xl p-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="font-medium text-sm text-foreground truncate">
            {transaction.description}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ${transaction.amount.toFixed(2)}
          </p>
        </div>
        {timeRemaining.isOverdue ? (
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 ml-2" />
        ) : (
          <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
        )}
      </div>

      {timeRemaining.isOverdue ? (
        <div className="text-center">
          <p className="text-sm font-bold text-destructive">OVERDUE</p>
          <p className="text-xs text-destructive/80 mt-1">Payment is late</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-background/60 rounded-lg p-2">
            <p className={`text-sm font-bold ${textColor}`}>
              {timeRemaining.days}
            </p>
            <p className="text-xs text-muted-foreground">Days</p>
          </div>
          <div className="bg-background/60 rounded-lg p-2">
            <p className={`text-sm font-bold ${textColor}`}>
              {String(timeRemaining.hours).padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground">Hrs</p>
          </div>
          <div className="bg-background/60 rounded-lg p-2">
            <p className={`text-sm font-bold ${textColor}`}>
              {String(timeRemaining.minutes).padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground">Min</p>
          </div>
          <div className="bg-background/60 rounded-lg p-2">
            <p className={`text-sm font-bold ${textColor}`}>
              {String(timeRemaining.seconds).padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground">Sec</p>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Due: {new Date(transaction.dueDate!).toLocaleDateString()}
      </p>
    </div>
  );
}
