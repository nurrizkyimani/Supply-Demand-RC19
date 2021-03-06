import React from 'react'

const Select2 = props  => {
    return (
        <div className={`flex flex-col ${props.divClassName}`}>
            <label htmlFor={props.id} className="text-gray-700 tracking-wide font-medium text-sm md:text-base my-1">{props.label}</label>
            <select
                value={props.value}
                className={`w-full bg-gray-400 mb-3 bg-gray-400 text-gray-700 font-semibold outline-none p-2 rounded-md w-20 text-center text-sm capitalize cursor-pointer`} 
                style={{width: props.width, maxWidth: props.maxWidth, height: 40}} 
                onChange={e => {
                    props.changeItem(e.target.value, props.index)
                }}>
            {props.list.map(item => {
                return(
                    <option key={item.id} value={item.id} className="text-gray-700 font-semibold text-xs md:text-sm outline-none capitalize cursor-pointer">
                        {item.name}
                    </option>
                )
            })}
            </select>
        </div>
    );
};


export default Select2 