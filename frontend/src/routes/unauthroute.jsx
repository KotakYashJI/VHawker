import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadLoginuser } from '../actions/Useraction';
import { useNavigate } from 'react-router-dom';

const unauthroute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginuser = useSelector((state) => state.user.Loginuser);

    useEffect(() => {
        dispatch(LoadLoginuser());
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default unauthroute