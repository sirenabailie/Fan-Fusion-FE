'use client';

import React, { useEffect, useState } from 'react';
import ChapterForm from '@/components/forms/ChapterForm';
import PropTypes from 'prop-types';
import { getSingleChapter } from '@/api/chapterData';

export default function EditChapter({ params }) {
  const [editItem, setEditItem] = useState({});

  // Grab the chapter ID from params
  const { chapterId } = params;

  // Fetch the chapter data from the API
  useEffect(() => {
    getSingleChapter(chapterId).then(setEditItem);
  }, [chapterId]);

  // Pass the fetched chapter data to the form
  return <ChapterForm chapterObj={editItem} />;
}

EditChapter.propTypes = {
  params: PropTypes.shape({
    chapterId: PropTypes.string.isRequired,
  }).isRequired,
};
