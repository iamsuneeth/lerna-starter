export interface PagedResponseModel<Type> {
    page: number;
    total_pages: number;
    total_results: number;
    results: Type[];
}

export interface PagedState<Type> {
    pageInfo: PageInfo;
    items: Type[];
}

export interface PageInfo {
    page: number;
    totalPages: number;
    totalItems: number;
}

export interface State<DATA> {
    loading: boolean;
    error: string | undefined;
    data: DATA;
}

export interface DetailsState<DATA> {
    [key: string]: DATA;
}
