import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

function TableOfContents({ storyId, chapters }) {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleChapterClick = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  const toggleDropdown = (chapterId) => {
    setActiveDropdown((prev) => (prev === chapterId ? null : chapterId));
  };

  const handleEdit = (chapterId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}/edit`);
  };

  const handleDelete = (chapterId) => {
    console.log(`Delete chapter with ID: ${chapterId}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Table of Contents</h2>
      <table style={{ margin: '0 auto', width: '400px' }}>
        <tbody>
          {chapters.length > 0 ? (
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
                <td style={{ width: '30%', textAlign: 'right', position: 'relative' }}>
                  {new Date(chapter.dateCreated).toLocaleDateString()}
                  <button
                    type="button"
                    onClick={() => toggleDropdown(chapter.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '10px',
                      color: 'white',
                    }}
                    aria-expanded={activeDropdown === chapter.id}
                    aria-label="Open chapter options"
                  >
                    &#x2026; {/* Ellipsis character */}
                  </button>

                  {activeDropdown === chapter.id && (
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
                      <button type="button" onClick={() => handleDelete(chapter.id)} className="dropdown-button">
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
