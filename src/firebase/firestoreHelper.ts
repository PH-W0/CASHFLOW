import { db } from "./firebaseConfig";
import { collection, addDoc, query, where, getDocs, onSnapshot, Timestamp, or, orderBy } from "firebase/firestore";

// Transaction interface
export interface Transaction {
  id?: string; // Firestore doc ID
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  userId: string; // always a string (Firebase UID)
  createdAt: Timestamp;
}

// Add a transaction
export const addTransactionToFirestore = async (transactions: Omit<Transaction, "id" | "createdAt">, uid: string) => {
  const docRef = await addDoc(collection(db, "transaction"), {
    ...transactions,
    userId: uid,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

// Get all transactions for a specific user (once)
export const getTransactionsForUser = async (uid: string) => {
  const q = query(collection(db, "transaction"), where("userId", "==", uid), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
};

// Real-time listener for a user's transactions
export const subscribeToTransactions = (uid: string, callback: (transactions: Transaction[]) => void) => {
  const q = query(collection(db, "transaction"), where("userId", "==", uid), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const result: any[] = [];
    snapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(result);
  });
};
