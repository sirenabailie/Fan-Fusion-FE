'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { deleteStory, favoritesStoryToggle } from '../api/storyData';
import { useAuth } from '../utils/context/authContext';

function StoryCard({ storyObj, onUpdate }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const profilePage = pathname === `/profile/${user.id}`;

  // Toggle favorite status locally and call onUpdate to refresh dashboard with getUser
  const toggleFavorite = () => {
    favoritesStoryToggle(storyObj.id, user.id).then(() => {
      onUpdate();
    });
  };

  const deleteThisStory = () => {
    if (window.confirm(`Delete ${storyObj.title}?`)) {
      deleteStory(storyObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={storyObj.image} alt={storyObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{storyObj.title}</Card.Title>
        <p>{storyObj.description}</p>
        <small>{new Date(storyObj.dateCreated).toLocaleDateString()}</small>
        <div style={{ marginBottom: '50px' }} /> {/* Add space here */}
        <div className="d-flex justify-content-center mt-3">
          <Link href={`/stories/${storyObj.id}`} passHref>
            <button
              type="button"
              className="btn"
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={`View details for ${storyObj.title}`}
              title="View"
            >
              <i className="fas fa-eye ms-2" style={{ color: 'white', fontSize: '24px' }} />
            </button>
          </Link>
          {profilePage ? (
            <>
              <Link href={`/stories/${storyObj.id}/edit`} passHref>
                <button
                  type="button"
                  className="btn"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '80px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label={`Edit ${storyObj.title}`}
                  title="Edit"
                >
                  <i className="fas fa-pen-to-square ms-2" style={{ color: 'white', fontSize: '24px' }} />
                </button>
              </Link>
              <button
                type="button"
                onClick={deleteThisStory}
                className="btn"
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '80px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label={`Delete ${storyObj.title}`}
                title="Delete"
              >
                <i className="fas fa-trash-can ms-2" style={{ color: 'white', fontSize: '24px' }} />
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="btn"
            onClick={toggleFavorite}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Mark ${storyObj.title} as favorite`}
            title="Favorite"
          >
            <i className="fas fa-star ms-2 star-icon" style={{ color: storyObj.isFavorited ? '#247ac1' : 'white', fontSize: '24px' }} />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

StoryCard.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  storyObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    targetAudience: PropTypes.string,
    description: PropTypes.string,
    dateCreated: PropTypes.string,
    id: PropTypes.number,
    storyId: PropTypes.string,
    isFavorited: PropTypes.bool,
  }).isRequired,
};

export default StoryCard;
