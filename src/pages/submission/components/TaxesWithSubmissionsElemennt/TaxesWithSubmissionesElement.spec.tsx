import { render, screen } from "@testing-library/react";
//
import TaxesWithSubmissionsElement from "../../components/TaxesWithSubmissionsElemennt/TaxesWithSubmissionsElement";
import { Submissions } from '@/models/tax/submission.model';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";


describe('TaxesWithSubmissionElement component', () => {

    let taxYear = "2021";
    let submissions = [
        {
            id: "1",
            idTax: "1",
            name: 'Test 1',
            surname: "SurTest name",
            age: 31,
        },
        {
            id: "2",
            idTax: "1",
            name: 'Test 1',
            surname: "SurTest name",
            age: 25,
        }
    ] as Submissions[];

    const onDelete = jest.fn((id: string) => { })

    it('should be render correctly', () => {
        render(<MemoryRouter >
            <TaxesWithSubmissionsElement tax={taxYear} submissions={submissions} onDelete={onDelete} />
        </MemoryRouter>)
        expect(screen.getByText('Tax:')).toBeInTheDocument()
    })

    it('should be call delete method', () => {
        render(<MemoryRouter >
            <TaxesWithSubmissionsElement tax={taxYear} submissions={submissions} onDelete={onDelete} />
        </MemoryRouter>)
        userEvent.click(screen.getAllByRole('delete-button')[0])
        expect(onDelete).toHaveBeenCalled();
    })




})