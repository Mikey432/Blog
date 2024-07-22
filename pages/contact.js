import React, { useState } from 'react'
import styles from '../styles/contact.module.css'

const Contact = () => {
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [phone, setphone] = useState()
  const [desc, setdesc] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    async function postJSON(data) {
      try {
        const response = await fetch("http://localhost:3000/api/postContact/", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.text();
        alert("Thanks for Contacting Us")
        setname('')
        setemail('')
        setphone('')
        setdesc('')
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const data = { name,email,phone,desc };
    postJSON(data);
  }

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    else if (e.target.name == 'desc') {
      setdesc(e.target.value)
    }
  }

  return (
    <div>
      <h1 className={styles.center}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input name='name' type="text" className={styles.input} id="name" aria-describedby="emailHelp" placeholder="Enter name" value={name} onChange={handleChange} />
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="email">Email address</label>
          <input name='email' type="email" className={styles.input} id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleChange} />
          <small id="email" className={styles.small}>We'll never share your email with anyone else.</small>
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="phone">Phone</label>
          <input name='phone' type="text" className={styles.input} id="phone" aria-describedby="emailHelp" placeholder="Enter Phone number" value={phone} onChange={handleChange} />
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="desc">Desc</label>
          <input name='desc' type="text" className={styles.input} id="desc" placeholder="Enter your Concern" value={desc} onChange={handleChange} />
        </div>

        <button type="submit" className={styles.btn}>Submit</button>
      </form>
    </div>
  )
}

export default Contact