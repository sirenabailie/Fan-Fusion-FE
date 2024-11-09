'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSingleChapter } from '@/api/chapterData';

export default function ViewChapter({ params }) {
  const [chapterDetails, setChapterDetails] = useState({});

  useEffect(() => {
    if (params.chapterId) {
      getSingleChapter(params.chapterId).then((data) => setChapterDetails(data));
    }
  }, [params.chapterId]);

  if (!chapterDetails.title) {
    return <p>Loading...</p>;
  }

  return (
    <div className="chapter-details" style={{ margin: '20px' }}>
      <h1 className="chapter-title">{chapterDetails.title}</h1>
      <p
        className="details"
        style={{
          marginTop: '20px',
          marginLeft: '200px',
          marginRight: '200px',
          textAlign: 'left',
          lineHeight: '2.0',
        }}
      >
        {chapterDetails.content}
      </p>
    </div>
  );
}

ViewChapter.propTypes = {
  params: PropTypes.shape({
    chapterId: PropTypes.string.isRequired,
  }).isRequired,
};
