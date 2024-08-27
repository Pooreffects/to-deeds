import { useState, useEffect, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DeedForm from './DeedForm';
import useKanban from '../hooks/useKanban';

interface EditDeedProps {
  columnId: string;
  deedId: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditDeed({
  columnId,
  deedId,
  isEditing,
  setIsEditing,
}: EditDeedProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { updateDeed, deeds, setDeeds } = useKanban();

  useEffect(() => {
    if (isEditing) {
      const currentDeed = deeds.find((deed) => deed.id === deedId);
      if (currentDeed) {
        setTitle(currentDeed.title);
        setDescription(currentDeed.description);
      }
    }
  }, [isEditing, deeds, deedId]);

  const handleEdit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title.trim() || !description.trim()) return;

      try {
        await updateDeed(deedId, title.trim(), description.trim(), columnId);

        // Find the index of the deed to update in the current state
        const deedIndex = deeds.findIndex((deed) => deed.id === deedId);

        if (deedIndex !== -1) {
          // Create a shallow copy of the deeds array
          const updatedDeeds = [...deeds];

          // Update the specific deed at the found index
          updatedDeeds[deedIndex] = {
            ...updatedDeeds[deedIndex],
            title: title.trim(),
            description: description.trim(),
            columnId,
          };

          // Update the state with the modified deeds array
          setDeeds(updatedDeeds);

          // Close the editing form
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error updating deed:', error);
      }
    },
    [
      deedId,
      title,
      description,
      columnId,
      deeds,
      updateDeed,
      setIsEditing,
      setDeeds,
    ]
  );

  return (
    <>
      {isEditing ? (
        <DeedForm
          mode='edit'
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          setIsEditing={setIsEditing}
          handleEdit={handleEdit}
        />
      ) : (
        <motion.button
          layout
          className='w-full flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
          onClick={() => setIsEditing(true)}
        >
          <span>Edit Deed</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
}
