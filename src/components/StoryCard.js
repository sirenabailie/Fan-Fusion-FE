'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { deleteStory } from '../api/storyData';
import { useAuth } from '../utils/context/authContext';

function StoryCard({ storyObj, onUpdate }) {
  const deleteThisStory = () => {
    if (window.confirm(`Delete ${storyObj.title}?`)) {
      deleteStory(storyObj.id).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const pathname = usePathname();
  const profilePage = pathname === `/profile/${user.id}`;

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={storyObj.image} alt={storyObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{storyObj.title}</Card.Title>
        <p>{storyObj.description}</p>
        <h6>Target Audience: {storyObj.targetAudience}</h6>
        <small>Date Created: {new Date(storyObj.dateCreated).toLocaleDateString()}</small>
        <div className="d-flex justify-content-center mt-3">
          <Link href={`/stories/${storyObj.id}`} passHref>
            <Button variant="dark" title="View Details">
              View
            </Button>
          </Link>
          {profilePage ? (
            <>
              <Link href={`/stories/${storyObj.id}/edit`} passHref>
                <Button variant="info">Edit</Button>
              </Link>
              <Button variant="danger" onClick={deleteThisStory}>
                Delete
              </Button>
            </>
          ) : null}
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
