// @flow
import React from "react";
import Relay from "react-relay/classic";
import _ from "lodash";
import { compose } from "recompose";

import type { TBucket } from "@ncigdc/components/Aggregations/types";
import withRouter from "@ncigdc/utils/withRouter";
import { parseFilterParam } from "@ncigdc/utils/uri";
import { ColumnCenter, RowCenter, PieTitle, SelfFilteringPie } from "./";

export type TProps = {
  push: Function,
  query: Object,
  aggregations: {
    demographic__ethnicity: { buckets: [TBucket] },
    demographic__gender: { buckets: [TBucket] },
    demographic__race: { buckets: [TBucket] },
    diagnoses__vital_status: { buckets: [TBucket] },
    project__disease_type: { buckets: [TBucket] },
    project__primary_site: { buckets: [TBucket] },
    project__program__name: { buckets: [TBucket] },
    project__project_id: { buckets: [TBucket] }
  }
};

const enhance = compose(withRouter);

const CohortCasesPiesComponent = ({ aggregations, query, push }: TProps) => {
  const currentFilters = (query &&
    parseFilterParam((query || {}).filters, {}).content) || [];
  const currentFieldNames = currentFilters.map(f => f.content.field);
  return (
    <RowCenter>
      <ColumnCenter>
        <PieTitle>Primary Sites</PieTitle>
        <SelfFilteringPie
          docTypeSingular="case"
          buckets={_.get(aggregations, "project__primary_site.buckets")}
          fieldName="cases.project.primary_site"
          currentFieldNames={currentFieldNames}
          currentFilters={currentFilters}
          query={query}
          push={push}
          path="doc_count"
          height={125}
          width={125}
        />
      </ColumnCenter>
      <ColumnCenter>
        <PieTitle>Projects</PieTitle>
        <SelfFilteringPie
          docTypeSingular="case"
          buckets={_.get(aggregations, "project__project_id.buckets")}
          fieldName="cases.project.project_id"
          currentFieldNames={currentFieldNames}
          currentFilters={currentFilters}
          query={query}
          push={push}
          path="doc_count"
          height={125}
          width={125}
        />
      </ColumnCenter>
      <ColumnCenter>
        <PieTitle>Disease Type</PieTitle>
        <SelfFilteringPie
          docTypeSingular="case"
          buckets={_.get(aggregations, "project__disease_type.buckets")}
          fieldName="cases.project.disease_type"
          currentFieldNames={currentFieldNames}
          currentFilters={currentFilters}
          query={query}
          push={push}
          path="doc_count"
          height={125}
          width={125}
        />
      </ColumnCenter>
      <ColumnCenter>
        <PieTitle>Gender</PieTitle>
        <SelfFilteringPie
          docTypeSingular="case"
          buckets={_.get(aggregations, "demographic__gender.buckets")}
          fieldName="cases.demographic.gender"
          currentFieldNames={currentFieldNames}
          currentFilters={currentFilters}
          query={query}
          push={push}
          path="doc_count"
          height={125}
          width={125}
        />
      </ColumnCenter>
      <ColumnCenter>
        <PieTitle>Vital Status</PieTitle>
        <SelfFilteringPie
          docTypeSingular="case"
          buckets={_.get(aggregations, "diagnoses__vital_status.buckets")}
          fieldName="cases.diagnoses.vital_status"
          currentFieldNames={currentFieldNames}
          currentFilters={currentFilters}
          query={query}
          push={push}
          path="doc_count"
          height={125}
          width={125}
        />
      </ColumnCenter>
    </RowCenter>
  );
};

export const CohortCasesPiesQuery = {
  fragments: {
    aggregations: () => Relay.QL`
      fragment on ECaseAggregations {
        demographic__ethnicity {
          buckets {
            doc_count
            key
          }
        }
        demographic__gender {
          buckets {
            doc_count
            key
          }
        }
        demographic__race {
          buckets {
            doc_count
            key
          }
        }
        diagnoses__vital_status {
          buckets {
            doc_count
            key
          }
        }
        project__disease_type {
          buckets {
            doc_count
            key
          }
        }
        project__primary_site {
          buckets {
            doc_count
            key
          }
        }
        project__project_id {
          buckets {
            doc_count
            key
          }
        }
        project__program__name {
          buckets {
            doc_count
            key
          }
        }
      }
    `
  }
};

const CohortCasesPies = Relay.createContainer(
  enhance(CohortCasesPiesComponent),
  CohortCasesPiesQuery
);

export default CohortCasesPies;