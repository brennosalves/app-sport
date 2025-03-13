import { IsNotEmpty } from "class-validator";

export class CreateTeamDto {

    // ALL THE FIELDS THAT ARE REQUIRED TO CREATE A TEAM, 
    // BUT WE WILL CREATE THE ID BASED ON THE MAX ID OF THE ARRAY

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    strBadge: string;

    @IsNotEmpty()
    strStadium: string;

    id?: number;
}