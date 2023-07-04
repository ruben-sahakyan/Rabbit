import "./postsceleton.css";


export default function PostSceleton() {
    return (
        <div className="one-post-sceleton">
            <div className="one-post-header-sceleton">
                <div className="one-post-autor-sceleton">
                    <div className="post-autor-avatar-sceleton"></div>
                    <div className="post-info-sceleton">
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className="one-post-body-sceleton">
                <div className="one-post-body-img-sceleton"></div>
            </div>
            <div className="one-post-footer-sceleton">
                <div className="one-post-content-sceleton">
                    <p className="one-post-content-text-sceleton"></p>
                    <p className="one-post-content-text-sceleton"></p>
                    <p className="one-post-content-text-sceleton"></p>
                </div>
            </div>
        </div>
    );
}