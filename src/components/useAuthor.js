import React, { useEffect } from "react";
import { getAuthorProfile } from "../services/author-profile-service";
export function useAuthor(authorId) {
    const [author, setAuthor] = React.useState({});

    useEffect(() => {

        if (authorId) {
            getAuthorProfile(authorId).then((author) => {
                setAuthor(author);
            });
        }
    }, [authorId]);


    return author;
}