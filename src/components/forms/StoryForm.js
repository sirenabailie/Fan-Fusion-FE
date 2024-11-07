'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { useAuth } from '../../utils/context/authContext';
import { createStory, updateStory } from '../../api/storyData';
import targetAudienceArray from '../../utils/sample-data/targetAudienceArray.json';
import { getCategories } from '../../api/categoryData';
import { getTags } from '../../api/tagData';
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

  // We use async and await to ensure that adding/removing tags completes before moving to the next step, preventing issues with data synchronization.
  const manageStoryTags = async (storyId) => {
    // Filter and map the tags to be added
    const addedTags =
      (await selectedTags
        // Filter selectedTags to find tags that are NOT already associated with the current story's tags
        // The .filter() method iterates over selectedTags. For each selectedTag, it checks if any tag in obj.tags has a matching id using .some().
        // Returns every item in selectedTags not in obj?.tags to identify which tags to add.
        .filter((selectedTag) => !obj?.tags?.some((storyTag) => storyTag.id === selectedTag.value))
        // Maps the filtered tags to add them to the story via addStoryTag
        .map((selectedTag) => addStoryTag(storyId, selectedTag.value))) || [];

    // Filter and map the tags to be removed
    const removedTags =
      (await obj?.tags
        // Filters the story's current tags to find tags not included in the newly selected tags
        // Returns every item in obj.tags not in selectedTags to identify which tags to remove.
        ?.filter((storyTag) => !selectedTags.some((selectedTag) => selectedTag.value === storyTag.id))
        // Maps the filtered tags to remove them from the story via removeStoryTag
        .map((storyTag) => removeStoryTag(storyId, storyTag.id))) || [];

    // Flatten addedTags and removedTags into a single array and ensure all promises resolve before exiting
    await Promise.all([...addedTags, ...removedTags]);
  };

  const handleTagChange = (selections) => {
    setSelectedTags(selections);
  };

  // Submits the story form, creating or updating a story
  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj?.id) {
      // Update existing story
      updateStory(obj.id, { ...formInput, userId: user.id }).then(() => {
        manageStoryTags(obj.id).then(() => {
          router.push(`/stories/${obj.id}`);
        });
      });
    } else {
      // Create new story
      const payload = { ...formInput, userId: user.id };
      createStory(payload).then(({ id }) => {
        manageStoryTags(id).then(() => {
          router.push(`/stories/${id}/add-chapter`); // Redirect to CreateChapter after creating a new story
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Story</h2>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Cover Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* TITLE INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Story Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title for your story" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* TARGET AUDIENCE */}
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

      {/* TARGET CATEGORY */}
      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="categoryId" onChange={handleChange} className="mb-3" value={formInput.categoryId} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* TAG SELECT */}
      <Select instanceId="tagSelect" aria-label="Tags" name="tags" className="mb-3" placeholder="Select or Create a Tag..." value={selectedTags} isMulti onChange={handleTagChange} options={tags.map((tag) => ({ value: tag.id, label: tag.name }))} />

      {/* SUBMIT BUTTON */}
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
