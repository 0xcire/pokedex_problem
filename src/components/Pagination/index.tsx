import { useTableStore } from '../../store/store';

import { usePaginate } from '../../hooks/usePagination';

import PageBtn from './PageBtn';

const Pagination = () => {
  const currentPage = useTableStore((state) => state.currentPage);
  const setCurrentPage = useTableStore((state) => state.setCurrentPage);
  const resultsPerPage = useTableStore((state) => state.resultsPerPage);
  const resultsTotal = useTableStore((state) => state.resultsTotal);

  const totalPages = Math.ceil(resultsTotal / resultsPerPage);

  const paginationRange = usePaginate(currentPage, totalPages);

  const start = currentPage * resultsPerPage - resultsPerPage + 1;
  const end = currentPage * resultsPerPage;

  const onFirstPage = currentPage === 1;
  const onLastPage = currentPage === totalPages;

  return (
    <div className='mx-auto flex flex-col items-start justify-between px-2 py-2 md:flex-row md:items-center'>
      <div className='flex flex-col'>
        <p className='mr-4 text-sm'>
          # {start} - {end}
        </p>
      </div>

      <div className='join mx-0 mt-2 md:mt-0'>
        <PageBtn
          value={'<'}
          isDisabled={onFirstPage}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {paginationRange.map((pageIndex, index) => {
          if (pageIndex === 'dots') {
            return (
              <PageBtn
                key={`${pageIndex}${index}-btn`}
                value={pageIndex}
                isDots={true}
              />
            );
          }

          return (
            <PageBtn
              key={`${pageIndex}-btn`}
              value={pageIndex}
              isActive={pageIndex === currentPage}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                setCurrentPage(Number(e.currentTarget.innerText))
              }
            />
          );
        })}
        <PageBtn
          value={'>'}
          isDisabled={onLastPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;