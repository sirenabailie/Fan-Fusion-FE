'use client';

import React, { useState, useEffect } from 'react';
import { getSingleStory } from '@/api/storyData';
import PropTypes from 'prop-types';

export default function ViewStory({ params }) {
  const [storyDetails, setStoryDetails] = useState({});

  const { storyId } = params;

  useEffect(() => {
    getSingleStory(storyId).then(setStoryDetails);
  }, [storyId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <image src={storyDetails.image} alt={storyDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {storyDetails.title} by {storyDetails.userObject?.firstName} {storyDetails.userObject?.lastName}
        </h5>
        Author Email:{' '}
        <a href={`mailto:${storyDetails.userObject?.email}`} style={{ color: 'primary' }}>
          {storyDetails.authorObject?.email}
        </a>
        <p>{storyDetails.description || ''}</p>
      </div>
    </div>
  );
}

ViewStory.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
