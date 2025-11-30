import { db } from "./firebaseConfig";
import { collection, addDoc, query, where, getDocs, onSnapshot, Timestamp } from "firebase/firestore";

// Transaction interface
export interface Transaction {
  id?: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  userId: string;
  createdAt: Timestamp;
}

// Add a transaction
export const addTransactionToFirestore = async (transaction: Transaction) => {
  const docRef = await addDoc(collection(db, "transactions"), transaction);
  return docRef.id;
};

// Get transactions for a user
export const getTransactionsForUser = async (userId: string) => {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
};

// Real-time listener
export const subscribeToTransactions = (userId: string, callback: (transactions: Transaction[]) => void) => {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  return onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    callback(data);
  });
};
