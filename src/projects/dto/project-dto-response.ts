import { ApiProperty } from "@nestjs/swagger";

export class ProjectDtoResponse{
    @ApiProperty({example: '1', description: 'ID проекта'})
    readonly id: number;
    @ApiProperty({example: '1', description: 'ID автора проекта'})
    readonly authorId: number;
    @ApiProperty({example: 'Посадить дерево', description: 'Название проекта'})
    readonly title: string;
    @ApiProperty({example: '.....', description: 'Описание проекта'})
    readonly description: string;
    @ApiProperty({example: "2024-06-06T23:43:05.276Z", description: 'Время создания проекта'})
    readonly assignedAt: Date
    @ApiProperty({example: `[
        {
            "sequenceNumber": 4,
            "id": 4,
            "authorId": 1,
            "projectId": 3,
            "title": "to do",
            "description": "....",
            "assignedAt": "2024-06-06T23:43:15.646Z",
            "tasks": [
                {
                    "sequenceNumber": 8,
                    "id": 8,
                    "authorId": 1,
                    "tasksListId": 4,
                    "title": "Найти саженец",
                    "description": "....",
                    "assignedAt": "2024-06-06T23:45:08.974Z"
                }
            ]
        },
        {
            "sequenceNumber": 5,
            "id": 5,
            "authorId": 1,
            "projectId": 3,
            "title": "in progress",
            "description": "....",
            "assignedAt": "2024-06-06T23:43:31.260Z",
            "tasks": []
        },
        {
            "sequenceNumber": 6,
            "id": 6,
            "authorId": 1,
            "projectId": 3,
            "title": "done",
            "description": "....",
            "assignedAt": "2024-06-06T23:43:43.839Z",
            "tasks": [
                {
                    "sequenceNumber": 9,
                    "id": 9,
                    "authorId": 1,
                    "tasksListId": 6,
                    "title": "Найти место для дерева",
                    "description": "....",
                    "assignedAt": "2024-06-06T23:45:51.257Z"
                }
            ]
        }
    ]`})
    readonly tasksList: tasksList[]
}

class tasksList{
    readonly sequenceNumber: number;
    readonly id: number;
    readonly authorId: number;
    readonly projectId: number;
    readonly title: string;
    readonly description: string;
    readonly assignedAt: Date;
    readonly tasks: tasks[]
}

class tasks{
    readonly sequenceNumber: number;
    readonly id: number;
    readonly authorId: number;
    readonly tasksListId: number;
    readonly title: string;
    readonly description: string;
    readonly assignedAt: Date;
}