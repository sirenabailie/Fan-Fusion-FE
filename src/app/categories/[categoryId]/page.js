'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStoriesByCategory } from '../../../api/categoryData';
import StoryCard from '../../../components/StoryCard';

export default function CategoryStories({ params }) {
  const [catStories, setCatStories] = useState([]);

  const { categoryId } = params;

  const getCatStories = () => {
    getStoriesByCategory(categoryId).then((data) => {
      setCatStories(data);
    });
  };

  useEffect(() => {
    getCatStories();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {catStories.map((story) => (
        <StoryCard key={story.id} storyObj={story} onUpdate={getCatStories} />
      ))}
    </div>
  );
}

CategoryStories.propTypes = {
  params: PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
  }).isRequired,
};
