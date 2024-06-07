import { ApiProperty } from "@nestjs/swagger";

export class AuthDtoResponse{
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjQzMmUiLCJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTc3MTE4NTQsImV4cCI6MTcxNzc5ODI1NH0.EZWJ8kTIwArVW_sFqZqnYJgIa90kHJRMglKKE0eCNVQ", description: 'Токен'})
    readonly token: string;
}