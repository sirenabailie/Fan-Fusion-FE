'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

function StoryCard({ storyObj }) {
  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={storyObj.image} alt={storyObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{storyObj.title}</Card.Title>
        <p>{storyObj.description}</p>
        <h6>Target Audience: {storyObj.targetAudience}</h6>
        {/* Wrap date and button in a div to stack vertically */}
        <div>
          <small>Date Created: {new Date(storyObj.dateCreated).toLocaleDateString()}</small>
        </div>
        <div className="d-flex justify-content-center">
          <Link href={`/stories/${storyObj.id}`} passHref>
            <Button variant="dark" className="mt-2" title="View Details">
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
    id: PropTypes.string,
  }).isRequired,
};

export default StoryCard;
