import { BookCreatedFlagContext } from '@/context/BookCreatedFlagContext';
import { createBooking, getStoreLocations } from '@/services'
import { astFromValue } from 'graphql';
import React, { useContext, useEffect, useState } from 'react'


function Form({car}:any) {
    const [storeLocation,setsStoreLocation]=useState([]);
    const {showToastMsg,setShowToastMsg}=useContext(BookCreatedFlagContext)
    const [formValue,setFormValue]=useState({
        location:'',
        carId:car.id, 
        contactNumber: "", 
        dropOffTime: "", 
        dropoffDate: "", 
        pickupDate: "", 
        pickupTime: "", 
        userName: "Sandesh Dandge"
    })
    

    useEffect(()=>{
        if(car)
            {
                setFormValue({
                    ...formValue,
                    carId: car.id
                });
            }
    },[car]);

    useEffect(()=>{
        getStoreLocation_();
    },[]);
    const getStoreLocation_=async()=>{
        const resp:any=await getStoreLocations();
        console.log(resp);
        setsStoreLocation(resp?.storesLocations)
    };
    const handleChange=(event:any)=>{
        setFormValue({
            ...formValue,
            [event.target.name]:event.target.value
        });
    }
    const handleSubmit = async () => {
        const pickupDateTime = new Date(`${formValue.pickupDate}T${formValue.pickupTime}`);
        const dropOffDateTime = new Date(`${formValue.dropoffDate}T${formValue.dropOffTime}`);
        
        // Validate drop-off date and time
        if (dropOffDateTime < pickupDateTime) {
            alert('Drop-off date and time cannot be earlier than pick-up date and time');
            return;
        }
        // Validate pick-up date and time
        if (pickupDateTime > dropOffDateTime) {
            alert('Pick-up date and time cannot be later than drop-off date and time');
            return;
        }
        if (!formValue.contactNumber || formValue.contactNumber.length !== 10 || isNaN(Number(formValue.contactNumber))) {
            alert('Please enter a valid 10-digit contact number');
            return;
        }
        console.log('Form value:',formValue);
        const resp = await createBooking(formValue);
        console.log('Response:',resp);
        
        if(resp)
            {
                setShowToastMsg(true);
                setTimeout(() => {
                    setShowToastMsg(false);
                }, 2000); 
            }
    }

    return (
        <div>
            <div className='flex flex-col w-full mb-5'>
                <label className='text-gray-400'>pikup location</label>
                <select className="select select-bordered w-full max-w-xs"
                name='location'
                onChange={handleChange}>
                    <option disabled selected>Pickup Location?</option>
                    {storeLocation&&storeLocation.map((loc:any,index:number)=>(
                        <option key={index}>{loc?.address}</option>
                    ))}
                </select>
            </div>
            <div className='flex flec-col gap-5 mb-5'>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400'>pick up date</label>
                    <input type='date' placeholder='Type here'
                    name='pickupDate'
                    onChange={handleChange}
                    className='input input-bordered w-full maX-w-lg'/>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400'>Drop of date</label>
                    <input type='date' placeholder='Type here'
                    name='dropoffDate'
                    onChange={handleChange}
                    className='input input-bordered w-full maX-w-lg'/>
                </div>
            </div>
            <div className='flex gap-5'>
                    <div className='flex flex-col w-full mb-5'>
                        <label className='text-gray-400'>Pick up time</label>
                        <input type="time" placeholder='Type here'
                        name='pickupTime'
                        onChange={handleChange}
                        className='input input-bordered w-full max-w-lg'/>
                    </div>
                    <div className='flex flex-col w-full mb-5'>
                        <label className='text-gray-400'>Drop off time</label>
                        <input type="time" placeholder='Type here'
                        name='dropOffTime'
                        onChange={handleChange}
                        className='input input-bordered w-full max-w-lg'/>
                    </div>
            </div>
            <div className='flex flex-col w-full mb-5'>
                <label className='text-gray-400'>Contact Number</label>
                <input type='tel' placeholder='Type here' 
                name='contactNumber'
                onChange={handleChange}
                className='input input-bordered w-full max-w-lg'/>
            </div>
            <div className='model-action flex justify-end gap-5'>
                
                <button className='btn mt-8'>Close</button>
                <button className='btn mt-8 bg-blue-500 text-white'
                onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}

export default Form