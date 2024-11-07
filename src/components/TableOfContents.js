import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { deleteChapter } from '../api/chapterData';
import { useAuth } from '../utils/context/authContext';

function TableOfContents({ storyId, storyCreatorId, chapters, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth(); // Get the logged-in user’s ID
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleChapterClick = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  const handleAddChapter = () => {
    router.push(`/stories/${storyId}/chapters/new`);
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

  const isCreator = user?.id === storyCreatorId; // Check if the logged-in user is the creator

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Table of Contents</h2>
      <table style={{ margin: '0 auto', width: '400px' }}>
        <tbody>
          {chapters?.length > 0 ? (
            chapters.map((chapter) => (
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '10px',
                      width: '100%',
                    }}
                  >
                    <span style={{ lineHeight: '1.5' }}>{new Date(chapter.dateCreated).toLocaleDateString()}</span>
                    {isCreator && (
                      <button
                        type="button"
                        onClick={() => toggleDropdown(chapter.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'white',
                          fontSize: '16px',
                          padding: '0',
                          lineHeight: '1.5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        aria-expanded={activeDropdown === chapter.id}
                        aria-label="Open chapter options"
                      >
                        &#x2026; {/* Ellipsis character */}
                      </button>
                    )}
                  </div>

                  {isCreator && activeDropdown === chapter.id && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '5px',
                        padding: '5px',
                        zIndex: 1,
                        width: '80px',
                      }}
                    >
                      <button type="button" onClick={() => handleEdit(chapter.id)} className="dropdown-button">
                        Edit
                      </button>
                      <button type="button" onClick={() => deleteSingleChapter(chapter.id, chapter.title)} className="dropdown-button">
                        Delete
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
      {isCreator && (
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
  onUpdate: PropTypes.func.isRequired,
  storyId: PropTypes.string.isRequired,
  storyCreatorId: PropTypes.number.isRequired, // New prop to store the creator's ID
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TableOfContents;
