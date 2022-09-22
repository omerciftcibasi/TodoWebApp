import React from 'react';

const TodoFilters = ({
  currentFilter,
  filterResultsFn
}) => {
  const filterResultsHandler = (filter) => () => {
    filterResultsFn(filter);
  };

  return (
    <div className="container">

  <div className="row align-items-end">
    <span className="Show">
    Show:
    </span>
    <span className={currentFilter === 'all' ? 'SelectedFilter' : 'NonSelectedFilter' } onClick={filterResultsHandler('all')}>
    All
    </span>
    <span className={currentFilter === 'completed' ? 'SelectedFilter' : 'NonSelectedFilter' } onClick={filterResultsHandler('completed')}>
    Completed
    </span>
    <span className={currentFilter === 'active' ? 'SelectedFilter' : 'NonSelectedFilter' } onClick={filterResultsHandler('active')}>
    Incompleted
    </span>
  </div>

    </div>
  );
};

export default TodoFilters;
