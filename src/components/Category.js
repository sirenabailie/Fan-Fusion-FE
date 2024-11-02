import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function CategoryCard({ categoryObj }) {
  return (
    <Card>
      <Card.Body>{categoryObj.title}</Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
