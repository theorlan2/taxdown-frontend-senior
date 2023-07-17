import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import userEvent from '@testing-library/user-event'
//
import SingUpForm from "./SingUpForm";
import { SingUpModel  } from '../../models/register.model';


describe("Sing Up form", () => {
    let isLoading = false;
    let haveError = false;
    let errorMessage = '';
    const onSubmit = jest.fn((dataForm: SingUpModel) => { });

    it('should renderized the component', () => {
        render(
            <MemoryRouter>
                <SingUpForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        expect(screen.getByText(/Create account/)).toBeInTheDocument()
    })

    it('should validate the inputs and show the field is requiered', async () => {
        render(
            <MemoryRouter>
                <SingUpForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        userEvent.click(screen.getByText(/Create account/));
        await waitFor(() => {
            const msgInputs = screen.getAllByText('This field is required')
            expect(msgInputs).toBeDefined();
        })
    })


    it('should validate an input email', async () => {
        render(
            <MemoryRouter>
                <SingUpForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        const input = screen.getByPlaceholderText(/email/) as any;
        await userEvent.type(input, 'example@email.com')
        expect(input.value).toBe('example@email.com')
    })

    it('should validate an input password', async () => {
        render(
            <MemoryRouter>
                <SingUpForm onSubmit={onSubmit} isLoading={isLoading} haveError={haveError} errorMessage={errorMessage} />
            </MemoryRouter>)
        const input = screen.getByPlaceholderText(/Password/) as any;
        await userEvent.type(input, 'test')
        expect(input.value).toBe('test')
    })

}) 