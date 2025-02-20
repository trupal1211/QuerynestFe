import React, { useState, useEffect, useRef } from 'react';
import styles from './Leaderboard.module.css'
import {UserRow} from '../components'

function Leaderbord(){


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('General Query');
  const [dropDirection, setDropDirection] = useState('down'); // 'down' or 'up'
  const dropdownRef = useRef(null);

  const options = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS Modules', 'HTML', 'TypeScript'];

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown
  };

  // Toggle dropdown and calculate direction (above or below)
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (dropdownRef.current) {
      const { bottom, height } = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setDropDirection(bottom + height > windowHeight ? 'up' : 'down');
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


 
  return(
    <>
      <div className='main_container bg-white'>

      <div className={styles.container} ref={dropdownRef}>

      {/* Button to open dropdown */}
      <button className={styles.button} onClick={toggleDropdown}>
        {selectedOption} 
        <span className={isOpen ? styles.arrowUp : styles.arrowDown}>&#9662;</span>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <ul className={`${styles.list} ${dropDirection === 'up' ? styles.listUp : styles.listDown}`}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.item} ${option === selectedOption ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>

        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        <UserRow/>
        
      </div>
    </>
  )
}

export default Leaderbord