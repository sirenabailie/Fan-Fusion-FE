'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';
import { useAuth } from '../../utils/context/authContext';
import { createStory, updateStory } from '../../api/storyData';
import targetAudienceArray from '../../utils/sample-data/targetAudienceArray.json';
import getCategories from '../../api/categoryData';
import getTags from '../../api/tagData';
import { addStoryTag, removeStoryTag } from '../../api/storyTagData';

const initialState = {
  title: '',
  description: '',
  image: '',
  targetAudience: '',
  categoryId: 0,
};

function StoryForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);
    getTags().then(setTags);

    if (obj.id) {
      setFormInput(obj);
      setSelectedTags(obj.tags.map((tag) => ({ value: tag.id, label: tag.name })));
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // We use async and await in this code to ensure that the operations for adding and removing tags are completed before moving on to the next step, preventing potential issues with data not being updated correctly in the database.
  const manageStoryTags = async (storyId) => {
    // Filter and map the tags to be added
    const addedTags =
      (await selectedTags
        // Filter selectedTags to find tags that are NOT(!) already associated with the current story's tags
        // The .filter() method is applied to selectedTags. You’re iterating through each tag in selectedTags. For each selectedTag, you check if there’s any tag in obj.tags with a matching id using .some().
        // We want to return every item in the selectedTags that isn't in the obj?.tags so we can identify which tags should be added.
        .filter((selectedTag) => !obj?.tags?.some((storyTag) => storyTag.id === selectedTag.value))
        // Map the filtered tags to add them to the story by calling addStoryTag
        .map((selectedTag) => addStoryTag(storyId, selectedTag.value))) || [];
    // Ensure it's an empty array if no tags need to be added
    // Filter and map the tags to be removed
    const removedTags =
      (await obj?.tags
        // Filter the story's current tags to find tags that are not included in the newly selected tags
        // We want to return every item in the obj.tags that isn't in the selectedTags so we can identify which tags should be removed.
        ?.filter((storyTag) => !selectedTags.some((selectedTag) => selectedTag.value === storyTag.id))
        // Map the filtered tags to remove them from the story by calling removeStoryTag
        .map((storyTag) => removeStoryTag(storyId, storyTag.id))) || [];
    // Ensure it's an empty array if no tags need to be removed
    // Flatten addedTags and removedTags into single array and ensure all promises resolve before exiting function
    await Promise.all([...addedTags, ...removedTags]);
  };

  const handleTagChange = (selections) => {
    setSelectedTags(selections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updateStory(obj.id, { ...formInput, userId: user.id }).then(() => {
        manageStoryTags(obj.id).then(() => router.push('/'));
      });
    } else {
      const payload = { ...formInput, userId: user.id };
      createStory(payload).then(({ id }) => {
        manageStoryTags(id).then(() => router.push('/'));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Story</h2>

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
        <Form.Select aria-label="Target Audience" name="targetAudience" onChange={handleChange} className="mb-3" value={formInput.targetAudience} required>
          <option value="">Select an Audience</option>
          {targetAudienceArray.map((story) => (
            <option key={story.id} value={story.targetAudience}>
              {story.targetAudience}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* TARGET CATEGORY  */}
      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="categoryId" onChange={handleChange} className="mb-3" value={formInput.categoryId} required>
          <option value="">Select an Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Select instanceId="tagSelect" aria-label="Tags" name="tags" className="mb-3" placeholder="Select or Create a Tag..." value={selectedTags} isMulti onChange={handleTagChange} options={tags.map((tag) => ({ value: tag.id, label: tag.name }))} />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Story</Button>
    </Form>
  );
}

StoryForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    targetAudience: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default StoryForm;
