import React from 'react';
import styles from "../styles/page styles/privacy-policy.module.css";
import WDCC_Logo from '../assets/WDCC_Logo.svg';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className={styles.container}>
            <img src={WDCC_Logo} className='h-40' alt="WDCC Logo" />
            <h1 className={styles.h1}>Privacy Policy</h1>
            <h2 className={styles.subtitle}>Privacy Policy for WDCC Passport</h2>
            <p className={styles.effectiveDate}>Effective date: 6th May 2024</p>
            <p className={styles.text}>The Web Development Consulting 
            Club (registered charity), or WDCC, ("we", "us", or "our") 
            operates the Passport web application (the "App"). 
            This page informs you of our policies regarding the collection, use, 
            and disclosure of personal data when you use our App and the choices 
            you have associated with that data.</p>
            <h2 className={styles.infoCollect}>Information Collection and Use</h2>
            <ul>
                <li className={styles.li}>Google Auth</li>
                <p className={styles.litext}>Our App uses Google OAuth for 
                authentication purposes. When you log in using Google OAuth, 
                we collect your Google email and name to create and manage 
                your user account within our system.</p>
                <li className={styles.li}>File Access</li>
                <p className={styles.litext}>If you choose to share files 
                with our service account, we will only access and store those 
                files for the purpose of providing the intended service. 
                We do not access or use these files for any other purpose.</p>
                <li className={styles.li}>Data Security</li>
                <p className={styles.litext}>We prioritize the security of 
                your data and take reasonable steps to protect it 
                from unauthorized access, disclosure, alteration, and destruction.</p>
                <li className={styles.li}>Information Sharing</li>
                <p className={styles.litext}>We do not share your personal 
                information with third parties unless required by law or as 
                necessary to provide our services. Your files shared with 
                our service account are treated with strict confidentiality.</p>
                <li className={styles.li}>Cookies and Tracking</li>
                <p className={styles.litext}>Our App does not use tracking 
                cookies or any other tracking mechanisms.</p>
                <li className={styles.li}>Your Choices</li>
                <p className={styles.litext}>You can choose not 
                to share certain information, but this may 
                limit your ability to use certain features of the App.</p>
                <li className={styles.li}>Changes to This Privacy Policy</li>
                <p className={styles.litext}>We may update our Privacy Policy
                from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page.</p>
                <li className={styles.li}>Contact Us</li>
                <p className={styles.litext}>If you have any questions 
                about this Privacy Policy, please contact us at 
                <i> passport@projects.wdcc.co.nz</i>. By using the App, you agree to the 
                collection and use of information in accordance with this policy.</p>

            </ul>

        </div>
    );
};

export default PrivacyPolicy;