import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTasksListDto } from './dto/crate-tasks-list-dto';
import { CreateTasksFieldDto } from './dto/create-task-field.dto';
import { UpdateTasksFieldDto } from './dto/update-task-field.dto';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { UpdateTasksListDto } from './dto/update-task-list.dto';
import { CreateTasksDto } from './dto/create-task-dto';
import { UpdateTasksDto } from './dto/update-task.dto';
import { TasksFieldValueDto } from './dto/createa-task-field-value.dto';

@Injectable()
export class ProjectsService {
  
    constructor(private databaseService: DatabaseService){}
    async createProject(createProjecteDto: CreateProjectDto, userId: number) {
        return await this.databaseService.project.create({ data: { ...createProjecteDto, authorId: userId } });
    }

    async patchProject(patchProjecteDto: UpdateProjectDto, authorId: number, projectId: number){
        if(isNaN(projectId)) throw new Error("Некорректный id");
        const project = await this.findProjectById(authorId, projectId);
        if(project){
            return await this.databaseService.project.update({
                where: {
                  id: projectId,
                },
                data: patchProjecteDto,
            });
        }
    }

    async deleteProject(authorId: number, projectId: number) {
        if(isNaN(projectId)) throw new Error("Некорректный id");
        const project = await this.findProjectById(authorId, projectId);
        if( project ){
            await this.databaseService.project.delete({ where: { id: projectId } });
            return project;
        }
        
    }
    async findProjectById(authorId: number, projectId: number) {
        if(isNaN(projectId)) throw new Error("Некорректный id");
        const project = await this.databaseService.project.findUnique({
            where: {id: projectId} ,
            include: {
                tasksList: {
                    include: {
                        tasks: {
                            include: {
                                taskField: {
                                    include: {
                                        taskFiledKInt: true,
                                        taskFiledStr: true,
                                        taskFieldPriority: true
                                    }
                                }
                            }
                        }
                    }
                },
            }
        });
        if(project)
            if(project.authorId == authorId) 
                return project;
    }

    async findAllProjects(authorId: number) {
        return await this.databaseService.project.findMany({
            where: {authorId: authorId} ,
            include: {
                tasksList: {
                    include: {
                        tasks: {
                            include: {
                                taskField: {
                                    include: {
                                        taskFiledKInt: true,
                                        taskFiledStr: true,
                                        taskFieldPriority: true
                                    }
                                }
                            }
                        }
                    }
                },
            }
        });
    }

    async createTasksList(createTasksListDto: CreateTasksListDto, authorId: number, projectId: number) {
        if(isNaN(projectId)) throw new Error("Некорректный id");
        if(await this.findProjectById(authorId, projectId)) return await this.databaseService.tasksList.create({ data: { ...createTasksListDto, projectId: projectId, authorId: authorId } });
    }
    
    async patchTasksList(patchTasksListDto: UpdateTasksListDto, authorId: number, tasksListId: number){
        if(isNaN(tasksListId)) throw new Error("Некорректный id");
        const tasksList = await this.findTasksListById(authorId, tasksListId);
        if(tasksList){
            return await this.databaseService.tasksList.update({
                where: {
                  id: tasksListId,
                },
                data: patchTasksListDto,
            });
        }
    }

    async deleteTasksList(authorId: number, tasksListId: number){
        if(isNaN(tasksListId)) throw new Error("Некорректный id");
        const tasksList = await this.findTasksListById(authorId, tasksListId);
        if(tasksList) {
            await this.databaseService.tasksList.delete({ where: { id: tasksListId } });
            return tasksList;
        }
    }

    async findTasksListById(authorId: number, tasksListId: number){
        if(isNaN(tasksListId)) throw new Error("Некорректный id");
        const taskList = await this.databaseService.tasksList.findUnique({
            where: {id: tasksListId},
            include: {
                tasks: true
            },
        });
        if(taskList)
            if(taskList.authorId == authorId) 
                return taskList;
    }

    async moveListToList(ListToListURL: string, authorId: number){
        const listToList = ListToListURL.split('-');
        const list1Numb = Number(listToList[0]);
        const list2Numb = Number(listToList[1]);
        if(isNaN(list1Numb) || isNaN(list2Numb)) throw new Error("Некорректный id");
        const list1 = await this.databaseService.tasksList.findMany({ where: { sequenceNumber: list1Numb } });
        const list2 = await this.databaseService.tasksList.findMany({ where: { sequenceNumber: list2Numb } });
        if(list1[0].authorId == authorId && list2[0].authorId == authorId){
            await this.databaseService.tasksList.update({
                where: {
                  id: list1[0].id
                },
                data: {sequenceNumber: list2[0].sequenceNumber},
            });
            await this.databaseService.tasksList.update({
                where: {
                  id: list2[0].id
                },
                data: {sequenceNumber: list1[0].sequenceNumber},
            });
        }
    }

