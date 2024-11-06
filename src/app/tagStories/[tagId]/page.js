'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StoryCard from '../../../components/StoryCard';
import { getTagStories } from '../../../api/tagData';

export default function TaggedStories({ params }) {
  const [tagStories, setTagStories] = useState([]);

  const { tagId } = params;

  const getTaggedStories = () => {
    getTagStories(tagId).then((data) => {
      setTagStories(data);
    });
  };

  useEffect(() => {
    getTaggedStories();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {tagStories.map((story) => (
        <StoryCard key={story.id} storyObj={story} onUpdate={getTaggedStories} />
      ))}
    </div>
  );
}

TaggedStories.propTypes = {
  params: PropTypes.shape({
    tagId: PropTypes.number.isRequired,
  }).isRequired,
};
