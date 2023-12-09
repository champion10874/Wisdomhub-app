import { Field, QueryDslRangeQuery, SearchHit } from '@elastic/elasticsearch/lib/api/types';
export type TSearchResult = {
    hits: SearchHit[];
    total: number;
};
export type THitsTotal = {
    value: number;
    relation: string;
};
export type TQueryList = {
    query_string?: TQueryString;
    range?: Partial<Record<Field, QueryDslRangeQuery>>;
    term?: TTerm;
};
export type TQueryString = {
    fields: string[];
    query: string;
};
export type TTerm = {
    active: boolean;
};
export type TPaginateProps = {
    from: string;
    size: number;
    type: string;
};
