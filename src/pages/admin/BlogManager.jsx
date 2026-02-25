import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus } from 'lucide-react';

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', excerpt: '', content: '', image_url: '', published: true });
    const [uploading, setUploading] = useState(false);
    const [editUploading, setEditUploading] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [editStatus, setEditStatus] = useState('');

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (data) setPosts(data);
        setLoading(false);
    };

    const deletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            await supabase.from('blog_posts').delete().eq('id', id);
            fetchPosts();
        }
    };

    const startEdit = (post) => { setEditingId(post.id); setEditPost({ ...post }); setEditStatus(''); };
    const cancelEdit = () => { setEditingId(null); setEditPost(null); setEditStatus(''); };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('blog_posts').update({
            title: editPost.title,
            excerpt: editPost.excerpt,
            content: editPost.content,
            image_url: editPost.image_url,
            published: editPost.published
        }).eq('id', editPost.id);
        if (error) { setEditStatus(`Error: ${error.message}`); return; }
        cancelEdit();
        fetchPosts();
    };

    const handleImageUpload = async (event, isEdit) => {
        const file = event.target.files[0];
        if (!file) return;
        const setUploadingFn = isEdit ? setEditUploading : setUploading;
        const setStatusFn = isEdit ? setEditStatus : setFormStatus;
        try {
            setUploadingFn(true);
            setStatusFn('Uploading image...');
            const fileExt = file.name.split('.').pop();
            const filePath = `blog/${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) { setStatusFn(`Upload failed: ${uploadError.message}`); return; }
            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            if (isEdit) {
                setEditPost(prev => ({ ...prev, image_url: data.publicUrl }));
            } else {
                setNewPost(prev => ({ ...prev, image_url: data.publicUrl }));
            }
            setStatusFn('Image ready. Click Save to confirm.');
        } catch (err) {
            setStatusFn(`Error: ${err.message}`);
        } finally {
            setUploadingFn(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('blog_posts').insert([newPost]);
        if (error) {
            const msg = `Error saving post: ${error.message}`;
            setFormStatus(msg);
            window.alert(msg);
            return;
        }
        setIsAdding(false);
        setNewPost({ title: '', excerpt: '', content: '', image_url: '', published: true });
        setFormStatus('');
        fetchPosts();
    };

    const imgInput = (imageUrl, onChangeFile, onChangeUrl, up, remove) => (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {imageUrl && (
                <div style={{ width: '100px', height: '75px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'block', padding: '10px', border: '2px dashed #e5e7eb', borderRadius: '6px', textAlign: 'center', cursor: up ? 'not-allowed' : 'pointer', backgroundColor: '#f9fafb', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {up ? 'Uploading...' : 'Upload Image File'}
                    <input type="file" accept="image/*" onChange={onChangeFile} disabled={up} style={{ display: 'none' }} />
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR Link:</span>
                    <input
                        type="text"
                        value={imageUrl || ''}
                        onChange={onChangeUrl}
                        placeholder="https://example.com/image.jpg"
                        style={{ flex: 1, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.85rem' }}
                    />
                </div>

                {imageUrl && <button type="button" onClick={remove} style={{ fontSize: '0.8rem', color: '#ef4444', background: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}>Remove Image</button>}
            </div>
        </div>
    );

    if (loading) return <p>Loading blog posts...</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button onClick={() => { setIsAdding(!isAdding); setFormStatus(''); setEditingId(null); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Blog Post'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleCreate} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3>Create New Blog Post</h3>
                    {formStatus && <div style={{ padding: '10px', backgroundColor: formStatus.includes('Error') || formStatus.includes('failed') ? '#fef2f2' : '#f0f9ff', color: formStatus.includes('Error') || formStatus.includes('failed') ? '#dc2626' : '#0369a1', borderRadius: '6px' }}>{formStatus}</div>}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title *</label>
                            <input type="text" required value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Excerpt</label>
                            <textarea value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })} rows={2} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Content * (HTML allowed)</label>
                            <textarea required value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} rows={10} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'monospace' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Image</label>
                        {imgInput(
                            newPost.image_url,
                            (e) => handleImageUpload(e, false),
                            (e) => setNewPost({ ...newPost, image_url: e.target.value }),
                            uploading,
                            () => setNewPost({ ...newPost, image_url: '' })
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" id="new-published-blog" checked={newPost.published} onChange={e => setNewPost({ ...newPost, published: e.target.checked })} />
                            <label htmlFor="new-published-blog">Publish immediately</label>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={uploading}>Save Post</button>
                </form>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Post Title</th>
                            <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Status</th>
                            <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No blog posts found. Add one to get started.</td></tr>
                        ) : (
                            posts.map((post) => (
                                <React.Fragment key={post.id}>
                                    <tr style={{ borderBottom: editingId === post.id ? 'none' : '1px solid #e5e7eb', backgroundColor: editingId === post.id ? '#fffbf0' : 'white' }}>
                                        <td style={{ padding: '15px 20px', fontWeight: '500' }}>{post.title}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: post.published ? '#dcfce7' : '#f3f4f6', color: post.published ? '#166534' : '#4b5563' }}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 20px', display: 'flex', gap: '12px' }}>
                                            <button onClick={() => editingId === post.id ? cancelEdit() : startEdit(post)} style={{ color: editingId === post.id ? '#6b7280' : 'var(--color-terracotta)', fontWeight: '500', fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                                                {editingId === post.id ? 'Cancel' : 'Edit'}
                                            </button>
                                            <button onClick={() => deletePost(post.id)} style={{ color: '#ef4444', fontWeight: '500', fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>Delete</button>
                                        </td>
                                    </tr>
                                    {editingId === post.id && editPost && (
                                        <tr style={{ borderBottom: '2px solid var(--color-terracotta)' }}>
                                            <td colSpan="3" style={{ padding: '25px', backgroundColor: '#fffbf0' }}>
                                                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                    <h4 style={{ color: 'var(--color-charcoal)', marginBottom: '5px' }}>Editing: {post.title}</h4>
                                                    {editStatus && <div style={{ padding: '10px', backgroundColor: editStatus.includes('Error') ? '#fef2f2' : '#f0f9ff', color: editStatus.includes('Error') ? '#dc2626' : '#0369a1', borderRadius: '6px' }}>{editStatus}</div>}
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title</label>
                                                            <input type="text" required value={editPost.title} onChange={e => setEditPost({ ...editPost, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Excerpt</label>
                                                            <textarea value={editPost.excerpt} onChange={e => setEditPost({ ...editPost, excerpt: e.target.value })} rows={2} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Content * (HTML allowed)</label>
                                                            <textarea required value={editPost.content} onChange={e => setEditPost({ ...editPost, content: e.target.value })} rows={10} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'monospace' }} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Image</label>
                                                        {imgInput(
                                                            editPost.image_url,
                                                            (e) => handleImageUpload(e, true),
                                                            (e) => setEditPost({ ...editPost, image_url: e.target.value }),
                                                            editUploading,
                                                            () => setEditPost({ ...editPost, image_url: '' })
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <input type="checkbox" id={`edit-pub-blog-${post.id}`} checked={editPost.published} onChange={e => setEditPost({ ...editPost, published: e.target.checked })} />
                                                            <label htmlFor={`edit-pub-blog-${post.id}`}>Published</label>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <button type="submit" className="btn-primary" disabled={editUploading}>Save Changes</button>
                                                        <button type="button" onClick={cancelEdit} style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', background: 'white' }}>Cancel</button>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogManager;
