import React, { useState } from "react";
import { Button } from '@chakra-ui/react'
import isUrl from "is-url";
import axios from "axios";
import { useAuth } from "../../store/useAuth";
import { FileUploadWrapper } from "./FileUploadWrapper";

export const FromYtubeUrl = () => {
    const [error, setError] = useState(false);

    const { user } = useAuth((store) => ({
        user: store.user,
    }));

    const saveAsAudio = async (e) => {
        e.preventDefault();
        const url = e.target.elements.url.value;
        setError(false);
        if (isUrl(url)) {
            try {
                await axios.post("/api/ytTranscribe", { ytUrl: url, userId: user.uid });
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            setError(true);
        }
    };

    return (
        <>
            <FileUploadWrapper>
                <form onSubmit={saveAsAudio}>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                className={`input is-fullwidth ${error ? "is-danger" : ""}`}
                                type="text"
                                name="url"
                                placeholder="Enter Youtube URL. Ex: https://www.youtube.com/watch?v=abcdef"
                            />
                            {error && <p className="has-text-danger">Invalid URL</p>}
                        </div>
                        <div className="control">
                            <Button
                                type="submit"
                                border='2px'
                                borderColor='black'
                                variant='outline'>
                                Upload
                            </Button>
                        </div>
                    </div>
                </form>
            </FileUploadWrapper>
        </>
    );
};