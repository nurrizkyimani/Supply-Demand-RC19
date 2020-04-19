import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { useForm } from '../../../hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_PASSWORD } from '../../../util/validator'
import { links } from '../../../components/Dashboard/pemohonLink'

import Select from '../../../components/UI/Select'
import Sidebar from '../../../components/Dashboard/SideBar'
import Title from '../../../components/Dashboard/Title'
import TextInput from '../../../components/Form/TextInput'
import Select2 from '../../../components/UI/Select2'
import TextInput2 from '../../../components/Form/TextInput2'
import Button from '../../../components/UI/Button'
import ErrorModal from '../../../components/UI/ErrorModal'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'


const InputKebutuhan = (props) => {

    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])
    const [check, setCheck] = useState(false)
    const [submit, setSubmit] = useState(false)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [submitError, setSubmitError] = useState()
    const auth = useContext(AuthContext)
    const [reqestItems, setRequestItems] = useState([])

    const [formState, inputHandler] = useForm({
        quantity: {
            value: '',
            isValid: false
        }
    }, false)

    const changeItem = (item_id) => {
        setDonasi({
            ...donasi,
            item_id: item_id
        })
    }

    const changeUnit = (unit_id) => {
        setDonasi({
            ...donasi,
            unit_id: unit_id
        })
    }

    const [donasi, setDonasi] = useState(
        {
            item_id: '',
            unit_id: ''
            // quantity: ''
            // sasaran: ''
        }
    )

    useEffect(() => {

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            setUnitList(responseData)
            setDonasi(prevDonasi => ({
                ...prevDonasi,
                unit_id: responseData[0].id
            }))
        })

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            'GET',
            null,
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            setItemList(responseData)
            setDonasi(prevDonasi => ({
                ...prevDonasi,
                item_id: responseData[0].id
            }))

        })
    }, [auth.token, sendRequest])

    const submitHandler = () => {
        console.log(donasi.item_id, donasi.unit_id, formState.inputs.quantity.value);
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
            'POST',
            JSON.stringify({
                requestItems: [
                    {
                        item_id: donasi.item_id,
                        unit_id: donasi.unit_id,
                        quantity: formState.inputs.quantity.value
                    }
                ]
            }),
            { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        ).then(responseData => {
            if (responseData.date != null) {
                setSubmit(true)
                setCheck(true)
                props.history.push('/dashboard/riwayat-kebutuhan')
            }
            else {
                setSubmit(true)
                setCheck(false)
                setSubmitError('Gagal menginput kebutuhan. Mohon coba lagi.')
            }
        })
    }

    const clearSubmitError = () => {
        setSubmitError(null)
    }

    let $addKebutuhan = null;
    const addKebutuhan = () => {

        $addKebutuhan = (<div className="flex flex-col lg:flex-row w-full lg:mb-5">
            {/* <div className="lg:hidden inline-block ml-auto mr-0 absolute right-0">
          <Delete className="text-gray-500" />
      </div> */}
            <Select
                label="Jenis Barang"
                divClassName="mr-3 w-2/5 lg:4/12"
                arrayList={itemList}
                onSelectChange={changeItem}
            />
            <TextInput2
                divClassName="lg:w-4/12 w-full lg:4/12 lg:mr-3"
                id="quantity"
                type="text"
                label="Kuantitas"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                changeUnit={changeUnit}
                errorText="Mohon masukkan kuantitas barang."
                list={unitList}
            />


        </div>)
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={submitError} onClear={clearSubmitError} />
            <div className="flex flex-row h-full w-full">

                <Sidebar role="" name="PEMOHON" links={links} />


                <div className="flex w-full flex-col p-8 md:p-16">

                    <form >



                        <div className="flex w-full flex-col ">
                            <Title>Informasi Kebutuhan</Title>

                            <div className="flex flex-col lg:flex-row w-full lg:mb-5">
                                {/* <div className="lg:hidden inline-block ml-auto mr-0 absolute right-0">
                                    <Delete className="text-gray-500" />
                                </div> */}
                                <Select2
                                    label="Jenis Barang"
                                    divClassName="mr-3 w-2/5 lg:4/12"
                                    list={itemList}
                                    changeItem={changeItem}
                                />
                                <TextInput
                                    divClassName="w-1/5 lg:4/12 lg:mr-3"
                                    id="quantity"
                                    type="text"
                                    label="Kuantitas"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    onInput={inputHandler}
                                    errorText="Mohon masukkan kuantitas barang."
                                />

                                <Select
                                    arrayList={unitList}
                                    onSelectChange={changeUnit}
                                    label="Jenis Barang"
                                    divClassName="mr-3 w-1/5" />

                            </div>
                            {$addKebutuhan}

                        </div>
                    </form>
                    <div className="flex w-full flex-col">

                        <Button
                            width={200}
                            type="submit"
                            onClick={submitHandler}
                            disabled={!formState.isValid}>
                            {
                                isLoading ? <LoadingSpinner color="white" style={{ transform: 'translateY(-3px)' }} /> : 'SUBMIT'
                            }
                        </Button>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default InputKebutuhan