import Image from "next/image";
import AccountSummary from "./_components/account-summary";
import styles from "./homepage.module.scss";
import RecentTransactions from "./_components/recent-transactions";
export default function Home() {
  return (
    <main className = {styles.container} >
      <AccountSummary />
      <RecentTransactions />
    </main>
  );
}
