'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { deleteStory } from '../api/storyData';
import { useAuth } from '../utils/context/authContext';

function StoryCard({ storyObj, onUpdate }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const deleteThisStory = () => {
    if (window.confirm(`Delete ${storyObj.title}?`)) {
      deleteStory(storyObj.id).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const pathname = usePathname();
  const profilePage = pathname === `/profile/${user.id}`;

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={storyObj.image} alt={storyObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{storyObj.title}</Card.Title>
        <p>{storyObj.description}</p>
        <h6>Target Audience: {storyObj.targetAudience}</h6>
        <small>{new Date(storyObj.dateCreated).toLocaleDateString()}</small>
        <div style={{ marginBottom: '30px' }} /> {/* Add space here */}
        <div className="d-flex justify-content-center mt-3">
          <Link href={`/stories/${storyObj.id}`} passHref>
            <button
              type="button"
              className="btn"
              style={{
                position: 'absolute', // Set absolute positioning
                bottom: '10px', // Distance from the bottom of the card
                left: '10px', // Distance from the left of the card
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
                <Button variant="info">Edit</Button>
              </Link>
              <Button variant="danger" onClick={deleteThisStory}>
                <i className="fas fa-trash-can ms-2" style={{ color: 'white', fontSize: '24px' }} />
              </Button>
            </>
          ) : null}
          <button
            type="button"
            className="btn"
            onClick={toggleFavorite}
            style={{
              position: 'absolute', // Set absolute positioning
              bottom: '10px', // Distance from the bottom of the card
              right: '10px', // Distance from the right of the card
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Mark ${storyObj.title} as favorite`}
            title="Favorite"
          >
            <i className="fas fa-star ms-2 star-icon" style={{ color: isFavorited ? '#6f8ec1' : 'white', fontSize: '24px' }} />
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
  }).isRequired,
};

export default StoryCard;
