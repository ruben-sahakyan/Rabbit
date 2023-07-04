import "./onecomment.css";

export default function OneComment({props}) {
    const { autor, content } = props;
    return <div className="comment">
        {autor ? (
            <div className="comment-autor">
                <img className="comment-autor-avatar" src={`http://localhost:5000/uploads/${autor.avatar}`} alt="img"/>
            </div>
        ) : (
            <div className="comment-autor">
                <img className="comment-autor-avatar-unknown" src={`http://localhost:5000/uploads/bunnydefaultimage.png`} alt="img"/>
            </div>
        )}
        <div className="comment-body">
            {autor ? (
                <p className="comment-autor-name">{autor.email}</p>
            ) : (
                <p className="comment-autor-name">unknown</p>
            )}
            <p className="comment-text">
                { content }
            </p>
        </div>
    </div>
}