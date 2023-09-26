import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { Link, useHistory, useParams } from 'react-router-dom';
import MerchandiseData from './MerchandiseData'; // Import your merchandise data
import './MerchandiseDetails.css'; // Import a CSS file for styling

const MerchandiseDetails = () => {
  const { id } = useParams(); // Get the merchandise item ID from the URL params
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const history = useHistory();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const signOut = async () => {
    try {
      await auth.signOut();
      // Redirect or perform actions upon successful sign out
      history.push('/signin'); // Redirect to the home page or another page
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  // Find the selected merchandise item based on the ID
  const selectedItem = MerchandiseData.find((item) => item.id.toString() === id);

  if (!selectedItem) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    // Implement logic to add the selected item to the cart
    // You can use state management or any other approach for this
  };

  const handleBuyNow = () => {
    // Implement logic to initiate the purchase process for the selected item
    // You can redirect to a payment page or handle it as needed
  };

  return (
    <div className="merchandise-details">
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
      <div className="image-container">
        <img src={selectedItem.imageURL} alt={selectedItem.name} />
      </div>
      <div className="details-container">
        <h2 className="item-name">{selectedItem.name}</h2>
        <p className="item-description">{selectedItem.description}</p>
        <p className="item-price">Price: ₹{selectedItem.price}</p>
        <div className="buttons-container">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchandiseDetails;
