'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getStories } from '../api/storyData';
import StoryCard from '../components/StoryCard';

function Home() {
  const [stories, setStories] = useState([]);

  const { user } = useAuth();

  const getAllTheStories = () => {
    getStories(user.userUid).then(setStories);
    // console.log(getStories);
  };

  useEffect(() => {
    getAllTheStories();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {stories.map((story) => (
        <StoryCard key={story.id} storyObj={story} onUpdate={getAllTheStories} />
      ))}
    </div>
  );
}

export default Home;
