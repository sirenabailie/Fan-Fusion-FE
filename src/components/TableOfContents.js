import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// API function to fetch chapters for a book
const fetchChapters = async (storyId) => {
  const response = await fetch(`/api/stories/${storyId}/chapters`);
  if (!response.ok) throw new Error('Failed to fetch chapters');
  return response.json();
};

function TableOfContents({ storyId }) {
  const [chapters, setChapters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch chapters for the specified bookId
    fetchChapters(storyId)
      .then(setChapters)
      .catch((error) => console.error(error.message));
  }, [storyId]);

  return (
    <div>
      <h2>Table of Contents</h2>
      <table>
        <thead>
          <tr>
            <th>Chapter</th>
            <th>Date Created/Updated</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter.id} onClick={() => router.push(`/stories/${storyId}/chapters/${chapter.id}`)} style={{ cursor: 'pointer' }}>
              <td>{chapter.title}</td>
              <td>{new Date(chapter.dateCreated).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableOfContents.propTypes = {
  storyId: PropTypes.string.isRequired,
};

export default TableOfContents;
