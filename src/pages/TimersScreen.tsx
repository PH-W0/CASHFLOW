import React, { useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { PieChart, ChevronLeft, AlertCircle, Clock } from "lucide-react";

import { DueDateTimer } from "../components/DueDate.Timer";
import { useAuth } from "../hooks/useAuth";
import type { Transaction } from "../context/TransactionContext"; 

export default function TimersScreen() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!user) return;

    const key = `transactions_${user.id}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");

    setTransactions(stored);
  }, [user]);

  // Only transactions with due dates
  const dueTransactions = transactions.filter((t) => t.dueDate);

  // Count overdue
  const overdueCount = dueTransactions.filter((t) => {
    const due = new Date(t.dueDate!);
    return due < new Date();
  }).length;

  // Count upcoming within 7 days
  const upcomingCount = dueTransactions.filter((t) => {
    const diff = new Date(t.dueDate!).getTime() - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 7;
  }).length;

  return (
    <IonPage>
      <IonContent className="bg-background px-4 pt-6 pb-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Due Date Timers</h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-destructive text-sm font-medium">Overdue</p>
              <h2 className="text-2xl font-bold text-destructive">{overdueCount}</h2>
            </div>
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-yellow-500 text-sm font-medium">Upcoming (7 days)</p>
              <h2 className="text-2xl font-bold text-yellow-500">{upcomingCount}</h2>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* Timers List */}
        <div className="space-y-4">
          {dueTransactions.length === 0 ? (
            <div className="bg-muted/30 rounded-xl border border-border p-8 text-center">
              <Clock className="w-10 h-10 mx-auto text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mt-3">No timers yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add a transaction with a due date to see it here.
              </p>
            </div>
          ) : (
            dueTransactions.map((t) => (
              <DueDateTimer key={t.id} transaction={t} />
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
