'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSingleStory } from '@/api/storyData';
import TableOfContents from '@/components/TableOfContents';

export default function ViewStory({ params }) {
  const [storyDetails, setStoryDetails] = useState({});

  const fetchStoryDetails = () => {
    if (params.storyId) {
      getSingleStory(params.storyId).then((data) => setStoryDetails(data));
    }
  };

  useEffect(() => {
    if (params.storyId) {
      getSingleStory(params.storyId).then((data) => setStoryDetails(data));
    }
  }, [params.storyId]);

  return (
    <div className="mt-5 d-flex justify-content-center">
      {/* Image Section */}
      <div className="d-flex flex-column">
        <img src={storyDetails.image} alt={storyDetails.title} style={{ width: '300px' }} />
      </div>

      {/* Story Details Section */}
      <div className="text-white ms-5 d-flex flex-column" style={{ maxWidth: '500px' }}>
        {/* Title and Author */}
        <div className="mb-2">
          <h5 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {storyDetails.title} by {storyDetails.user?.username || 'Unknown author'}
          </h5>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p>{storyDetails.description || 'No description available'}</p>
        </div>

        {/* Table of Contents */}
        <TableOfContents storyId={params.storyId} storyCreatorId={storyDetails.user?.id} chapters={storyDetails.chapters} onUpdate={fetchStoryDetails} />

        {/* Tags */}
        <div>
          {storyDetails.tags?.length > 0 ? (
            <div>
              <h6>Tags:</h6>
              <ul className="list-inline">
                {storyDetails.tags.map((tag) => (
                  <li key={tag.id} className="list-inline-item">
                    <a href={`/tagStories/${tag.id}`} className="badge bg-primary">
                      {tag.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No tags available</p>
          )}
        </div>
      </div>
    </div>
  );
}

ViewStory.propTypes = {
  params: PropTypes.shape({
    storyId: PropTypes.string.isRequired,
  }).isRequired,
};
