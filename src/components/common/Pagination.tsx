import _ from "lodash";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  onPageChange: (index: number) => void;
  currentPage: number;
}

const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item " + (page === currentPage ? "active" : "")}
            key={"page_" + page}
          >
            <button
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
