import React from 'react'
import { Link } from 'react-router-dom'
const Profile = () => {
  return (
    <div className='m-3 bg-white p-6 flex justify-between'>
      
<div>

<div className="mb-4 ">
  <label className="block text-gray-700 font-semibold mb-2">Name:</label>
  <span className="text-gray-800">Vema</span>
</div>

<div className="mb-4">
  <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
  <span className="text-gray-800">+123456789</span> {/* Replace with actual value */}
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
  </button></div>
</div>
<div className='w-[300px] h-[300px] bg-black relative left-15'>
</div>
    </div>
  )
}

export default Profile
