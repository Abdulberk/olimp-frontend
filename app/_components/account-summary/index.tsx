"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "../modal";
import { useGetUserBalance } from "./api/useGetUserBalance";
import ClipLoader from "react-spinners/ClipLoader";


export enum Currency {
    USD = "USD",
    GBP = "GBP",
    EUR = "EUR",
    }


const AccountSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useGetUserBalance(10);

  const handleClose = () => {
    setIsOpen(false);
  };

  

  const formatCurrency = (amount: number,selectedCurrency:Currency) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: selectedCurrency || Currency.USD,
        
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
                formatCurrency(data?.balance || 0,data.currency)
              )}
            </p>
            <p className={styles.subText}>
              {isLoading
                ? "Loading..."
                : isError
                ? "Error fetching balance"
                : `Available balance in ${data.currency} `}
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(true)}>Send Money</button>
        <Modal isOpen={isOpen} onClose={() => handleClose} senderId={10} />
      </div>

      <div className={styles.accountBalance}>
        <h3>Account Balance</h3>
        <span className={styles.progressBar}></span>
        <p className={styles.balance}>{
            formatCurrency(data?.balance || 0,data?.currency)
        }</p>
        <p className={styles.balance}>
          You have {
            formatCurrency(data?.balance || 0,data?.currency)
          } in your account. This includes your
          available balance and any pending transactions.
        </p>
      </div>
    </section>
  );
};

export default AccountSummary;
