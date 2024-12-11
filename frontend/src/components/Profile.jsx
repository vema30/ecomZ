import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const token = localStorage.getItem('authToken');
  const [user, setUser] = useState(null); // Initialize state for user data

  useEffect(() => {
    // Fetch the user profile data when the component mounts
    axios.get('http://localhost:3000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}` // Send token for authentication
      }
    })
    .then(response => {
      setUser(response.data); // Set user data in state
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, [token]); // Empty dependency array ensures this runs once when the component mounts

  if (!user) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="m-3 bg-white p-6 flex justify-between rounded-lg shadow-lg">
      <div className="flex-1">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name:</label>
          <span className="text-gray-800">{`${user.firstName} ${user.lastName}`}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
          <span className="text-gray-800">{user.phonenumber}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Change Password:</label>
          <Link to="/changepassword" className="text-blue-500 underline hover:text-blue-700">
            Change
          </Link>
        </div>

        <div className="mt-4">
          <button
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
            onClick={() => alert('Password change saved!')}
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-gray-200 rounded-full overflow-hidden flex justify-center items-center">
        {/* Profile image or other content can go here */}
        <img 
       
          src={user.profileImage || `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}+ ${user.lastName}`} // Placeholder if no image
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
}

export default Profile;
