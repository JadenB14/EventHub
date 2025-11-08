import api from "./api"
import CommentType from "../../../types/comment.ts"

export const createComment = async (token: string): Promise<CommentType> => {
    const response = await api.post("/api/comments/", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAllCommentsForEvent = async (eventId: string): Promise<CommentType[]> => {
    const response = await api.get(`/api/comments/${eventId}`, {},)
    return response.data;
}