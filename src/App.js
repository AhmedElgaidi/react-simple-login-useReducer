import React, { useState, useReducer } from 'react';
import { login } from './utils';



const App = () => {
    const [state, dispatch] = useReducer(loginReducer, defaultValue);
    const { 
        username,
        password,
        isLoading,
        error,
        isLoggedIn
    } = state;

    const submitHandler = async event => {
        event.preventDefault();

        dispatch({
            type: 'login'
        })
        try {
            await login({ username, password });
            dispatch({
                type: 'success'
            });
        } catch (error) {
            dispatch({
                type: 'error'
            })
        }
    };



    return (
        <div className="container">
            {isLoggedIn ? (
                <>
                    <h2>Welcome, { username }!</h2>
                    <button className='btn' onClick={ () => dispatch({ type: 'logout' }) }>
                        log out 
                    </button>
                </>
            ) : (
                <>
                    <form className='form' onSubmit={ submitHandler }>
                        {error && <p style={{ color: 'red' }}>{ error }</p>}
                        <h2>Login</h2>
                        <input 
                            className='item' 
                            type="text"
                            placeholder='username'
                            value={ username }
                            onChange={
                                e => {
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'username',
                                        payload: e.target.value
                                    })
                                }
                            }
                        />                
                        <input 
                            className='item' 
                            type="password"
                            placeholder='password'
                            value={ password }
                            onChange={
                                e => {
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'password',
                                        payload: e.target.value
                                    })
                                }
                            }
                        />
                        <button
                            className='btn'
                            type='submit'
                            // to prevent double pressing
                            disabled={ isLoading }
                        >
                            { isLoading ? 'logging in...': 'login' }
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};




const loginReducer = (state, action) => {
    switch(action.type) {
        // case 1
        case 'login':
            return {
                ...state,
                isLoading: true
            }
        // case 2
        case 'success':
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true
            }
        // case 3
        case 'error':
            return {
                ...state,
                error: 'Incorrect username or password',
                isLoading: false,
                isLoggedIn: false,
                username: '',
                password: ''
            }
        // case 4
        case 'logout':
            return {
                ...state,
                isLoggedIn: false
            }
        // case 5
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        // default case
        default:
            return state;
    }
};
const defaultValue = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false
};

export default App;