'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function StoryCard({ storyObj }) {
  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={storyObj.image} alt={storyObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{storyObj.title}</Card.Title>
        <p>{storyObj.description}</p>
        <h6>Target Audience: {storyObj.targetAudience}</h6>
        <small>Date Created: {new Date(storyObj.dateCreated).toLocaleDateString()}</small>
      </Card.Body>
    </Card>
  );
}

StoryCard.propTypes = {
  storyObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    targetAudience: PropTypes.string,
    description: PropTypes.string,
    dateCreated: PropTypes.string,
  }).isRequired,
};

export default StoryCard;
