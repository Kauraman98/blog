import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useAuthor } from './useAuthor';
import Image from 'react-bootstrap/Image';

function BlogTile({ blog }) {

  const { title, summary, photourl = "https://placehold.co/160x80/000000/FEE", authorId } = blog;

  const author = useAuthor(authorId);

  return (
    <Card style={{ width: '18rem' }} className='p-0 m-2'>
      <Card.Img variant="top" width='100%' className='pl-0' style={{ height: '180px', padding: 0 }} src={photourl} />
      <Card.Body>
        <Card.Title>title</Card.Title>
        <Card.Text>
          Summary
        </Card.Text>

        <Button variant="primary"><Link className='app-link' style={{ color: 'inherit' }} to={`/blog/${blog.id}`}>Read more </Link></Button>
        <Card.Footer className='d-flex align-items-center'>
          <Image roundedCircle src={author.photourl} sizes='sm' style={{ width: 50, height: 50 }} width={50} height={50} thumbnail /> {author.name}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default BlogTile;