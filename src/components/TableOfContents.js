import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { deleteChapter } from '../api/chapterData';
import { useAuth } from '../utils/context/authContext';

function TableOfContents({ storyId, storyCreatorId, chapters = [], onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isStoryCreator = user?.id === storyCreatorId;

  const handleChapterClick = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  const handleAddChapter = () => {
    router.push(`/stories/${storyId}/add-chapter`);
  };

  const toggleDropdown = (chapterId) => {
    setActiveDropdown((prev) => (prev === chapterId ? null : chapterId));
  };

  const handleEdit = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}/edit`);
  };

  const deleteSingleChapter = (chapterId, chapterTitle) => {
    if (window.confirm(`Delete ${chapterTitle}?`)) {
      deleteChapter(chapterId)
        .then(() => onUpdate())
        .catch((error) => console.error('Error deleting chapter:', error));
    }
  };

  const displayedChapters = chapters.filter((chapter) => {
    if (chapter.user?.id === user?.id) {
      return true;
    }
    return !chapter.saveAsDraft;
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Table of Contents</h2>
      <table style={{ margin: '0 auto', width: '400px' }}>
        <tbody className="story-details">
          {displayedChapters.length > 0 ? (
            displayedChapters.map((chapter) => (
              <tr key={chapter.id}>
                <td style={{ width: '60%', paddingRight: '10px', textAlign: 'left' }}>
                  <button
                    type="button"
                    className="story-details"
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '10px',
                      width: '100%',
                    }}
                  >
                    <span style={{ lineHeight: '1.5' }}>{new Date(chapter.dateCreated).toLocaleDateString()}</span>
                    {isStoryCreator && (
                      <button
                        type="button"
                        className="story-details"
                        onClick={() => toggleDropdown(chapter.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'inherit',
                          fontSize: '22px',
                          padding: '0',
                          lineHeight: '1.5',
                          position: 'relative',
                          top: '-11px',
                        }}
                        aria-expanded={activeDropdown === chapter.id}
                        aria-label="Open chapter options"
                      >
                        &#x2026;
                      </button>
                    )}
                  </div>

                  {isStoryCreator && activeDropdown === chapter.id && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        backgroundColor: 'transparent',
                        padding: '5px',
                        zIndex: 1,
                        width: '80px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleEdit(chapter.id)}
                        className="dropdown-button"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                        aria-label={`Edit chapter ${chapter.title}`}
                      >
                        <i className="fas fa-edit btn" style={{ color: 'white', fontSize: '16px' }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSingleChapter(chapter.id, chapter.title)}
                        className="dropdown-button"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          color: 'red',
                        }}
                        aria-label={`Delete chapter ${chapter.title}`}
                      >
                        <i className="fas fa-trash-can btn" style={{ color: 'white', fontSize: '16px' }} />
                      </button>
                    </div>
                  )}
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
          className="btn"
          onClick={handleAddChapter}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            color: 'white',
            border: 'none',
          }}
          aria-label="Add a new chapter"
        >
          <i className="fas fa-plus" style={{ color: 'white', fontSize: '16px' }} />
        </button>
      )}
    </div>
  );
}

TableOfContents.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  storyId: PropTypes.string.isRequired,
  storyCreatorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
      saveAsDraft: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }),
  ).isRequired,
};

export default TableOfContents;
