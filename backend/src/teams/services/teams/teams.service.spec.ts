import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  // TEST TEAMS EXISTS FUNCTION
  it('teamsExist Function - Should return true if teams exist', () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    expect(service.teamExists('Arsenal')).toBe(true);
  })

  it('teamsExist Function - Should return false if teams do not exist', () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    expect(service.teamExists('Chelsea')).toBe(false);
  })

  // TEST CREATE TEAM FUNCTION
  it('createTeam Function - Should return true if the team was created', async () => {
    service['teams'] = [];
    const newTeam = {
      name: 'Arsenal 1',
      strBadge: 'https://www.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
      strStadium: 'Emirates Stadium'
    }

    // SINCE WE DON'T HAVE THE ID WHILE CREATING THE TEAM, 
    // WE WILL CHECK IF THE ID IS A NUMBER (VALID) AND IF THE OTHER PROPERTIES ARE CORRECT
    const createdTeam = await service.createTeam(newTeam);

    expect(createdTeam).toMatchObject({
      name: newTeam.name,
      strBadge: newTeam.strBadge,
      strStadium: newTeam.strStadium
    });
  
    expect(typeof createdTeam.id).toBe('number');
  })

  // TRYING INSERTING A TEAM WITH MISSING REQUIRED INFORMATION
  it('createTeam Function - Should throw an error if the team is missing required information', async () => {
    service['teams'] = [];
    const newTeam = {
      name: 'Arsenal 1',
      strBadge: 'https://www.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
      strStadium: '' // <--- MISSING REQUIRED INFORMATION
    }

    await expect(service.createTeam(newTeam)).rejects.toThrow();
  })

  // TRYING TO INSERT DUPLICATED TEAMS
  it('createTeam Function - Should throw an error if the team already exists', async () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    const newTeam = {
      name: 'Arsenal', // <--- DUPLICATED TEAM / WE CHECK THE NAMES OF THE TEAMS
      strBadge: 'https://www.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
      strStadium: 'Emirates Stadium'
    }

    await expect(service.createTeam(newTeam)).rejects.toThrow();
  })

  // TEST UPDATE TEAM FUNCTION
  it('updateTeam Function - Should return true if the team was updated', async () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    const updatedTeam = {
      name: 'Arsenal',
      strBadge: 'https://www.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
      strStadium: 'Emirates Stadium'
    }

    const team = await service.updateTeam(133604, updatedTeam);

    expect(team).toMatchObject({
      name: updatedTeam.name,
      strBadge: updatedTeam.strBadge,
      strStadium: updatedTeam.strStadium
    });
  })

  // TEST UPDATE A TEAM THAT DOES NOT EXIST
  it('updateTeam Function - Should throw an error if the team does not exist', async () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    const updatedTeam = {
      name: 'Arsenal',
      strBadge: 'https://www.thesportsdb.com/images/media/team/badge/uyhbfe1612467038.png',
      strStadium: 'Emirates Stadium'
    }

    await expect(service.updateTeam(133605, updatedTeam)).rejects.toThrow(); // <--- PASSING A DIFFERENT ID
  })

  // TEST DELETE TEAM FUNCTION
  it('deleteTeam Function - Should return true if the team was deleted', async () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    const deletedTeam = await service.deleteTeam(133604);

    expect(deletedTeam).toBeUndefined();
  })

  // TEST DELETE A TEAM THAT DOES NOT EXIST
  it('deleteTeam Function - Should throw an error if the team does not exist', async () => {
    service['teams'] = [{ id: 133604, name: 'Arsenal', strBadge: '', strStadium: '' }];
    await expect(service.deleteTeam(133605)).rejects.toThrow(); // <--- PASSING A DIFFERENT ID
  })
});
