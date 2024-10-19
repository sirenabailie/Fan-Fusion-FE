'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getStories, createStory, updateStory } from '../../api/storyData';

const initialState = {
  title: '',
  description: '',
  image: '',
  dateCreated: false,
  targetAudience: '',
  categoryId: '',
};

function StoryForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [stories, setStories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getStories(user.uId).then(setStories);

    if (obj.Id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.Id) {
      updateStory(formInput).then(() => router.push(`/stories/${obj.Id}`));
    } else {
      const payload = { ...formInput, uId: user.uId };
      createStory(payload).then(({ name }) => {
        const patchPayload = { Id: name };
        updateStory(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.Id ? 'Update' : 'Create'} Story</h2>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Cover Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Story Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title for your story" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* TARGET AUDIENCE  */}
      <FloatingLabel controlId="floatingSelect" label="Target Audience">
        <Form.Select aria-label="Target Audience" name="targetAudience" onChange={handleChange} className="mb-3" value={formInput.targetAudience || ''} required>
          <option value="">Select an Audience</option>
          {stories.map((story) => (
            <option key={story.Id} value={story.Id}>
              {story.targetAudience}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.Id ? 'Update' : 'Create'} Story</Button>
    </Form>
  );
}

StoryForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    targetAudience: PropTypes.string,
    Id: PropTypes.number,
  }),
};

export default StoryForm;
