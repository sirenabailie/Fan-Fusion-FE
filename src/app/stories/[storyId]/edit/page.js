'use client';

import React, { useEffect, useState } from 'react';
import StoryForm from '@/components/forms/StoryForm';
import PropTypes from 'prop-types';
import { getSingleStory } from '@/api/storyData';

export default function EditStory({ params }) {
  const [editItem, setEditItem] = useState({});
  // grab the story id
  const { storyId } = params;

  // make a call to the API to get the story data
  useEffect(() => {
    getSingleStory(storyId).then(setEditItem);
  }, [storyId]);

  // pass object to form
  return <StoryForm obj={editItem} />;
}

EditStory.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
