'use client';
import React from 'react';
import styles from './styles.module.scss';



const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Transactions', path: '/transactions' },
    { title: 'Payments', path: '/payments' },
    { title: 'Cards', path: '/cards' },
    
    ];


const tools = [
    { id: 1, icon: "/navbar/search.svg" },
    { id: 2, icon: "/navbar/bell.svg" },
  
    ];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className = {styles.innerContainer}>
            <div className = {styles.logo} >
                <img src="/navbar/olimp-logo.svg" alt="Olimp Logo" />

            </div>

            <div className = {styles.rightSection}> 
                <ul className={styles.navLinks}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.path}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className = {styles.toolsContainer}>
                    {tools.map((tool, index) => (
                        <div key={index} className = {styles.item}>
                            <img src={tool.icon} alt="tool" />
                        </div>
                    ))}
                    </div>

                    <div className = {styles.profileContainer}>
                       <img src="/navbar/samp1.png" alt="profile"  />
                        </div>
            </div>

            </div>
     
    </nav>
  );
}