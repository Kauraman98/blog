import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useAuthor } from './useAuthor';
import Image from 'react-bootstrap/Image';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BlogTile({ blog }) {
  const navigate = useNavigate();

  const { title, summary, photourl = "https://placehold.co/160x80/000000/FEE", authorId, updatedOn } = blog;

  const author = useAuthor(authorId);

  return (
    <div className='border-bottom pb-5 mt-3 blog-tile' onClick={e => navigate(`/blog/${blog.id}`)}>
      <div className='d-flex align-items-center mb-2'>
        <Image roundedCircle src={author.photourl} sizes='sm' style={{ width: 50, height: 50 }} width={50} height={50} thumbnail />
        <Link className='app-link' to={`/author/${authorId}`} onClick={e => e.stopPropagation()}>{author.name}</Link>
      </div>
      <div className='d-flex justify-content-between row align-items-center'>
        <div className='blog-tile-content col-9'>
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
        <div className='blog-tile-image col-3'>
          <Image style={{ width: 200, height: 130 }} src={photourl} />
        </div>

      </div>
      <div className='text-muted'>
        {updatedOn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </div>

  );
}

export default BlogTile;