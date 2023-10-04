import React from 'react';

const PrivacyPolicy = () => {
    const privacySections = [
        {
            sectionTitle: "1. Information We Collect",
            content: "We gather data, such as your name, email address, and other contact details, when you willingly provide this information through our website.",
        },
        {
            sectionTitle: "2. How We Use Your Information",
            content: "We make use of your personal information for various purposes, including responding to your inquiries, providing details about our products and services, and enhancing our website's content and functionality.",
        },
        {
            sectionTitle: "3. Cookies and Other Tracking Technologies",
            content: "Our website employs cookies and similar tracking technologies to collect data concerning your website usage. This data may include your IP address, browser type, operating system, and device-related information. We utilize this data to improve our website's content and functionality and to personalize your browsing experience.",
        },
        {
            sectionTitle: "4. Sharing Your Information",
            content: "We highly value your privacy and do not sell or disclose your personal information to third parties, except when required by law or to fulfill your requests.",
        },
        {
            sectionTitle: "5. Security Measures",
            content: "We implement reasonable security measures to safeguard your personal information against unauthorized access, disclosure, or use.",
        },
        {
            sectionTitle: "6. Children’s Privacy",
            content: "Our website is not designed for individuals under the age of 13. We do not knowingly collect personal information from those under 13 years of age.",
        },
        {
            sectionTitle: "7. Changes to this Privacy Policy",
            content: "We may periodically update this Privacy Policy. Any updates will be published on our website, and we will indicate the date of the most recent revision.",
        },
        {
            sectionTitle: "8. Contact Us",
            content: "If you have any questions or concerns regarding this Privacy Policy, please feel free to get in touch with us at sellifyappshq@gmail.com.",
        }
    ];


    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Privacy Policy for YourPDF.chat</h1>
            <p style={styles.intro}>Welcome to YourPDF.chat. Your privacy is important to us, and we are committed to safeguarding your personal information. This Privacy Policy outlines how we gather, utilize, and disclose your personal data when you interact with our website. By using our services, you agree to the terms laid out in this policy.</p>
            {privacySections.map((section, index) => (
                <div key={index}>
                    <h2 style={styles.sectionTitle}>{section.sectionTitle}</h2>
                    <p style={styles.content}>{section.content}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        marginTop: '0',
        color: '#fff',
    },
    intro: {
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#fff',
    },
    sectionTitle: {
        fontSize: '18px',
        marginTop: '20px',
        color: '#fff',
    },
    content: {
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#fff',
    },
};

export default PrivacyPolicy;
