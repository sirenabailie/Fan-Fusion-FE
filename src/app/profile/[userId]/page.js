'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getUser from '../../../api/userData';
import StoryCard from '../../../components/StoryCard';

function UserDashboard({ params }) {
  const [userStories, setUserStories] = useState({ stories: [] });

  const { userId } = params;

  const getUserStories = () => {
    getUser(userId).then((data) => {
      setUserStories(data);
    });
  };

  useEffect(() => {
    getUserStories();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {userStories.stories.map((story) => (
        <StoryCard key={story.id} storyObj={story} onUpdate={getUserStories} />
      ))}
    </div>
  );
}

UserDashboard.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDashboard;
