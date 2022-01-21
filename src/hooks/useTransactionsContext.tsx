import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  category: string;
  type: string;
  amount: number;
  createdAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionProviderData {
  transactions: Transaction[];
  createTransaction: (transcation: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionProviderData>(
  {} as TransactionProviderData
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("http://localhost:3000/api/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
      const { data } = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
      });
      
      setTransactions([...transactions, data.transaction]);

  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children} 
    </TransactionsContext.Provider>
  );
}

export function useTransactions() { 
  const context = useContext(TransactionsContext);

  return context;

}
