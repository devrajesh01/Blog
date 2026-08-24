import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { lazy, useState } from "react";
import {
    deleteUserData,
    getUsersData,
    updateUserData,
} from "../api/usersApi";
import { Link } from "react-router-dom";
const FormOpen = lazy(() => import("../popups/Dialogue"));
const Players = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const queryClient = useQueryClient();

    const { data, isPending } = useQuery({
        queryKey: ["postUsers"],
        queryFn: getUsersData,
    });
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteUserData(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData(["postUsers"], (currentData) => {
                return currentData?.filter((post) => post.id !== id);
            });
        },
    });
    const updateMutation = useMutation({
        mutationFn: updateUserData,
        onSuccess: (updatedPost) => {
            queryClient.setQueryData(["postUsers"], (currentData) => {
                return currentData?.map((user) =>
                    user.id === updatedPost.id ? updatedPost : user
                );
            });
            setIsOpen(false);
            setSelectedUser(null);
        },
    });
    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };
    if (isPending) return <h2>Loading...</h2>;
    return (
        <>
            <ul className="text-white flex flex-wrap gap-4">
                {data.map((user) => (
                    <li
                        key={user.id}
                        className="mb-6 border border-white min-w-[280px] flex-1 rounded px-10 py-6"
                    >
                        <h1>
                            {user.title} userId:{user.id}
                        </h1>
                        <p>{user.body}</p>
                        <div className="flex gap-2">
                            <button
                                disabled={deleteMutation.isPending && deleteMutation.variables === user.id}
                                onClick={() => deleteMutation.mutate(user.id)}
                                className="cursor-pointer disabled:cursor-not-allowed
                                disabled:opacity-50 rounded-md border border-orange-500 px-4 py-1.5 text-sm font-medium text-orange-500"
                            >
                                {deleteMutation.isPending &&
                                    deleteMutation.variables === user.id
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                            <Link
                                className="bg-white text-black rounded px-4 py-1"
                                state={{ userData: user }}
                                to="/playes/our-own-posts"
                            >
                                View
                            </Link>
                            <button
                                onClick={() => handleUpdateClick(user)}
                                className="bg-green-600 rounded py-1 px-4 cursor-pointer"
                            >
                                Update
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {isOpen && selectedUser && (
                <FormOpen
                    user={selectedUser}
                    onClose={() => {
                        setIsOpen(false);
                        setSelectedUser(null);
                    }}
                    onUpdate={(formData) => {
                        updateMutation.mutate({
                            id: selectedUser.id,
                            formData,
                        });
                    }}
                    isUpdating={updateMutation.isPending}
                />
            )}
        </>
    );
};

export default Players;