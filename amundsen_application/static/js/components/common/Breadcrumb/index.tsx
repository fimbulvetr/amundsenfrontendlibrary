import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.scss';
import { GlobalState } from 'ducks/rootReducer';
import { ResourceType } from 'interfaces/Resources';

export interface OwnProps {
  path?: string;
  text?: string;
}

export interface StateFromProps {
  searchTerm: string;
  selectedTab: ResourceType;
  dashboardIndex: number;
  tableIndex: number;
  userIndex: number;
}

export type BreadcrumbProps = OwnProps & StateFromProps;

export const Breadcrumb: React.SFC<BreadcrumbProps> = (props) => {
  let path = props.path;
  let text = props.text;
  if (!path && !text) {
    path = '/';
    text = 'Home';
    if (props.searchTerm) {
      let index = 0;
      switch (props.selectedTab) {
        case ResourceType.table:
          index = props.tableIndex;
          break;
        case ResourceType.dashboard:
          index = props.dashboardIndex;
          break;
        case ResourceType.user:
          index = props.userIndex;
          break;
      }

      path = `/search?searchTerm=${props.searchTerm}&selectedTab=${props.selectedTab}&pageIndex=${index}`;
      text = 'Search Results';
    }
  }
  return (
    <div className="amundsen-breadcrumb">
      <Link to={path} className='btn btn-flat-icon title-3'>
        <img className='icon icon-left'/>
        <span>{text}</span>
      </Link>
    </div>
  );
};

export const mapStateToProps = (state: GlobalState) => {
  return {
    searchTerm: state.search.search_term,
    selectedTab: state.search.selectedTab,
    dashboardIndex: state.search.dashboards.page_index,
    tableIndex: state.search.tables.page_index,
    userIndex: state.search.users.page_index,
  };
};

export default connect<StateFromProps>(mapStateToProps, null)(Breadcrumb);
