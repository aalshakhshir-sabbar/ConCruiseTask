import { ApiProperty } from "@nestjs/swagger"

export class CustomerDTO {
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    fullName: string
    @ApiProperty()
    currentLocation: string
    @ApiProperty()
    numberOfRides: number
    @ApiProperty()
    rating: number
}
