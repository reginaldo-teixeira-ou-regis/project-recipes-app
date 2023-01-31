import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

function ProfilePage() {
  return (
    <div>
      <Header
        title="Profile"
      />
      <Profile />
      <Footer />
    </div>
  );
}

export default ProfilePage;
