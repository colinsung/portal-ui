/* @flow */

import React from 'react';
import Relay from 'react-relay';

import AnnotationTable from './AnnotationTable';
import AnnotationsAggregations from './AnnotationsAggregations';

export type TProps = {
  viewer: {
    annotations: {
      aggregations: string,
      hits: string,
    },
  },
};

export const AnnotationsPageComponent = (props: TProps) => (
  <div>
    <AnnotationsAggregations aggregations={props.viewer.annotations.aggregations} />
    <AnnotationTable hits={props.viewer.annotations.hits} />
  </div>
);

export const AnnotationsPageQuery = {
  initialVariables: {
    first: 0,
    offset: 0,
    filters: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Root {
        annotations {
          aggregations(filters: $filters) {
            ${AnnotationsAggregations.getFragment('aggregations')}
          }
          hits(first: $first offset: $offset, filters: $filters) {
            ${AnnotationTable.getFragment('hits')}
          }
        }
      }
    `,
  },
};

const AnnotationsPage = Relay.createContainer(
  AnnotationsPageComponent,
  AnnotationsPageQuery
);

export default AnnotationsPage;
