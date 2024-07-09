import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputWithLabel = ({ label, id, ...props }: InputWithLabelProps) => (
    <div className={styles.registerFormInput}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} />
    </div>
);

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        ordinalAddress: '',
        ethAddress: '',
        btcPaymentAddress: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.ordinalAddress || !formData.ethAddress) {
            setError('Ordinal BTC address and ETH wallet address are required.');
            return;
        }

        try {
            console.log(formData)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Adjust content type as needed
                },
                body: JSON.stringify(formData) // Convert data to JSON string
            };
            const response = await fetch('http://localhost:3000/registerationToOrdinals', options);
            console.log('Form submitted successfully:', response.status);
            setError('');
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form. Please try again.');
            console.log("error here?")
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <InputWithLabel
                id='ordinalAddress'
                type="text"
                name="ordinalAddress"
                value={formData.ordinalAddress}
                onChange={handleChange}
                required
                label='Ordinal BTC Address'
            />

            <InputWithLabel
                type="text"
                name="ethAddress"
                value={formData.ethAddress}
                onChange={handleChange}
                required
                label="ETH Wallet Address"
            />


            <InputWithLabel
                type="text"
                name="btcPaymentAddress"
                value={formData.btcPaymentAddress}
                onChange={handleChange}
                label="BTC Payment Address (optional)"
            />


            {error && <p className="error-message">{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;