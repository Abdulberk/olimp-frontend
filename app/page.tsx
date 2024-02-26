'use client';
import Image from "next/image";
import AccountSummary from "./_components/account-summary";
import styles from "./homepage.module.scss";
import RecentTransactions from "./_components/recent-transactions";
import { useGetRecentTransactionsQuery } from "./_api/useGetRecentTransactionsQuery";
import { useState } from "react";



export default function Home() {
  const [personId, setPersonId] = useState(10);
  const { data, isLoading, isError } = useGetRecentTransactionsQuery(personId);




  return (
    <main className = {styles.container} >
      <AccountSummary />
      <RecentTransactions transactions={data} />
    </main>
  );
}
