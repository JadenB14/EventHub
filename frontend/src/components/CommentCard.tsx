import { Link } from "react-router-dom"
import CommentType from "../../types/comment"

export default function CommentCard({ comment }: { comment: CommentType}) {
    return (
        <div className="m-10">
            <Link
                to={`/profile/${comment.authorId}`}
                className=""
            >
            <h2>{comment.author?.name}</h2>
            </Link>
            <p>{comment.content}</p>
        </div>
    )
}