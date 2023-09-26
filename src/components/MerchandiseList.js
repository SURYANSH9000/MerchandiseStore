import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import MerchandiseData from './MerchandiseData';
import './MerchandiseList.css';

const MerchandiseList = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to show all items
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const history = useHistory();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const signOut = async () => {
    try {
      await auth.signOut();
      // Redirect or perform actions upon successful sign out
      history.push('/'); // Redirect to the home page or another page
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'merchandise'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMerchandise(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="merchandise-list">
      <div className="top-right-options">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcU50X1UOeDaphmUyD6T8ROKs-HjeirpOoapiWbC9cLAqewFy1gthrgUTB9E7nKjRwOVk&usqp=CAU"
          alt="Profile"
          width="40"
          height="40"
          style={{ cursor: 'pointer' }}
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <Link to="/my-orders">My Orders</Link>
              </li>
              <li>
                <button onClick={signOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="left-column">
      <h2>Categories</h2>
        <button
          className={`category-button ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        <button
          className={`category-button ${selectedCategory === 'Kids' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Kids')}
        >
          Kids
        </button>
        <button
          className={`category-button ${selectedCategory === 'Men' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Men')}
        >
          Men
        </button>
        <button
          className={`category-button ${selectedCategory === 'Women' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Women')}
        >
          Women
        </button>
      </div>
      {/* Right-hand column for merchandise items */}
      <div className="right-column">
        {/* <h2>Merchandise Available</h2> */}
        {/* Display merchandise items based on the selected category */}
        {MerchandiseData.map((item) => {
          // Check if the item matches the selected category or if 'All' is selected
          if (selectedCategory === 'All' || item.category === selectedCategory) {
            return (
      <Link to={`/merchandise/${item.id}`} key={item.id} className="merchandise-item">
        {/* Rest of the merchandise item content */}
        <img src={item.imageURL} alt={item.name} className="merchandise-image" />
        <h2 className="merchandise-title">{item.name}</h2>
        <p className="merchandise-price">Price: ₹{item.price}</p>
      </Link>
            );
          }
          return null; // Hide items that don't match the selected category
        })}
      </div>
    </div>
  );
};

export default MerchandiseList;