import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";

export interface User{
  uid: string;
  username: string | null;
  email: string | null
}

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
  removeTransaction: (id: string) => Promise<void>;
  income: number;
  expenses: number;
  netIncome: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (isLoading || !user) {
      setTransactions([]);
      return;
    }

    const q = query(
      collection(db, "transaction"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Transaction, "id">),
      }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, [user, isLoading]);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "transaction"), {
        ...transaction,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const removeTransaction = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "transaction", id));
    } catch (error) {
      console.error("Error removing transaction:", error);
    }
  };

  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const netIncome = income - expenses;

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, removeTransaction, income, expenses, netIncome }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransactions must be used within TransactionProvider");
  return context;
}
