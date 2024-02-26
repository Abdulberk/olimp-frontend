import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';


interface TransactionProps {
    name: string,
    amount: string,
    date: string,
    sender: boolean
}

const Transaction = ({
    name,
    amount,
    date,
    sender
}:TransactionProps) => {
    return (
        <li className = {styles.transaction} >  
            <div className = {styles.leftSide}>
            <div className = {styles.avatar}>
                <img src="../../../public/recent-transactions/receiver.png" alt = "avatar" />
            </div>
                <div className={styles.infoContainer}>
                    <p className={styles.paymentToName}>{
                        sender ? <span>
                            Payment sent to {name}
                        </span>
                        : <span>
                            Payment received from {name}
                        </span>
                    }</p>
                    <p className={styles.paymentDate}>{date}</p>
                </div>
            </div>
            <p className={styles.amount}>{amount}</p>
        </li>

    )

}

const transactions = [
    { id: 1, name: "John Doe", amount: "-$700.00", date: "12/12/2021",sender:false},
    { id: 2, name: "John Doe", amount: "-$100.00", date: "12/12/2022",sender:true },
    { id: 3, name: "John Doe", amount: "+$40.00", date: "12/12/2024",sender:false },
]



const RecentTransactions = () => {
    return (
        <section className = {styles.container}>
            <h2>
                Recent Transactions
            </h2>
            <ul className = {styles.transactionsList}>
                {transactions.map((transaction, index) => (
                    <Transaction key={index} name={transaction.name} amount={transaction.amount} date={transaction.date} sender={transaction.sender} />
                ))}
            </ul>
        </section>
    )
}

export default RecentTransactions;
