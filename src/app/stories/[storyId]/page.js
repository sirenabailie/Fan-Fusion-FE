'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSingleStory } from '@/api/storyData';
import TableOfContents from '@/components/TableOfContents';
import { useAuth } from '@/utils/context/authContext';

export default function ViewStory({ params }) {
  const [storyDetails, setStoryDetails] = useState({});
  const { user } = useAuth();

  const fetchStoryDetails = () => {
    if (params.storyId) {
      getSingleStory(params.storyId).then((data) => {
        console.log('Fetched story details:', data); // Log for debugging
        setStoryDetails(data);
      });
    }
  };

  useEffect(() => {
    fetchStoryDetails();
  }, [params.storyId]);

  const isCreator = user?.id === storyDetails.user?.id;
  console.log('Is creator:', isCreator); // Debugging
  console.log('Chapters:', storyDetails.chapters); // Debugging

  return (
    <div className="mt-5 d-flex justify-content-center">
      <div className="d-flex flex-column">
        <img src={storyDetails.image} alt={storyDetails.title} style={{ width: '300px' }} />
      </div>

      <div className="text-white ms-5 d-flex flex-column details story-details" style={{ maxWidth: '500px' }}>
        <div className="mb-2">
          <h5 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {storyDetails.title} by {storyDetails.user?.username || 'Unknown author'}
          </h5>
        </div>

        <div className="mb-4">
          <p>{storyDetails.description || 'No description available'}</p>
        </div>

        {/* Table of Contents with showDrafts based on user and creator match */}
        <TableOfContents
          storyId={params.storyId}
          storyCreatorId={storyDetails.user?.id}
          chapters={storyDetails.chapters || []} // Ensure chapters array
          onUpdate={fetchStoryDetails}
          showDrafts={isCreator} // Only true if user is the creator
        />

        <div>
          {storyDetails.tags?.length > 0 ? (
            <div>
              <h6>Tags:</h6>
              <ul className="list-inline">
                {storyDetails.tags.map((tag) => (
                  <li key={tag.id} className="list-inline-item">
                    <a href={`/tagStories/${tag.id}`} className="badge btn">
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