    async createTasks(createTaskstDto: CreateTasksDto, authorId: number, tasksListId: number) {
        if(isNaN(tasksListId)) throw new Error("Некорректный id");
        const taskList = await this.findTasksListById(authorId, tasksListId);
        if(taskList) return await this.databaseService.tasks.create({ data: { ...createTaskstDto, projectId: taskList.projectId, tasksListId: tasksListId, authorId: authorId } });
        
        
    }

    async patchTask(patchTaskDto: UpdateTasksDto, authorId: number, taskURL: string){
        const taskURLSplit = taskURL.split('&');
        const taskId = Number(taskURLSplit[0]);
        const taskFieldId = Number(taskURLSplit[1]);
        if(isNaN(taskId) || isNaN(taskFieldId)) throw new Error("Некорректный id задачи или ее поля");
        const task = await this.findTaskById(authorId, taskId);
        const taskFiled = await this.findTaskFieldById(authorId, taskFieldId);
        if(task){
            if(task.description != patchTaskDto.description || task.title != patchTaskDto.title){
                await this.databaseService.tasks.update({where: {
                    id: taskId },
                    data: {
                        description: patchTaskDto.description,
                        title: patchTaskDto.title
                    }
                });
            }
            if(taskFiled.taskFieldTitle != patchTaskDto.taskFieldTitle || taskFiled.taskFieldType != patchTaskDto.taskFieldType){
                await this.databaseService.taskField.update({where: {
                    id: taskFieldId },
                    data: {
                        taskFieldTitle: patchTaskDto.taskFieldTitle,
                        taskFieldType: patchTaskDto.taskFieldType
                    }
                });
            }
            if(patchTaskDto.taskFieldType == "str" && taskFiled.taskFiledKInt.length > 0){
                await this.databaseService.taskFieldInt.delete({
                    where: {
                        taskId_taskFieldId: {
                            taskId: taskFiled.taskId,
                            taskFieldId: taskFieldId
                        }
                    }
                });
            }
            else if (patchTaskDto.taskFieldType == "int" && taskFiled.taskFiledStr.length > 0){
                await this.databaseService.taskFieldStr.delete({
                    where: {
                        taskId_taskFieldId: {
                            taskId: taskFiled.taskId,
                            taskFieldId: taskFieldId
                        }
                    }
                });
            }
            if(patchTaskDto.priority || patchTaskDto.taskFieldInt || patchTaskDto.taskFieldStr)
                await this.updateTaskFieldValue({priority: patchTaskDto.priority, taskFieldInt: patchTaskDto.taskFieldInt, taskFieldStr: patchTaskDto.taskFieldStr}, authorId, taskFieldId);
            return await this.findTaskById(authorId, taskId);
        }
    }

    async deleteTask(authorId: number, taskid: number){
        if(isNaN(taskid)) throw new Error("Некорректный id");
        const task = await this.findTaskById(authorId, taskid);
        if(task) {
            await this.databaseService.tasks.delete({ where: { id: taskid } });
            return task;
        }
    }

    async findTaskById(authorId: number, taskId: number){ 
        if(isNaN(taskId)) throw new Error("Некорректный id");
        const task = await this.databaseService.tasks.findUnique({
            where: {id: taskId},
            include: {
                taskField: {
                    include: {
                        taskFiledKInt: true,
                        taskFiledStr: true,
                        taskFieldPriority: true
                    }
                }
            }
            
        });
        if(task)
            if(task.authorId == authorId) 
                return task;
    }

    async moveTaskToTaskList(tasksToListURL: string, authorId: number) {
        const tasksToList = tasksToListURL.split('-');
        const taskId = Number(tasksToList[0]);
        if(await this.findTaskById(authorId, taskId)){
            await this.databaseService.tasks.update({
                where: {
                id: taskId
                },
                data: {tasksListId: Number(tasksToList[1])},
            });
        }
        
    }

    async moveTaskToTask(taskToTasURL: string, authorId: number) {
        const taskToTask = taskToTasURL.split('-');
        const task1Num = Number(taskToTask[0]);
        const task2Num = Number(taskToTask[1]);
        if(isNaN(task1Num) || isNaN(task2Num)) throw new Error("Некорректный id");
        const task1 = await this.databaseService.tasks.findMany({ where: { sequenceNumber: task1Num } });
        const task2 = await this.databaseService.tasks.findMany({ where: { sequenceNumber: task2Num } });
        if(task1[0].authorId == authorId && task2[1].authorId){
            await this.databaseService.tasks.update({
                where: {
                  id: task1[0].id
                },
                data: {sequenceNumber: task2[0].sequenceNumber, tasksListId: task2[0].tasksListId},
            });
            await this.databaseService.tasks.update({
                where: {
                  id: task2[0].id
                },
                data: {sequenceNumber: task1[0].sequenceNumber, tasksListId: task1[0].tasksListId},
            });
        }
    }

