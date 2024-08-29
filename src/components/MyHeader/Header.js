import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './Header.css';

function Header() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Récupérer les données utilisateur depuis localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.userName);  // Assurez-vous que "username" correspond au champ dans vos données utilisateur
            console.log(user);
        }
    }, []);

    return (
        <main className="main-content">
            <header>
                <div className="search-box">
                    <input type="text" placeholder="Search" />
                    <i className="fas fa-search search-icon"></i>
                </div>
                <div className="admin">
                    <i className="fas fa-user-shield"></i> 
                    <span>{username ? username : 'Admin'}</span> {/* Affiche le nom de l'utilisateur */}
                </div>
            </header>
        </main>
    );
}

export default Header;