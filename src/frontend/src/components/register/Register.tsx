import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export function Register() {
    return (
        <>
            <h1>Register</h1>
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password" />
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your username" />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </>
    );
}
