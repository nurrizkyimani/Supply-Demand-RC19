import React from 'react'
import { useTable, usePagination } from 'react-table'
import {useMediaQuery} from '../../hooks/medquery-hook';
import './Table.module.css'

const Table = ({ columns, data, title, isLandingPage, donasi }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
          columns,
          data,
          initialState: { pageIndex: 0 }
        },usePagination)
    
    const mediaQuery = useMediaQuery('(max-width: 1260px)');
    const mediaQuery2 = useMediaQuery('(max-width: 768px)');

    return (
        <div className="flex-auto">
            {/* <h1 className={`md:text-3xl text-2xl font-bold md:my-10 ${isLandingPage ? 'md:ml-10' : 'md:ml-0'} mt-0 mb-5 ml-5`}>{title}</h1> */}
            <div className={`${donasi ? 'w-full' : 'w-10/12'} overflow-y-hidden h-full ${isLandingPage && 'lg:pb-32 mx-auto'}`}>
                <div className="w-full overflow-y-auto h-full">
                    <table {...getTableProps()} className={`${donasi && 'md:text-base text-sm'} w-full`}>
                        <thead>
                        {
                            headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="border-b bg-blue-800 text-white">
                                {
                                    headerGroup.headers.map(column => {
                                        if(column.Header === 'No'){
                                            return (
                                                <th {...column.getHeaderProps()} className={`${donasi ? 'w-1/12 pl-1 pr-0' : 'px-3'} text-left px-3 py-4`}>{column.render('Header')}</th>
                                            )
                                        }
                                        else{
                                            return (
                                                <th {...column.getHeaderProps()} className={`${donasi ? 'w-1/12 pl-1 pr-0' : 'px-3'} text-left`}>{column.render('Header')}</th>
                                            )
                                        }
                                    })
                                }
                                </tr>
                            ))
                        }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()} className="border-b-2">
                                {
                                    row.cells.map(cell => {
                                        if(cell.column.Header === 'No'){
                                            return <td {...cell.getCellProps()} className={`pl-4 py-3 text-sm font-medium`}>{i+1}</td>        
                                        }
                                        else if(cell.column.Header === 'Update'){
                                            return <td {...cell.getCellProps()} className={`pl-4 py-3`} style={styles2.container(mediaQuery2)}>{cell.render('Cell')}</td>    
                                        }
                                        else{
                                            return <td {...cell.getCellProps()} className='pl-4 py-3 text-sm font-medium' style={{textTransform: 'capitalize'}}>{cell.render('Cell')}</td>
                                        }
                                    })
                                }
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className="pagination mt-4">
                    <span style={styles.container(mediaQuery)} className="text-sm font-semibold">
                        10 Baris per halaman
                        {/* <select
                        className="px-4 mx-4 bg-gray-400 text-blue-800"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            {pageSize}
                            </option>
                        ))}
                        </select> */}
                    </span>

                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="font-semibold text-sm rounded-l-md bg-gray-400 px-2 text-blue-800 h-8">
                    {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-8">
                    {'<'}
                    </button>
                    <span className="bg-white text-sm px-8 h-8 inline-block font-semibold">
                        {pageIndex + 1} dari {pageOptions.length}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-8">
                    {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="font-semibold text-sm rounded-r-md bg-gray-400 px-2 text-blue-800 h-8">
                    {'>>'}
                    </button>

                    <span style={styles.container(mediaQuery)} className="text-sm font-semibold mx-4">
                    Go to page:{' '}
                    <input
                        className="inline-block h-8 pl-2 font-semibold"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                    </span>{' '}
                    
                    {/* <button onClick={() => previousPage()} disabled={!canPreviousPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-8">
                    {'<'}
                    </button>
                    <PageList count={pageOptions.length} />    
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="font-semibold xl:text-xl text-lg bg-gray-400 px-2 text-blue-800 h-8">
                    {'>'}
                    </button> */}

                </div>
            </div>
        </div>
    )
}

const styles = {
    container: mediaQuery => ({
        margin: mediaQuery && '0',
        display: mediaQuery ? 'inline-block' : 'inline',
        width: mediaQuery ? '100%' : '10%'
    })
};

const styles2 = {
    container: mediaQuery => ({
        paddingLeft: mediaQuery && '0'
    })
};

export default Table
