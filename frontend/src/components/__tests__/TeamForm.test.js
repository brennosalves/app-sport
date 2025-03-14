import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import TeamForm from '../TeamForm';
import '@testing-library/jest-dom';

describe('TeamForm', () => {
    // WE'LL MOCK THE FUNCTIONS THAT REQUIRE ACCESS TO THE BACKEND
    const mockSetTeams = jest.fn();
    const mockShowMessage = jest.fn();

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'Team added successfully', team: { name: 'Arsenal', strStadium: 'Emirates Stadium', strBadge: 'https://example.com/badge.png' } }),
            })
        );
        jest.clearAllMocks();
    });

    afterEach(() => {
        global.fetch.mockClear();
    });

    // TEST THE CREATION OF A TEAM
    it('Test Create a Team Function - Creation of a Team', async () => {
        await act(async () => {
            render(<TeamForm setTeams={mockSetTeams} showMessage={mockShowMessage} />);
        });

        fireEvent.change(screen.getByLabelText("Team Name"), { target: { value: 'Arsenal' } });
        fireEvent.change(screen.getByLabelText("Team Badge URL"), { target: { value: 'https://example.com/badge.png' } });
        fireEvent.change(screen.getByLabelText("Stadium Name"), { target: { value: 'Emirates Stadium' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: "Create Team" }));
        });

        await waitFor(() => {
            expect(mockSetTeams).toHaveBeenCalledWith(expect.any(Function));
            expect(mockShowMessage).toHaveBeenCalledWith('Team added successfully!', 'success');
        });
    });

    // TESTS IF THE FORM CLEARS AFTER THE CREATION OF A TEAM
    it('Test Clear Form Function - if the form clears after the creation of a team', async () => {
        await act(async () => {
            render(<TeamForm setTeams={mockSetTeams} showMessage={mockShowMessage} />);
        });

        fireEvent.change(screen.getByLabelText("Team Name"), { target: { value: 'Arsenal' } });
        fireEvent.change(screen.getByLabelText("Team Badge URL"), { target: { value: 'https://example.com/badge.png' } });
        fireEvent.change(screen.getByLabelText("Stadium Name"), { target: { value: 'Emirates Stadium' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: "Create Team" }));
        });

        await waitFor(() => {
            expect(screen.getByLabelText("Team Name")).toHaveValue('');
            expect(screen.getByLabelText("Team Badge URL")).toHaveValue('');
            expect(screen.getByLabelText("Stadium Name")).toHaveValue('');
        });
    });

    // TEST ERROR MESSAGE - IF A TEAM ALREADY EXISTS
    it('Test Create a Team Function - Team already exists', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'Team already exists', team: null }),
            })
        );

        await act(async () => {
            render(<TeamForm setTeams={mockSetTeams} showMessage={mockShowMessage} />);
        });

        fireEvent.change(screen.getByLabelText("Team Name"), { target: { value: 'Arsenal' } });
        fireEvent.change(screen.getByLabelText("Team Badge URL"), { target: { value: 'https://example.com/badge.png' } });
        fireEvent.change(screen.getByLabelText("Stadium Name"), { target: { value: 'Emirates Stadium' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: "Create Team" }));
        });

        await waitFor(() => {
            expect(mockSetTeams).not.toHaveBeenCalled();
            expect(mockShowMessage).toHaveBeenCalledWith('Failed to add team: Team already exists', 'error');
        });
    });

});