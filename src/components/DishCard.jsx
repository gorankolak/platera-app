import { useNavigate } from "react-router";

const DishCard = ({ dish }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer bg-white rounded shadow hover:shadow-lg transition"
      onClick={() => navigate(`/dish/${dish.idMeal}`)}
    >
      <img
        src={dish.strMealThumb}
        alt={dish.strMeal}
        className="w-full h-48 object-cover rounded-t"
      />
      <div className="p-2">
        <h3 className="text-lg font-medium">{dish.strMeal}</h3>
      </div>
    </div>
  );
};

export default DishCard;
