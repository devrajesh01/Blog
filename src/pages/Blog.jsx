import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getWpposts } from "../api/wpPost";
import { Link } from "react-router-dom";

export const Blog = () => {
    const {
        data,
        error,

        isError,
        isPending,
    } = useQuery({
        queryKey: ["wpposts"],
        queryFn: getWpposts,
       
    });

    if (isPending) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    console.log(data);
    return (
        <div className="text-white grid grid-cols-3 gap-5" >
            {data.map((post) => {
                const thumbnail =
                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                return (
                    <article className="border rounded-lg overflow-hidden" key={post.id}>
                        {thumbnail && (
                            <img
                                src={thumbnail}
                                alt={post.title.rendered}
                                className="w-full h-60 object-cover"
                            />
                        )}

                        <h2>{post.title.rendered}</h2>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.excerpt.rendered,
                            }}
                        />
                        <Link state={{post: post}} to={`/wp-posts/${post.slug}`} >Read More</Link>
                    </article>
                );
            })}
        </div>
    );
};