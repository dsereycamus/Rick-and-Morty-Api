import { Pagination } from "react-bootstrap";

const MyPagination = ({ page, setPage, maxPages }) => {
  const goToPage = (pageN) => setPage(pageN);
  const previousPage = () => goToPage(page === 1 ? 1 : page - 1);
  const nextPage = () => goToPage(page === maxPages ? maxPages : page + 1);

  const maxNumberOfPages = maxPages > 5 ? 5 : maxPages - 1;

  return (
    <Pagination>
      {page !== 1 && (
        <>
          <Pagination.First onClick={() => goToPage(1)} />
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item onClick={() => goToPage(1)}>1</Pagination.Item>
          <Pagination.Ellipsis />
        </>
      )}

      {new Array(maxNumberOfPages)
        .fill(
          maxPages - page > maxNumberOfPages
            ? page
            : maxPages - maxNumberOfPages
        )
        .map((iPage, index) => (
          <Pagination.Item
            onClick={() => goToPage(iPage + index)}
            key={`page-element-${iPage + index}`}
            active={page === iPage + index}
          >
            {iPage + index}
          </Pagination.Item>
        ))}

      {page !== maxPages && (
        <>
          <Pagination.Ellipsis />
          <Pagination.Item onClick={() => goToPage(maxPages)}>
            {maxPages}
          </Pagination.Item>
          <Pagination.Next onClick={nextPage} />
          <Pagination.Last onClick={() => goToPage(maxPages)} />
        </>
      )}
    </Pagination>
  );
};

export default MyPagination;
