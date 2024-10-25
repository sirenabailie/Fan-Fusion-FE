'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteStory } from '../api/storyData';

function StoryCard({ storyObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
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
        <h6>Target Audience: {storyObj.targetAudience}</h6>
        <small>Date Created: {new Date(storyObj.dateCreated).toLocaleDateString()}</small>
        <Link href={`/stories/${storyObj.id}/edit`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisStory} className="m-2">
          DELETE
        </Button>
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
  }).isRequired,
};

export default StoryCard;
