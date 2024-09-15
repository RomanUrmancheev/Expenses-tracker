import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  getCategoriesList,
  getCategoriesLoadingStatus,
} from "../../../store/categories";
// import { ICategories, ITransaction } from "../../../interfaces";
import {
  deleteTransaction,
  getTransactions,
} from "../../../store/transactions";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import Pagination from "../Pagination";
import TransactionsTable from "../../ui/TransactionsTable";
import { useHistory } from "react-router";
import { ITransaction } from "../../../interfaces";

interface ISortBy {
  item: string;
  path: string;
  order: boolean | "asc" | "desc";
}

const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const categories = useAppSelector(getCategoriesList());
  const categoriesLoading = useAppSelector(getCategoriesLoadingStatus());
  //   const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState({
    item: "title",
    path: "title",
    order: "asc",
  } as ISortBy);
  //   const [searchData, setSearchData] = useState("");
  const pageSize = 10;
  const history = useHistory();

  const transactionsList = useAppSelector(getTransactions());
  const [transactions, setTransactions] = useState<ITransaction[]>();

  //   const handleProfessionSelect = (item: ICategories) => {
  //     setSelectedCategory(item._id);
  //     setSearchData("");
  //   };

  useEffect(() => {
    setTransactions(transactionsList);
  }, [transactionsList]);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item: ISortBy) => {
    setSortBy(item);
  };

  //   function filterTransactions(transactions: ITransaction[]) {
  //     const filteredTransactions = searchData
  //       ? transactions.filter(
  //           (transaction) =>
  //             transaction.title
  //               .toLowerCase()
  //               .indexOf(searchData.toLowerCase()) !== -1
  //         )
  //       : Object.keys(selectedCategory).length > 0
  //       ? transactions.filter(
  //           (transaction) => transaction.category === selectedCategory
  //         )
  //       : transactions;
  //     return filteredTransactions;
  //   }

  if (transactions) {
    const filteredTransactions = transactions; // filterTransactions(transactions);

    const count = filteredTransactions.length;
    const sortedTransactions = _.orderBy(
      filteredTransactions,
      [sortBy.path],
      [sortBy.order]
    );

    const handleEdit = (transactionId: string) => {
      history.push(`transactions/edit/${transactionId}`);
    };

    const handleDelete = (id: string) => {
      dispatch(deleteTransaction(id));
      const updatedList = transactions.filter((item) => item._id !== id);
      setTransactions(updatedList);
    };

    // const handleSearch = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    //   setSelectedCategory("");
    //   setSearchData(target.value);
    // };

    const transactionsCrop = paginate(
      sortedTransactions,
      currentPage,
      pageSize
    );
    // const clearFilter = () => {
    //   setSelectedCategory("");
    // };

    return (
      <div className="d-flex">
        {categories && !categoriesLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-5">
            {/* <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            /> */}
            {/* <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Reset filter
            </button> */}
          </div>
        )}
        <div className="d-flex flex-column">
          {/* <SearchForm
            name="search"
            value={searchData}
            onChange={handleSearch}
            placeholder="Search..."
          /> */}
          {count > 0 && (
            <TransactionsTable
              transactions={transactionsCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};
export default TransactionHistory;
