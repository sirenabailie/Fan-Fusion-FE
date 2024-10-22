'use client';

import React, { useEffect, useState } from 'react';
import StoryForm from '@/components/forms/StoryForm';
import PropTypes from 'prop-types';
import { getSingleStory } from '@/api/storyData';

export default function EditBook({ params }) {
  const [editItem, setEditItem] = useState({});
  // grab the firebasekey
  const { firebaseKey } = params;

  // make a call to the API to get the book data
  useEffect(() => {
    getSingleStory(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return <StoryForm obj={editItem} />;
}

EditBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
