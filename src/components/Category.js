import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function CategoryCard({ categoryObj }) {
  return (
    <Card>
      <Card.Body>{categoryObj.title}</Card.Body>
      <Button href={`/categories/${categoryObj.id}`}>click me</Button>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CategoryCard;
