import React, { useEffect, useState } from "react";
const Dialogue = ({ user, onClose, onUpdate, isUpdating }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState(null)
  useEffect(() => {
    if (user) {
      setFormData({
        title: user.title,
        body: user.body,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      return setError("Please add title and body text");
    }
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-700 text-white w-[500px] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Update Post #{user.id}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border border-white rounded px-4 py-2 outline-none"
          />

          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={5}
            placeholder="Body"
            className="border border-white rounded px-4 py-2 outline-none"
          />
          {
            error &&
            <p className="text-orange-500 " >{error}</p>
          }

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded cursor-pointer "
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Dialogue;