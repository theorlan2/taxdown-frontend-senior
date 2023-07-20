import { render, screen, waitFor } from '@testing-library/react';

//
import SubmissionForm from './SubmissionForm';
import { Submissions, SubmissionsFormType } from '@/models/tax/submission.model';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

 
describe("Submission form", () => {

    const mockOnSubmit = jest.fn((data: Submissions) => { })
    const submission = {
        id: "2",
        idTax: "1",
        name: 'Test 1',
        surname: "SurTest name",
        age: 25,
    }

    const submissionForm = {
        id: 1,
        inputFields: [
            {
                id: "name",
                label: "Name",
                placeholder: "Your first name",
                type: "text",
                maxLength: 40
            },
            {
                id: "surname",
                label: "Surname",
                placeholder: "Your last name",
                type: "text",
                maxLength: 20
            },
            {
                id: "age",
                label: "Age",
                placeholder: "Your age",
                type: "number"
            }
        ]
    } as SubmissionsFormType;


    it('should be renderized correctly', async () => {

        render(
            <MemoryRouter>
                <SubmissionForm submissionForm={submissionForm} submission={submission} onSubmit={mockOnSubmit} />
            </MemoryRouter>)

    })

    it('should be show validation input', async () => {

        render(
            <MemoryRouter>
                <SubmissionForm submissionForm={submissionForm} submission={{ id:'12345',idTax:'2', name:'',surname:'',age:0, }} onSubmit={mockOnSubmit} />
            </MemoryRouter>)

        userEvent.click(screen.getByText(/Send/));

        await waitFor(() => {
            expect(screen.getAllByRole("alert")).toHaveLength(2);
        })
        expect(mockOnSubmit).not.toBeCalled();
    })

    it('should be show validation maxLenght input', async () => {

        render(
            <MemoryRouter>
                <SubmissionForm submissionForm={submissionForm} submission={{...submission, name: "asdasdasdasdas asdasd asdasdas  asdasd asd asdas"}} onSubmit={mockOnSubmit} />
            </MemoryRouter>)

        userEvent.click(screen.getByText(/Send/));

        await waitFor(() => {
            expect(screen.getAllByRole("alert")).toHaveLength(1);
        })

        expect(mockOnSubmit).not.toBeCalled();
    })

})