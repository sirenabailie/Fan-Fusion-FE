import React from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

function TableOfContents({ storyId, chapters }) {
  const router = useRouter();

  const handleChapterClick = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Table of Contents</h2>
      <table>
        <thead>
          <tr>
            <th>Chapter</th>
            <th>Date Created/Updated</th>
          </tr>
        </thead>
        <tbody>
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <tr key={chapter.id} onClick={() => handleChapterClick(chapter.id)} style={{ cursor: 'pointer' }}>
                <td style={{ paddingRight: '20px' }}>{chapter.title}</td> {/* Adjust padding as needed */}
                <td>{new Date(chapter.dateCreated).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No chapters available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

TableOfContents.propTypes = {
  storyId: PropTypes.string.isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TableOfContents;
