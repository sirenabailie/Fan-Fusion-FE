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
  categoryfirebaseKey: '',
};

function StoryForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [stories, setStories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getStories(user.ufirebaseKey).then(setStories);

    if (obj.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updateStory(formInput).then(() => router.push(`/Story/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, ufirebaseKey: user.ufirebaseKey };
      createStory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateStory(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Story</h2>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlfirebaseKey="floatingInput2" label="Cover Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlfirebaseKey="floatingInput1" label="Story Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title for your story" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlfirebaseKey="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* TARGET AUDIENCE  */}
      <FloatingLabel controlfirebaseKey="floatingSelect" label="Target Audience">
        <Form.Select aria-label="Target Audience" name="targetAudience" onChange={handleChange} className="mb-3" value={formInput.targetAudience || ''} required>
          <option value="">Select an Audience</option>
          {stories.map((story) => (
            <option key={story.firebaseKey} value={story.firebaseKey}>
              {story.targetAudience}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Story</Button>
    </Form>
  );
}

StoryForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    targetAudience: PropTypes.string,
    firebaseKey: PropTypes.number,
  }),
};

export default StoryForm;
