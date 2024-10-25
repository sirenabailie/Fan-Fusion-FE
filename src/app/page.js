'use client';

import React, { useState, useEffect } from 'react';
import { getStories } from '../api/storyData';
import StoryCard from '../components/StoryCard';

function Home() {
  const [stories, setStories] = useState([]);

  const getAllTheStories = () => {
    getStories().then(setStories);
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
