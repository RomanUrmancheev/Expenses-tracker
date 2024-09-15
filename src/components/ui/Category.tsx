import { useAppSelector } from "../../hooks/reduxHooks";
import {
  getCategoriesList,
  getCategoriesLoadingStatus,
} from "../../store/categories";

interface CategoryProps {
  categoryId: string;
}

const Category = ({ categoryId }: CategoryProps) => {
  const categories = useAppSelector(getCategoriesList());
  const isLoading = useAppSelector(getCategoriesLoadingStatus());

  if (!isLoading) {
    const category = categories.find((category) => category._id === categoryId);
    return (
      <span className={"badge m-1 bg-" + category?.color} key={categoryId}>
        {category?.title}
      </span>
    );
  } else {
    return "Loading";
  }
};

export default Category;
