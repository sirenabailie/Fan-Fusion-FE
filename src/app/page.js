'use client';

import React, { useState, useEffect } from 'react';
import { getStories } from '../api/storyData';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();

  const getAllTheStories = () => {
    getStories(user.id).then(setStories);
  };

  useEffect(() => {
    getAllTheStories();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {stories.map((story) => (
        <StoryCard key={story.id} storyObj={story} onUpdate={getAllTheStories} editDelete={false} />
      ))}
    </div>
  );
}

export default Home;
