import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function BlogTile() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://placehold.co/100x80/000000/FEE" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary"><Link to="/blog">Read more </Link></Button>
      </Card.Body>
    </Card>
  );
}

export default BlogTile;