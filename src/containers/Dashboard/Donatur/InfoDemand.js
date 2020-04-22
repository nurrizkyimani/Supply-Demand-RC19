import React, {useState, useMemo, useContext, useEffect} from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import {AuthContext} from '../../../context/auth-context'
import {useHttpClient} from '../../../hooks/http-hook'

import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import Title from '../../../components/Dashboard/Title'

const InfoDemand = () => {
    const auth = useContext(AuthContext)
    const {isLoading, error, sendRequest} = useHttpClient()
    const columns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Nama Barang',
            accessor: data => {
                let output = []
                data.requestItems.map(request => {
                    output.push(request.item.name)
                })
                return output.join(', ')
            }
        },
        {
            Header: 'Kuantitas',
            accessor: data => {
                let output = []
                data.requestItems.map(request => {
                    output.push(`${Math.round(request.quantity)} ${request.unit.name}`)
                })
                return output.join(', ')
            }
        }
    ]

    const [dataDemand, setDataDemand] = useState([])
    
    // useEffect(() => {
    //     console.log(dataDemand)
    // }, [dataDemand])
    
    useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
                'GET',
                null,
                {'Accept': 'application/json', 'Content-Type': 'application/json'}
            ).then(responseData => {
                let temp = []
                if(responseData){
                    responseData.data.forEach(data => {
                        temp = [...temp, { requestItems: data.requestItems }]
                    })
                }
                setDataDemand(temp)
            })
        }
        if(auth.token){
            fetchItems()
        }
    }, [auth.token, sendRequest])

    return (
        <React.Fragment>
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-r-lg">
                <h5 className="font-semibold text-md text-white">{`Dashboard Donatur`} </h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="md:pt-0 pt-10 md:pb-0 pb-24 flex">
                <Sidebar role="Donatur" name={auth.name} links={links} />
                <div className="flex w-full flex-col md:p-12 sm:ml-6" style={{paddingLeft: '5px', paddingRight: '5px'}}>
                    <Title>Info Demand</Title>
                    <div className="h-2"></div>
                    {isLoading ? <LoadingSpinner /> : <Table columns={ columns } data={ dataDemand } />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default InfoDemand