import { IsString, IsOptional } from 'class-validator';

export class UpdateExtensionsDto {
    @IsOptional()
    @IsString()
    code?: string

    @IsOptional()
    @IsString()
    extensionName?: string
}