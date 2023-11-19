type ListRecordsGeneric<RecordFilterOptions> = {

    filterRecordOptions?: RecordFilterOptions,

    paginationOptions?: {
        page: number

        limit: number
    }
}

export default ListRecordsGeneric