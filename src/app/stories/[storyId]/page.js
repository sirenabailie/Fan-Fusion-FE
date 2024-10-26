'use client';

import React, { useState, useEffect } from 'react';
import { getSingleStory } from '@/api/storyData';
import PropTypes from 'prop-types';

export default function ViewStory({ params }) {
  const [storyDetails, setStoryDetails] = useState({});

  useEffect(() => {
    // Fetch story details including tags
    getSingleStory(params.storyId).then(setStoryDetails);
  }, [params.storyId]);

  return (
    <div className="mt-5 d-flex flex-wrap justify-content-center">
      {/* Story Image */}
      <div className="d-flex flex-column">
        <img src={storyDetails.image} alt={storyDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {storyDetails.title} by {storyDetails.user?.username || 'Unknown author'}
        </h5>
        <p>{storyDetails.description || 'No description available'}</p>

        {/* Display Tags */}
        {storyDetails.tags?.length > 0 ? (
          <div>
            <h6>Tags:</h6>
            <ul className="list-inline">
              {storyDetails.tags.map((tag) => (
                <li key={tag.id} className="list-inline-item">
                  <span className="badge bg-primary">{tag.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No tags available</p> // Handle case where no tags exist
        )}
      </div>
    </div>
  );
}

ViewStory.propTypes = {
  params: PropTypes.shape({
    storyId: PropTypes.string.isRequired,
  }).isRequired,
};
