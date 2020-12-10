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
  border-bottom: 1px solid #e6e6e6;
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
const ButtonClear = styled('button')`
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  appearance: none;
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
    <TodoFooterWrapper>
      <TodoCount>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </TodoCount>
      <TodoFilters>
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
        <ButtonClear onClick={onClearCompleted}>Clear completed</ButtonClear>
      )}
    </TodoFooterWrapper>
  )
}

export default TodoFooter
