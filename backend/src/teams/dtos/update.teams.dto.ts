import { IsNotEmpty, IsNumberString } from "class-validator";

export class UpdateTeamDto {

    // ALL THE FIELDS THAT ARE REQUIRED TO UPDATE A TEAM

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    strBadge: string;

    @IsNotEmpty()
    strStadium: string;
}