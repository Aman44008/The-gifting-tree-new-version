import React,{useState} from 'react'
import './NewsLetter.css';

export const NewsLetter = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    setMessage('Thank you for subscribing us!');
  };

  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" value={email}  id="email" name="" placeholder='Your Email id' onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>Subscribe</button>
        </div>
        <p className='message'>{message}</p>
    </div>
  )
}
