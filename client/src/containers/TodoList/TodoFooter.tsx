import React, { FC } from 'react'
import styled from 'styled-components'
import {
  VisibilityFilters,
  VisibilityFilter,
} from '@/graphql/models/VisibilityFilter'
import Link from './Link'

// styles
const TodoFooterWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 15px;
  // height: 20px;
  text-align: center;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`
const TodoCount = styled('span')`
  float: left;
  text-align: left;
`
const TodoFilters = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
  flex-grow: 1;

  display: flex;
  justify-content: center;
`
const TodoFilterItem = styled('li')`
  display: inline;
`

interface FooterProps {
  activeVisibilityFilter: VisibilityFilter
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  setVisibilityFilter: (filter: VisibilityFilter) => void
}

const TodoFooter: FC<FooterProps> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  activeVisibilityFilter,
  setVisibilityFilter,
}) => {
  const itemWord = activeCount === 1 ? 'item' : 'items'

  return (
    <TodoFooterWrapper className="footer">
      <TodoCount className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </TodoCount>
      <TodoFilters className="filters">
        {Object.keys(VisibilityFilters)
          .map((key) => VisibilityFilters[key])
          .map((filter) => (
            <TodoFilterItem key={filter.id}>
              <Link
                active={activeVisibilityFilter.id === filter.id}
                setFilter={() => setVisibilityFilter(filter)}
              >
                {filter.displayName}
              </Link>
            </TodoFilterItem>
          ))}
      </TodoFilters>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </TodoFooterWrapper>
  )
}

export default TodoFooter
