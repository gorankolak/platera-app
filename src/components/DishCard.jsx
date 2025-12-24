import { useNavigate } from "react-router";

const DishCard = ({ dish, action, area }) => {
  const navigate = useNavigate();

  return (
    <article
      className="relative cursor-pointer rounded-3xl bg-white shadow transition hover:shadow-lg"
      onClick={() => navigate(`/dish/${dish.idMeal}`)}
    >
      <img
        src={dish.strMealThumb}
        alt={dish.strMeal}
        className="h-48 w-full rounded-t-3xl object-cover"
      />

      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-lg leading-snug font-semibold">{dish.strMeal}</h3>

        {area && area}

        {action && action}
      </div>
    </article>
  );
};

export default DishCard;