    async createTaskField(createTasksFiledDto: CreateTasksFieldDto, authorId: number, taskId: number){
        if(isNaN(taskId)) throw new Error("Некорректный id");
        const task = await this.findTaskById(authorId, taskId);
        if(task) {
            const taskField = await this.databaseService.taskField.create({data: {taskFieldType: createTasksFiledDto.taskFieldType, taskFieldTitle: createTasksFiledDto.taskFieldTitle, authorId: authorId, taskId: taskId, projectId: task.projectId}});
            if(["высокий", "средний", "низкий"].includes(createTasksFiledDto.priority))
                await this.databaseService.taskFieldPriority.create({data: {taskId: taskId, taskFieldId: taskField.id, priority: createTasksFiledDto.priority}});
            if(createTasksFiledDto.taskFieldType == "str" && createTasksFiledDto.taskFieldStr)
                await this.databaseService.taskFieldStr.create({data: {taskFieldId: taskField.id, taskId: taskId, value: createTasksFiledDto.taskFieldStr}});
            else if(createTasksFiledDto.taskFieldType == "int" && createTasksFiledDto.taskFieldInt)
                await this.databaseService.taskFieldInt.create({data: {taskFieldId: taskField.id, taskId: taskId, value: createTasksFiledDto.taskFieldInt}});
            return await this.findTaskFieldById(authorId, taskField.id);
        }
    }

    async findTaskFieldById(authorId: number, taskFieldId: number){ 
        if(isNaN(taskFieldId)) throw new Error("Некорректный id");
        const taskField = await this.databaseService.taskField.findUnique({
            where: {id: taskFieldId} ,
            include: {
                taskFiledKInt: true,
                taskFiledStr: true,
                taskFieldPriority: true
            }
        });
        if(taskField)
            if(taskField.authorId == authorId) 
                return taskField;
    }

    async updateTaskFieldById(updateTasksFiledDto: UpdateTasksFieldDto, authorId: number, taskFieldId: number){
        if(isNaN(taskFieldId)) throw new Error("Некорректный id");
        const taskField = await this.findTaskFieldById(authorId, taskFieldId);
        if(taskField){
            if(updateTasksFiledDto.taskFieldType || updateTasksFiledDto.taskFieldTitle && (taskField.taskFieldTitle != updateTasksFiledDto.taskFieldTitle || taskField.taskFieldType != updateTasksFiledDto.taskFieldType)){
                await this.databaseService.taskField.update({
                    where: {
                        id: taskField.id
                    },
                    data: {
                        taskFieldType: updateTasksFiledDto.taskFieldType,
                        taskFieldTitle: updateTasksFiledDto.taskFieldTitle
                    }
                });
            }
            if(updateTasksFiledDto.taskFieldType == "str" && taskField.taskFiledKInt.length > 0){
                await this.databaseService.taskFieldInt.delete({
                    where: {
                        taskId_taskFieldId: {
                            taskId: taskField.taskId,
                            taskFieldId: taskFieldId
                        }
                    }
                });
            }
            else if (updateTasksFiledDto.taskFieldType == "int" && taskField.taskFiledStr.length > 0){
                await this.databaseService.taskFieldStr.delete({
                    where: {
                        taskId_taskFieldId: {
                            taskId: taskField.taskId,
                            taskFieldId: taskFieldId
                        }
                    }
                });
            }
            if(updateTasksFiledDto.priority || updateTasksFiledDto.taskFieldInt || updateTasksFiledDto.taskFieldStr)
                await this.updateTaskFieldValue({priority: updateTasksFiledDto.priority, taskFieldInt: updateTasksFiledDto.taskFieldInt, taskFieldStr: updateTasksFiledDto.taskFieldStr}, authorId, taskFieldId);
            return await this.findTaskFieldById(authorId, taskFieldId);
        }
    }

