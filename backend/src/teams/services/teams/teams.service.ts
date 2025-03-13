import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from 'src/teams/dtos/create.teams.dto';
import { UpdateTeamDto } from 'src/teams/dtos/update.teams.dto';

@Injectable()
export class TeamsService {

    // WE WILL STORE THE TEAMS HERE BECAUSE WE WON'T BE FETCHING THE DATA FROM THE PUBLIC API. IT WILL BE DONE ONCE
    private teams: CreateTeamDto[] = [];

    // FUNCTION TO RETURN THE LIST OF TEAMS IN A LEAGUE
    async getTeams() {
        // IF THE ARRAY IS EMPTY, WE FETCH THE TEAMS FROM THE API, THIS WILL ONLY RUN ONCE
        const url = "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch teams');
            }

            const data = await response.json();

            // TRANSFORM THE API'S RETURN BECAUSE WE DON'T NEED ALL THE DATA
            this.teams = data.teams.map(team => {
                return {
                    id: Number(team.idTeam),
                    name: team.strTeam,
                    strBadge: team.strBadge,
                    strStadium: team.strStadium,
                }
            });

            return this.teams
        } catch (err) {
            throw new Error(err);
        }
    }

    // ADD TEAM TO THE LEAGUE
    async createTeam(createTeamDto: CreateTeamDto) {

        // CHECK IF THE TEAM ALREADY EXISTS
        if (this.teamExists(createTeamDto.name)) {
            throw new BadRequestException(`Team ${createTeamDto.name} already exists.`);
        }

        // CHECK IF THE REQUIRED FIELDS ARE FILLED
        if (!createTeamDto.name || !createTeamDto.strBadge || !createTeamDto.strStadium) {
            throw new BadRequestException("Please provide the required information.");
        }

        // FIND THE HIGHEST ID IN THE ARRAY
        const maxID = Math.max(...this.teams.map(team => team.id || 0));

        // GENERATES THE NEXT ID
        const newID = maxID + 1;

        // ADDS THE NEW ID TO THE OBJECT AND PUSHES IT TO THE ARRAY
        const newTeam = {
            id: newID,
            name: createTeamDto.name,
            strBadge: createTeamDto.strBadge,
            strStadium: createTeamDto.strStadium
        }

        this.teams.push(newTeam);
        return newTeam;
    }

    // ALTER THE TEAM'S DATA
    async updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
        const teamIndex = this.teams.findIndex(team => team.id === id);
        if (teamIndex === -1) {
            throw new BadRequestException(`Team with id ${id} does not exist.`);
        }
    
        // UPDATE THE TEAM'S DATA
        this.teams[teamIndex] = {
            id: id,
            name: updateTeamDto.name,
            strBadge: updateTeamDto.strBadge,
            strStadium: updateTeamDto.strStadium
        };
    
        return this.teams[teamIndex]; 
    }

    // DELETE A TEAM
    async deleteTeam(id: number) {
        const teamIndex = this.teams.findIndex(team => team.id === id);
        if (teamIndex === -1) {
            throw new BadRequestException(`Team with id ${id} does not exist.`);
        }
    
        // REMOVE THE TEAM FROM THE ARRAY
        this.teams.splice(teamIndex, 1);
    }
    
    // HELPER FUNCTION TO CHECK IF A TEAMS HAS ALREADY BEEN REGISTERED
    teamExists(name: string): boolean {
        return this.teams.some(team => team.name.toLowerCase() === name.toLowerCase());
    }
}

