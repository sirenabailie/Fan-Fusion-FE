'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import { publishOrSaveDraftChapter } from '../../api/chapterData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  content: '',
};

function ChapterForm({ chapterObj = initialState }) {
  const [formInput, setFormInput] = useState(chapterObj);
  const [draftStatus, setDraftStatus] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { storyId } = useParams();

  useEffect(() => {
    if (chapterObj.id) {
      setFormInput(chapterObj);
    }
  }, [chapterObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, storyId, userId: user.id, saveAsDraft: draftStatus };
    // try {
    if (chapterObj?.id) {
      payload.id = chapterObj.id;
    }
    // } catch (error) {
    //   console.error("Error updating or creating chapter:", error);
    // }
    publishOrSaveDraftChapter(payload).then(() => router.push(`/profile/${user.id}`));
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">Chapter</h2>

      <FloatingLabel controlId="chapterTitleInput" label="Chapter Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter chapter title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="chapterContentTextarea" label="Content" className="mb-3">
        <Form.Control as="textarea" placeholder="Content" style={{ height: '200px' }} name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit" onClick={() => setDraftStatus(false)}>
        Publish
      </Button>
      <Button type="submit" onClick={() => setDraftStatus(true)}>
        Save as Draft
      </Button>
    </Form>
  );
}

ChapterForm.propTypes = {
  chapterObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default ChapterForm;
