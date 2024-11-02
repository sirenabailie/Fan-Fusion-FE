import React from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

function TableOfContents({ storyId, chapters }) {
  const router = useRouter();

  const handleChapterClick = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Table of Contents</h2>
      <table style={{ margin: '0 auto', width: '400px' }}>
        {' '}
        {/* Center table and set fixed width */}
        <tbody>
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <tr key={chapter.id} onClick={() => handleChapterClick(chapter.id)} style={{ cursor: 'pointer' }}>
                <td style={{ width: '60%', paddingRight: '10px', textAlign: 'left' }}>{chapter.title}</td> {/* Title column */}
                <td style={{ width: '40%', textAlign: 'right' }}>{new Date(chapter.dateCreated).toLocaleDateString()}</td> {/* Date column */}
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
