import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  dueDate?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  income: number;
  expenses: number;
  netIncome: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (isLoading || !user) {
      setTransactions([]);
      return;
    }

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      setTransactions(data);
    });

    return () => unsubscribe();
  }, [user, isLoading]);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "transactions"), {
        ...transaction,
        userId: user.id,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = income - expenses;

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, income, expenses, netIncome }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("useTransactions must be used within TransactionProvider");
  return context;
}
