import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

Home.propTypes = {}

export default Home
