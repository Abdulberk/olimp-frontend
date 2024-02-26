"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useGetRecipients } from "./api/useGetRecipientsQuery";
import { useMultipleTransactionMutation } from "./api/useMultipleTransactionMutation";
import ClipLoader from "react-spinners/ClipLoader";

interface Person {
  id: number;
  name: string;
}

interface PersonCardProps {
  person: Person;
  selected: boolean;
  onClick: () => void;
}

const PersonCard = ({ person, selected, onClick }: PersonCardProps) => {
  return (
    <div
      className={`${styles.person} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.leftSide}>
        <div className={styles.avatar}>
          <img src="/recent-transactions/receiver.png" alt="avatar" />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.name}>{person.name}</p>
          <p className={styles.userId}>{person.id}</p>
        </div>
      </div>
      <input type="checkbox" checked={selected} onChange={onClick} />
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderId: number;
}

const Modal = ({ isOpen, onClose, senderId }: ModalProps) => {
  const [amount, setAmount] = useState(0);
  const [selectedPersonIds, setSelectedPersonIds] = useState<number[]>([]);
  const [persons, setPersons] = useState([]);
  const { data, isLoading, isError } = useGetRecipients();
  const sendMoney = useMultipleTransactionMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChecBoxChange = (id: number) => {
    if (selectedPersonIds.includes(id)) {
      setSelectedPersonIds(
        selectedPersonIds.filter((personId) => personId !== id)
      );
    } else {
      setSelectedPersonIds([...selectedPersonIds, id]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    sendMoney
      .mutateAsync({ receiverIds: selectedPersonIds, amount, senderId })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    if (data) {
      setPersons(data);
    }
  }, [data]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.modalContainer}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className={styles.innerContainer}
            ref={modalRef}
          >
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <h1>Select persons to send money</h1>
              <div className={styles.personsContainer}>
                {persons?.filter((person:Person) => person.id !== senderId).map((person:Person) => (
                  <PersonCard
                  key={person.id}
                  person={person}
                  selected={selectedPersonIds.includes(person.id)}
                  onClick={() => handleChecBoxChange(person.id)}
                />
                  
                ))}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="amount">Amount</label>
                  <input
                    id="amount"
                    type="text"
                    value={amount}
                    disabled={isSubmitting}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
               
              </div>
              <button
                onClick={handleSubmit}
                disabled={
                  isSubmitting || selectedPersonIds.length === 0 || amount === 0
                }
              >
                {isSubmitting ? (
                  <ClipLoader color={"#123abc"} size={22} />
                ) : (
                  "Send Money"
                )}
              </button>

              <div className={styles.statusContainer}>
                {sendMoney.isError && (
                  <p className={styles.error}>
                    {sendMoney.error.message || "Error sending money"}
                  </p>
                )}
                {sendMoney.isSuccess && (
                  <p className={styles.success}>
                    Money sent successfully to {selectedPersonIds.length}{" "}
                    people.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
