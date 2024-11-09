'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStoriesByCategory } from '@/api/categoryData';
import StoryCard from '@/components/StoryCard';
import { useAuth } from '../../../utils/context/authContext';

export default function CategoryStories({ params }) {
  const [catStories, setCatStories] = useState([]);
  const { user } = useAuth();
  const { categoryId } = params;

  const getCatStories = () => {
    getStoriesByCategory(categoryId, user.id).then((data) => {
      setCatStories(data);
    });
  };

  useEffect(() => {
    getCatStories();
  }, []);

  return <div className="d-flex flex-wrap justify-content-center">{catStories.length > 0 ? catStories.map((story) => <StoryCard key={story.id} storyObj={story} onUpdate={getCatStories} editDelete={false} />) : <p>No Stories to display</p>}</div>;
}

CategoryStories.propTypes = {
  params: PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
  }).isRequired,
};
