import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import userEvent from '@testing-library/user-event'
//
import LoginForm from "./LoginForm";
import { LoginFormModel } from '../../models/login.model';


describe("Login form", () => {
    let isLoading = false;
    let haveError = false;
    let errorMessage = '';
    const onSubmit = jest.fn((dataForm: LoginFormModel) => { });

    it('validate is show the component', () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        expect(screen.getByText(/Enter/)).toBeInTheDocument()
    })

    it('check validation form', async () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        userEvent.click(screen.getByText(/Enter/));
        await waitFor(() => {
            const msgInputs = screen.getAllByText('The field Email is required')
            expect(msgInputs).toBeDefined();
        })
    })


    it('check validate input email form', async () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        const input = screen.getByPlaceholderText(/email/) as any;
        await userEvent.type(input, 'example@email.com')
        expect(input.value).toBe('example@email.com')
    })

    it('check validate input password form', async () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        const input = screen.getByPlaceholderText(/Password/) as any;
        await userEvent.type(input, 'test')
        expect(input.value).toBe('test')
    })

}) 