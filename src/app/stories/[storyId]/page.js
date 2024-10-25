'use client';

import React, { useState, useEffect } from 'react';
import { getSingleStory } from '@/api/storyData';
import PropTypes from 'prop-types';

export default function ViewStory({ params }) {
  const [storyDetails, setStoryDetails] = useState({});

  // const { storyId } = params;

  useEffect(() => {
    getSingleStory(params.storyId).then(setStoryDetails);
  }, [params.storyId]);
  console.warn(storyDetails);

  if (!storyDetails) {
    return <p>Loading...</p>; // Loading state until story data is fetched
  }

  return (
    <div className="mt-5 d-flex flex-wrap justify-content-center">
      {/* Story Image */}
      <div className="d-flex flex-column">
        <img src={storyDetails.image} alt={storyDetails.title} style={{ width: '300px' }} />
      </div>

      {/* Story Details */}
      <div className="text-white ms-5 details">
        <h5>
          {storyDetails.title} by {storyDetails.user?.username || 'Unknown author'}
        </h5>
        {/* Story Description */}
        <p>{storyDetails.description || 'No description available'}</p>
      </div>
    </div>
  );
}

ViewStory.propTypes = {
  params: PropTypes.shape({
    storyId: PropTypes.string.isRequired,
  }).isRequired,
};
