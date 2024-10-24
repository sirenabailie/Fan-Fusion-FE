'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

function StoryCard({ storyObj }) {
  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={storyObj.image} alt={storyObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{storyObj.title}</Card.Title>
        <p>{storyObj.description}</p>
        <h6>Target Audience: {storyObj.targetAudience}</h6>
        <small>Date Created: {new Date(storyObj.dateCreated).toLocaleDateString()}</small>
        <div className="d-flex justify-content-between mt-3">
          <Link href={`/stories/${storyObj.id}/edit`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Link href={`/stories/${storyObj.id}`} passHref>
            <Button variant="dark" title="View Details">
              View
            </Button>
          </Link>
        </div>
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
    id: PropTypes.number,
    storyId: PropTypes.string,
  }).isRequired,
};

export default StoryCard;
