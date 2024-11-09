import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function CategoryCard({ categoryObj }) {
  return (
    <Card>
      <Button href={`/categories/${categoryObj.id}`}>{categoryObj.title}</Button>
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
