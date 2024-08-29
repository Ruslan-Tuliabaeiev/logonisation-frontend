import React, {Fragment, useState} from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import './LoginForm.css'
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password)
        postUser();
    };

    const registrationData = {
        email: email,
        password: password,
    };
    const postUser = () => {
        axios
            .post('http://localhost:5000/auth/login', registrationData)
            .then((response) => {
                console.log('Successfully login:', response.data);
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };


    return (
        <>
            <div className='login-card'>
                <div>
                    <div className='login-main'>
                        <Form
                            className='theme-form login-form'
                            onSubmit={handleSubmit}
                        >
                            <h4>Sign in to account</h4>

                            <p>Enter your email & password to login</p>

                            <FormGroup  className="col-form">
                                <Label className='col-form-label m-0'>Email Address</Label>
                                <Input
                                    className='form-control'
                                    type='email'
                                    required placeholder='Test@gmail.com'
                                    onChange={handleEmailChange}
                                />
                            </FormGroup>

                            <FormGroup className='position-relative'>
                                <Label className='col-form-label '>Password</Label>
                                <div className='position-relative col-form'>
                                    <Input
                                        className='form-control'
                                        // type={togglePassword ? 'text' : 'password'}
                                        name='login[password]'
                                        required placeholder='*********'
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </FormGroup>

                            <FormGroup className='button-block '>
                                <button className='col-form-button' type="submit">Sign in</button>
                            </FormGroup>

                            <p>
                                Don't have account?
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )

}
