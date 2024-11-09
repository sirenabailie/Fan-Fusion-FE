import React from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

function TableOfContents({ storyId, storyCreatorId, chapters = [] }) {
  const router = useRouter();
  const { user } = useAuth();

  // Determine if the logged-in user is the story creator
  const isStoryCreator = user?.id === storyCreatorId;

  // Filter chapters to show only drafts for the creator and published chapters for others
  const displayedChapters = chapters.filter((chapter) => {
    if (chapter.user?.id === user?.id) {
      // Show all chapters (draft and published) if the user is the creator of this chapter
      return true;
    }
    // Show only published chapters for other users
    return !chapter.saveAsDraft;
  });

  const handleChapterClick = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  const handleAddChapter = () => {
    router.push(`/stories/${storyId}/add-chapter`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Table of Contents</h2>
      <table style={{ margin: '0 auto', width: '400px' }}>
        <tbody>
          {displayedChapters.length > 0 ? (
            displayedChapters.map((chapter) => (
              <tr key={chapter.id}>
                <td style={{ width: '60%', paddingRight: '10px', textAlign: 'left' }}>
                  <button
                    type="button"
                    onClick={() => handleChapterClick(chapter.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      textAlign: 'left',
                      cursor: 'pointer',
                      padding: 0,
                      width: '100%',
                    }}
                    aria-label={`Go to chapter ${chapter.title}`}
                  >
                    {chapter.title}
                  </button>
                </td>
                <td style={{ width: '40%', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
                    <span style={{ lineHeight: '1.5' }}>{new Date(chapter.dateCreated).toLocaleDateString()}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No chapters available</td>
            </tr>
          )}
        </tbody>
      </table>
      {isStoryCreator && (
        <button
          type="button"
          onClick={handleAddChapter}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Add Chapter
        </button>
      )}
    </div>
  );
}

TableOfContents.propTypes = {
  storyId: PropTypes.string.isRequired,
  storyCreatorId: PropTypes.number.isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
      saveAsDraft: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number, // Creator ID for this specific chapter
      }),
    }),
  ),
};

export default TableOfContents;
