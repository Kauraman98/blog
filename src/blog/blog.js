import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogTile from '../components/blog-tile';
import BlogPostPage from './blog-post';


const samplePost = {
  title: "Sample Blog Post",
  date: "May 22, 2024",
  content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
    pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
    Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,
    in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
    per conubia nostra, per inceptos himenaeos.
    
    Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.
    Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl.
  `,
  author: {
    name: "John Doe",
    image: "https://via.placeholder.com/50"
  },
  coverImage: "https://via.placeholder.com/800x400"
};
function Blog() {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
 <BlogPostPage {...samplePost}/>
      </Row>
      
    </Container>
  );
}

export default Blog;