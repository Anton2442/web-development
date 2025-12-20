export default function PostsPage({ posts }) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3 className="post-card-title">{post.title}</h3>
          <p className="post-card-text">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

