'use client';
import React, {useState,useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import Wallet from "../../../public/account-summary/wallet.svg"
import Modal from '../modal';
import { useGetUserBalance } from './api/useGetUserBalance';
import ClipLoader from "react-spinners/ClipLoader";

const AccountSummary = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data, isLoading, isError} = useGetUserBalance(10);
    




    const handleClose = () => {
        setIsOpen(false);
    }



    return (
        <section className = {styles.container}>
            <h1>
                Your account
            </h1>
            <div className = {styles.account} >
                <div className = {styles.leftSection}>
                    <div className = {styles.item}>
                    <div className = {styles.icon}>
                    <Image src={Wallet} alt="wallet" width={0} height={0} />
                    </div>
                    </div>
                    
                      <div className = {styles.amountContainer}>
                            <p className={styles.amount}>
                                {
                                    
                                    isLoading ? <ClipLoader color={"#123abc"}  size={22} /> : isError ? "Error fetching balance" : data?.balance
                                      

                                }
                            

                            </p>
                            <p className={styles.subText}>{
                                isLoading ? "Loading..." : isError ? "Error fetching balance" : "Available Balance"
                            }
                            </p>
                        </div>  
                </div>
                <button onClick={() => setIsOpen(true)} >
                    Send Money
                </button>
                <Modal isOpen={isOpen} onClose={()=>handleClose} senderId= {10}/>

           
            </div>

            <div className = {styles.accountBalance}>
                    <h3>Account Balance</h3>
                    <span className = {styles.progressBar}></span>
                    <p className = {styles.balance}>{data?.balance || 0
                    }</p>
                    <p className = {styles.balance}>You have {data?.balance || 0} in your account. This includes your available balance and any pending transactions.
                    </p>
    
            </div>

        </section>
    );
}

export default AccountSummary;
