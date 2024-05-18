import { useState } from 'react';

function CreatePost({ onCancel, onSubmit }) {
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit function with the post content
    onSubmit(content);
    // Clear the input field after submission
    setContent('');
  };

  const handleCancel = () => {
    // Call the onCancel function to hide the CreatePost component
    onCancel();
  };

  return (
    <div className="create-post-container">
      <div className="create-post">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder={`What's on your mind?`}
            value={content}
            onChange={handleChange}
            rows={4}
            cols={50}
          />
          <div className="create-post-buttons">
            <button type="submit" className="post-button">Post</button>
            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
