import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Currency } from "../account-summary";

export interface Transaction {
  id?: number;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  sender: {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };
  receivers: {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
}

const Transaction = ({
  sender,
  amount,
  createdAt,
  status,
  receivers,
}: Transaction) => {
  const paymentToName = receivers.map((receiver) => receiver.name).join(", ");

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatCurrency = (amount: number, selectedCurrency: Currency) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: selectedCurrency || Currency.USD,
    });
  };

  return (
    <li className={styles.transaction}>
      <div className={styles.leftSide}>
        <div className={styles.avatar}>
          <img src="/recent-transactions/receiver.png" alt="avatar" />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.paymentToName}>
            {"Payment to " + paymentToName}
          </p>
          <p className={styles.paymentDate}>{formatDate(createdAt)}</p>
        </div>
      </div>
      <p className={styles.amount}>
        {formatCurrency(parseFloat(amount), Currency.USD)}
      </p>
    </li>
  );
};

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <section className={styles.container}>
      <h2>Recent Transactions</h2>
      <ul className={styles.transactionsList}>
        {transactions?.map((transaction, index) => (
          <Transaction
            key={index}
            sender={transaction.sender}
            amount={transaction.amount}
            createdAt={transaction.createdAt}
            status={transaction.status}
            receivers={transaction.receivers}
          />
        ))}
      </ul>
    </section>
  );
};

export default RecentTransactions;
