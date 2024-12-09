import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    // Basic password validation logic
    if (currentPassword === '') {
      setError('Current password is required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match');
      return;
    }
    setError('');
    alert('Password changed successfully');
    // Add further logic here to save the password, e.g., API call
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <p className="text-2xl font-bold mb-4">Change Password</p>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Current Password</label>
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ChangePassword;
