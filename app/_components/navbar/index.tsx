'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Bell from "../../../public/navbar/bell.svg"  
import Logo from "../../../public/navbar/olimp-logo.svg"
import Search from "../../../public/navbar/search.svg"
import styles from './styles.module.scss';



const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Transactions', path: '/transactions' },
    { title: 'Payments', path: '/payments' },
    { title: 'Cards', path: '/cards' },
    
    ];


const tools = [
    { id: 1, icon: Search },
    { id: 2, icon: Bell },
  
    ];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className = {styles.innerContainer}>
            <div className = {styles.logo} >
                <Image src={Logo} alt="Olimp Logo" />

            </div>

            <div className = {styles.rightSection}> 
                <ul className={styles.navLinks}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.path}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className = {styles.toolsContainer}>
                    {tools.map((tool, index) => (
                        <div key={index} className = {styles.item}>
                            <Image src={tool.icon} alt="tool" />
                        </div>
                    ))}
                    </div>

                    <div className = {styles.profileContainer}>
                       <Image src="/navbar/samp1.png" alt="profile" width={0} height={0} layout="responsive" />
                        </div>
            </div>

            </div>
     
    </nav>
  );
}