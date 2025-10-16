import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="brand-icon">💬</div>
          <span className="brand-text">Branch International</span>
        </div>
        <div className="navbar-actions">
          <button className="nav-btn">📋</button>
          <button className="nav-btn">🔔</button>
          <button className="nav-btn">⏰</button>
          <div className="user-avatar">👤</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar