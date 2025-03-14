import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act as reactAct } from 'react'; 
import TeamList from '../TeamList';
import '@testing-library/jest-dom';

describe('TeamList Rendering', () => {
  
    // WE'LL MOCK THE FUNCTIONS THAT REQUIRE ACCESS TO THE BACKEND
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  // TESTS THE LIST OF TEAMS LOADING WHEN THE PAGE LOADS
  it('Test List of Teams - Listing teams when loading the page', async () => {
    const mockTeams = [
      { id: 1, name: 'Team A', strStadium: 'Stadium A', strBadge: 'teamA.png' },
      { id: 2, name: 'Team B', strStadium: 'Stadium B', strBadge: 'teamB.png' },
    ];

    await reactAct(async () => { 
      render(<TeamList teams={mockTeams} setTeams={() => {}} showMessage={() => {}} />);
    });
    await waitFor(()=> expect(screen.queryByText('Loading teams...')).not.toBeInTheDocument());

    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
  });

  // TEST THE MESSAGE "NO TEAMS AVAILABLE" WHEN TEAMS PROP IS EMPTY
  it('Test List of Teams - No teams available', async () => {
    await reactAct(async () => { 
      render(<TeamList teams={[]} setTeams={() => {}} showMessage={() => {}} />);
    });
    await waitFor(()=> expect(screen.queryByText('Loading teams...')).not.toBeInTheDocument());
    expect(screen.getByText('No teams available')).toBeInTheDocument();
  });


});