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
    getStories(user.uid).then(setStories);

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
      const payload = { ...formInput, uid: user.uid };
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
      <FloatingLabel controlId="floatingInput2" label="Cover Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Story Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title for your story" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Book Price" className="mb-3">
        <Form.Control type="text" placeholder="Enter price" name="price" value={formInput.price} onChange={handleChange} required />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Author">
        <Form.Select aria-label="Author" name="author_id" onChange={handleChange} className="mb-3" value={formInput.author_id || ''} required>
          <option value="">Select an Author</option>
          {stories.map((author) => (
            <option key={author.firebaseKey} value={author.firebaseKey}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Story</Button>
    </Form>
  );
}

StoryForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default StoryForm;