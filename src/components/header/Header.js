import React from 'react';

export default function Header(){     
    /*----------------------------
    Sign out function
    -----------------------------*/
    const signOut = ()=>{
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("ID");
        localStorage.removeItem("USER");
    }
    
    return(
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#/" className="nav-link" data-widget="pushmenu">
                        <i className="fas fa-bars"></i>
                    </a>                    
                </li>                
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/" 
                        className="nav-link"
                        onClick = {()=>{signOut()}}>
                        <i className="fas fa-sign-out-alt"></i>
                    </a> 
                </li>
            </ul>
        </nav>
    );
}