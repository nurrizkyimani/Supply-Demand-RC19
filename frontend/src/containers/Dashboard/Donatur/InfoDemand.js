import React, {useState, useMemo, useContext, useEffect} from 'react'
import { links } from '../../../components/Dashboard/donaturLink'
import {AuthContext} from '../../../context/auth-context'
import {useHttpClient} from '../../../hooks/http-hook'

import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import Title from '../../../components/Dashboard/Title'

const InfoDemand = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)
    const {isLoading, error, sendRequest} = useHttpClient()
    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no'
            },
            {
                Header: 'Nama Barang',
                accessor: 'namabarang'
            },
            {
                Header: 'Kuantitas',
                accessor: 'kuantitas'
            }
        ]       
    )
    // const data = useMemo(
    //     () => [
    //         {
    //             namabarang: 'Barang1',
    //             kuantitas: '1'
    //         },
    //         {
    //             namabarang: 'Barang2',
    //             kuantitas: '2'
    //         },
    //         {
    //             namabarang: 'Barang3',
    //             kuantitas: '3'
    //         }
    //     ]
    //   )

    const [dataDemand, setDataDemand] = useState([])
    
      useEffect(() => {
        const fetchItems = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
                'GET',
                null,
                {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
            ).then(responseData => {
                console.log(responseData)
                if(responseData){
                    // setDataDemand(responseData.data.requestItems)
                }
            })
        }
        if(auth.token){
            fetchItems()
       }
      }, [auth.token, sendRequest])

    return (
        <div className="flex items-center md:pt-0 pt-10 md:pb-0 pb-24">
            <Sidebar role="Donatur" name={name} links={links} />
            <div className="flex w-full flex-col p-8 md:p-16">
                <Title>Info Demand</Title>
                <Table columns={ columns } data={ dataDemand } />
            </div>
        </div>
    )
}

export default InfoDemand
