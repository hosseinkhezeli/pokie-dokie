import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Story } from '@/types/common.types';
import { useStore } from '@/store/useStore';
import { generateId } from '@/utils/methods';

interface StoryFormProps {
  onCancel: () => void;
  editingStory?: Story;
}

const StoryForm: React.FC<StoryFormProps> = ({ onCancel, editingStory }) => {
  const { updateStory, addStory } = useStore();
  const [title, setTitle] = useState(editingStory?.title || '');
  const [description, setDescription] = useState(
    editingStory?.description || ''
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (editingStory) {
      // Update existing story
      const updatedStory: Story = {
        ...editingStory,
        title: title.trim(),
        description: description.trim(),
      };

      updateStory(updatedStory);
    } else {
      // Create new story
      const newStory: Story = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        votes: [],
        status: 'pending',
        finalEstimate: null,
      };

      addStory(newStory);
    }

    onCancel();
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>
        {editingStory ? 'Edit Story' : 'Add New Story'}
      </h3>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            placeholder='Enter story title'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            placeholder='Enter story description'
          />
        </div>

        {error && (
          <div className='text-red-500 text-sm font-medium'>{error}</div>
        )}

        <div className='flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Cancel
          </button>

          <button
            type='submit'
            className='flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <PlusIcon className='h-4 w-4 mr-1' />
            {editingStory ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryForm;
