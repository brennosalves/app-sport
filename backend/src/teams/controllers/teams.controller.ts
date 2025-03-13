import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamsService } from './../services/teams/teams.service';
import { CreateTeamDto } from '../dtos/create.teams.dto';
import { UpdateTeamDto } from '../dtos/update.teams.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  // GET THE DATA FROM THE PUBLIC API
  @Get('')
  async getTeams() {
    return this.teamsService.getTeams();
  }

  // POST REQUEST TO ADD TEAMS TO THE LEAGUE
  @Post('')
  @UsePipes(ValidationPipe) // VALIDATION PIPE TO VALIDATE THE INCOMMING DATA
  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    const newTeam = await this.teamsService.createTeam(createTeamDto);
    return {
      message: "Team added successfully",
      team: newTeam,
    }
  }

  // PUT REQUEST TO UPDATE A TEAM
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    const updatedTeam = await this.teamsService.updateTeam(Number(id), updateTeamDto);
    return {
      message: "Team updated successfully",
      team: updatedTeam,
    };
  }
  
  // DELETE REQUEST TO REMOVE A TEAM
  @Delete(':id')
  async deleteTeam(@Param('id') id: string) {
    await this.teamsService.deleteTeam(Number(id));
    return {
      message: "Team deleted successfully",
    };
  }
}