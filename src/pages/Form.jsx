import React, { useState } from "react";
import { updateUserData } from "../api/usersApi";
import { useMutation } from "@tanstack/react-query";

const Form = () => {
  const [data, setData] = useState({
    title: "",
    body: "",
  });

  const updateMutation = useMutation({
    mutationKey: ["postUsers"],
    mutationFn: ({ id, formData }) => updateUserData({ id, formData }),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id: 1,
      formData: data,
    });
  };
  return (
    <form
      className="text-white gap-4 bg-gray-500 flex flex-col w-[600px] mx-auto p-4 rounded"
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        type="text"
        value={data.title}
        onChange={handleChange}
        placeholder="Enter your title here"
        className="outline-0 border transition-colors duration-700 focus:border-amber-400 border-white rounded px-5 py-2"
      />

      <textarea
        name="body"
        value={data.body}
        onChange={handleChange}
        placeholder="Description"
        rows={4}
        className="outline-0 transition-colors duration-700 border focus:border-amber-400 border-white rounded px-5 py-2"
      />
      <input
        type="submit"
        disabled={updateMutation.isPending}
        className="hover:bg-orange-600  disabled:opacity-50 disabled:cursor-not-allowed border cursor-pointer bg-orange-400 w-[110px] mx-auto py-2 rounded transition-all duration-700 "
        value={updateMutation.isPending ? "Updating..." : "Submit"}
      />
    </form>
  );
};
export default Form;