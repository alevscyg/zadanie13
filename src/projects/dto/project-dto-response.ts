import { ApiProperty } from "@nestjs/swagger";

export class ProjectDtoResponse{
    @ApiProperty({example: `{
    "id": 1,
    "authorId": 1,
    "title": "Заварить чай",
    "description": "С мятой",
    "assignedAt": "2024-06-22T16:01:03.818Z",
    "tasksList": [
        {
            "sequenceNumber": 1,
            "id": 1,
            "authorId": 1,
            "projectId": 1,
            "title": "done",
            "description": "Сделано",
            "assignedAt": "2024-06-22T16:01:11.912Z",
            "tasks": [
                {
                    "sequenceNumber": 2,
                    "id": 2,
                    "authorId": 1,
                    "projectId": 1,
                    "tasksListId": 1,
                    "title": "Сварить макароны",
                    "description": null,
                    "assignedAt": "2024-06-22T16:47:55.707Z",
                    "taskPriority": [
                        {
                            "taskId": 2,
                            "tasksListId": 1,
                            "taskPriority": "Low"
                        }
                    ],
                    "taskField": [
                        {
                            "id": 2,
                            "authorId": 1,
                            "projectId": 1,
                            "taskId": 2,
                            "taskFieldTitle": "Исполнитель",
                            "taskFieldType": "str",
                            "taskFieldInt": [],
                            "taskFieldStr": [
                                {
                                    "taskId": 2,
                                    "taskFieldId": 2,
                                    "value": "Александр"
                                }
                            ]
                        }
                    ]
                },
                {
                    "sequenceNumber": 1,
                    "id": 1,
                    "authorId": 1,
                    "projectId": 1,
                    "tasksListId": 1,
                    "title": "Найти чай",
                    "description": "Зеленый или черный",
                    "assignedAt": "2024-06-22T16:01:20.025Z",
                    "taskPriority": [
                        {
                            "taskId": 1,
                            "tasksListId": 1,
                            "taskPriority": "Medium"
                        }
                    ],
                    "taskField": [
                        {
                            "id": 1,
                            "authorId": 1,
                            "projectId": 1,
                            "taskId": 1,
                            "taskFieldTitle": "Исполнитель",
                            "taskFieldType": "str",
                            "taskFieldInt": [],
                            "taskFieldStr": [
                                {
                                    "taskId": 1,
                                    "taskFieldId": 1,
                                    "value": "Александр"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}`})
    readonly project: any;
}
