import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUpdateExtensionsDto {
    @IsString()
    @IsNotEmpty()
    code: string

    @IsString()
    @IsNotEmpty()
    extensionName: string
}