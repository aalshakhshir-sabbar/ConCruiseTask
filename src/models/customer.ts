import { ApiProperty } from "@nestjs/swagger"
import {  IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ObjectId } from "mongodb"

export class CustomerDTO {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    fullName: string
    
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    currentLocation: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    numberOfRides: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    rating: number
}
