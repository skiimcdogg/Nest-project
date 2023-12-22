import { IsString, IsNotEmpty } from 'class-validator';

export class CreateExtensionsDto {
    @IsString()
    @IsNotEmpty()
    code: string

    @IsString()
    @IsNotEmpty()
    extensionName: string
}