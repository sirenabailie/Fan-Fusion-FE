import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import { useRouter } from 'next/navigation';

function CategoryCard({ categoryObj }) {
  //  const router = useRouter();

  // const handleCategoryClick = (categoryId) => {
  //   router.push(`/categories/${categoryId}`);
  // };

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
