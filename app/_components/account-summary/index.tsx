"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "../modal";
import { useGetUserBalance } from "./api/useGetUserBalance";
import ClipLoader from "react-spinners/ClipLoader";

const AccountSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useGetUserBalance(10);

  const handleClose = () => {
    setIsOpen(false);
  };


  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }



  return (
    <section className={styles.container}>
      <h1>Your account</h1>
      <div className={styles.account}>
        <div className={styles.leftSection}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <img src="/account-summary/wallet.svg" alt="wallet" />
            </div>
          </div>

          <div className={styles.amountContainer}>
            <p className={styles.amount}>
              {isLoading ? (
                <ClipLoader color={"#123abc"} size={22} />
              ) : isError ? (
                "Error fetching balance"
              ) : (
                formatCurrency(data?.balance || 0)
              )}
            </p>
            <p className={styles.subText}>
              {isLoading
                ? "Loading..."
                : isError
                ? "Error fetching balance"
                : "Available Balance"}
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(true)}>Send Money</button>
        <Modal isOpen={isOpen} onClose={() => handleClose} senderId={10} />
      </div>

      <div className={styles.accountBalance}>
        <h3>Account Balance</h3>
        <span className={styles.progressBar}></span>
        <p className={styles.balance}>{data?.balance || 0}</p>
        <p className={styles.balance}>
          You have {data?.balance || 0} in your account. This includes your
          available balance and any pending transactions.
        </p>
      </div>
    </section>
  );
};

export default AccountSummary;