    async createTaskFieldValue(taskFieldValueDto: TasksFieldValueDto, authorId: number, taskFieldId: number){
        if(isNaN(taskFieldId)) throw new Error("Некорректный id");
        const taskField = await this.findTaskFieldById(authorId, taskFieldId);
        if(["высокий", "средний", "низкий"].includes(taskFieldValueDto.priority) && !(taskField.taskFieldPriority[0]))
            await this.databaseService.taskFieldPriority.create({data: {taskId: taskField.taskId, taskFieldId: taskField.id, priority: taskFieldValueDto.priority}});
        if(taskField.taskFieldType == "str" && taskFieldValueDto.taskFieldStr && !(taskField.taskFiledStr[0]))
            await this.databaseService.taskFieldStr.create({data: {taskFieldId: taskField.id, taskId: taskField.taskId, value: taskFieldValueDto.taskFieldStr}});
        if(taskField.taskFieldType == "int" && taskFieldValueDto.taskFieldInt && !(taskField.taskFiledKInt[0]))
            await this.databaseService.taskFieldInt.create({data: {taskFieldId: taskField.id, taskId: taskField.taskId, value: taskFieldValueDto.taskFieldInt}});
        return await this.findTaskFieldById(authorId, taskFieldId);
    }

    async updateTaskFieldValue(taskFieldValueDto: TasksFieldValueDto, authorId: number, taskFieldId: number){
        if(isNaN(taskFieldId)) throw new Error("Некорректный id");
        const taskField = await this.findTaskFieldById(authorId, taskFieldId);
        if(["высокий", "средний", "низкий"].includes(taskFieldValueDto.priority) && taskField.taskFieldPriority.length > 0 && taskFieldValueDto.priority){
            await this.databaseService.taskFieldPriority.update({
                where: {
                  taskId_taskFieldId: {
                    taskId: taskField.taskId,
                    taskFieldId: taskFieldId
                  }
                },
                data: {priority: taskFieldValueDto.priority},
            });
        }
        else if (["высокий", "средний", "низкий"].includes(taskFieldValueDto.priority) && taskField.taskFieldPriority.length == 0 && taskFieldValueDto.priority){
            await this.databaseService.taskFieldPriority.create({data: {taskId: taskField.taskId, taskFieldId: taskField.id, priority: taskFieldValueDto.priority}});
        }
        if(taskField.taskFieldType == "str" && taskField.taskFiledStr.length > 0 && taskFieldValueDto.taskFieldStr){
            await this.databaseService.taskFieldStr.update({
                where: {
                  taskId_taskFieldId: {
                    taskId: taskField.taskId,
                    taskFieldId: taskFieldId
                  }
                },
                data: {value: taskFieldValueDto.taskFieldStr},
            });
        }
        else if (taskField.taskFieldType == "str" && taskField.taskFiledStr.length == 0 && taskFieldValueDto.taskFieldStr){
            await this.databaseService.taskFieldStr.create({data: {taskFieldId: taskField.id, taskId: taskField.taskId, value: taskFieldValueDto.taskFieldStr}});
        }
        if(taskField.taskFieldType == "int" && taskField.taskFiledKInt.length > 0 && taskFieldValueDto.taskFieldInt){
            await this.databaseService.taskFieldInt.update({
                where: {
                  taskId_taskFieldId: {
                    taskId: taskField.taskId,
                    taskFieldId: taskFieldId
                  }
                },
                data: {value: taskFieldValueDto.taskFieldInt},
            });
        }
        else if(taskField.taskFieldType == "int" && taskField.taskFiledKInt.length == 0 && taskFieldValueDto.taskFieldInt){
            await this.databaseService.taskFieldInt.create({data: {taskFieldId: taskField.id, taskId: taskField.taskId, value: taskFieldValueDto.taskFieldInt}});
        }
        return await this.findTaskFieldById(authorId, taskFieldId);
    }

    async deleteTaskFieldValue(authorId: number, taskFieldURL: string){
        const taskFieldURLSplited = taskFieldURL.split('&');
        const taskFieldIdURL = Number(taskFieldURLSplited[0]);
        if(isNaN(taskFieldIdURL)) throw new Error("Некорректный id");
        const taskField = await this.findTaskFieldById(authorId, taskFieldIdURL);
        if(taskFieldURLSplited.includes("priority") && taskField.taskFieldPriority[0]){
            await this.databaseService.taskFieldPriority.delete({where: {
                taskId_taskFieldId: {
                    taskId: taskField.taskId,
                    taskFieldId: taskFieldIdURL
                }
            }});
        }
        if(taskField.taskFieldType == "int" && taskFieldURLSplited.includes("int") && taskField.taskFiledKInt[0]){
            await this.databaseService.taskFieldInt.delete({where: {
                taskId_taskFieldId: {
                    taskId: taskField.taskId,
                    taskFieldId: taskFieldIdURL
                }
            }});
        }
        else if(taskField.taskFieldType == "str" && taskFieldURLSplited.includes("str") && taskField.taskFiledStr[0]){
            await this.databaseService.taskFieldStr.delete({where: {
                taskId_taskFieldId: {
                    taskId: taskField.taskId,
                    taskFieldId: taskFieldIdURL
                }
            }});
        }
        return await this.findTaskFieldById(authorId, taskFieldIdURL);
    }
}
