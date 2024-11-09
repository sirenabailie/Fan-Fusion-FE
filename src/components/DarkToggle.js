import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function DarkSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check localStorage for the dark mode preference on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('isDarkMode');
    if (savedPreference === 'true') {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  // Toggle dark mode and save the preference to localStorage
  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
      localStorage.setItem('isDarkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('isDarkMode', 'false');
    }
  };

  return (
    <Form className="switcher switcher">
      <div className="sun">
        <i className="fas fa-sun" style={{ color: 'white', fontSize: '16px' }} />
      </div>
      <Form.Check type="switch" id="custom-switch" checked={isDarkMode} onChange={handleToggle} />
      <div>
        <i className="fas fa-moon" style={{ color: '#2f559c', fontSize: '16px' }} />
      </div>
    </Form>
  );
}

export default DarkSwitch;
