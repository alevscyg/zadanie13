import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProjectDto } from './dto/project-dto';
import { TasksListDto } from './dto/tasksList-dto';
import { TasksDto } from './dto/task-dto';

@Injectable()
export class ProjectsService {
  
    constructor(private databaseService: DatabaseService){}

    async createProject(createProjecteDto: ProjectDto, userId: number) {
        return await this.databaseService.project.create({ data: { ...createProjecteDto, authorId: userId } });
    }

    async patchProject(patchProjecteDto: ProjectDto, authorId: number, projectId: number){
        if(isNaN(projectId)) return {message: "Некорректный id"};
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

    async deleteProject(authorId: number, projectId: number){
        if(isNaN(projectId)) return {message: "Некорректный id"};
        const project = await this.findProjectById(authorId, projectId);
        if( project ){
            await this.databaseService.project.delete({ where: { id: projectId } });
            return project;
        }
        
    }
    async findProjectById(authorId: number, projectId: number){
        if(isNaN(projectId)) return {message: "Некорректный id"};
        const project = await this.databaseService.project.findUnique({
            where: {id: projectId} ,
            include: {
                tasksList: {
                    include: {
                        tasks : true
                    }
                },
            }
        });
        if(project.authorId == authorId) return project;
    }

    async findAllProjects(authorId: number) {
        return await this.databaseService.project.findMany({
            where: {authorId: authorId} ,
            include: {
                tasksList: {
                    include: {
                        tasks : true
                    }
                },
            }});
    }

    async createTasksList(createTasksListDto: TasksListDto, authorId: number, projectId: number) {
        if(isNaN(projectId)) return {message: "Некорректный id"};
        return await this.databaseService.tasksList.create({ data: { ...createTasksListDto, projectId: projectId, authorId: authorId } });
    }
    
    async patchTasksList(patchTasksListDto: TasksListDto, authorId: number, tasksListId: number){
        if(isNaN(tasksListId)) return {message: "Некорректный id"};
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
        if(isNaN(tasksListId)) return {message: "Некорректный id"};
        const tasksList = await this.findTasksListById(authorId, tasksListId);
        if(tasksList) {
            await this.databaseService.tasksList.delete({ where: { id: tasksListId } });
            return tasksList;
        }
    }

    async findTasksListById(authorId: number, tasksListId: number){
        if(isNaN(tasksListId)) return {message: "Некорректный id"};
        const taskList = await this.databaseService.tasksList.findUnique({
            where: {id: tasksListId},
            include: {
                tasks: true
            },
        });
        if(taskList.authorId == authorId) return taskList;
    }

    async moveListToList(ListToListURL: string, authorId: number){
        const listToList = ListToListURL.split('-');
        const list1Numb = Number(listToList[0]);
        const list2Numb = Number(listToList[1]);
        if(isNaN(list1Numb) || isNaN(list2Numb)) return {message: "Некорректный id"};
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

    async createTasks(createTaskstDto: TasksDto, authorId: number, tasksListId: number) {
        if(isNaN(tasksListId)) return {message: "Некорректный id"};
        return await this.databaseService.tasks.create({ data: { ...createTaskstDto, tasksListId: tasksListId, authorId: authorId } });
        
    }

    async patchTask(patchTaskDto: TasksDto, authorId: number, taskId: number){
        if(isNaN(taskId)) return {message: "Некорректный id"};
        const task = await this.findTaskById(authorId, taskId);
        if(task){
            return await this.databaseService.tasks.update({
                where: {
                  id: taskId,
                },
                data: patchTaskDto,
            });
        }
    }

    async deleteTask(authorId: number, taskid: number){
        if(isNaN(taskid)) return {message: "Некорректный id"};
        const task = await this.findTaskById(authorId, taskid);
        if(task) {
            await this.databaseService.tasks.delete({ where: { id: taskid } });
            return task;
        }
    }

    async findTaskById(authorId: number, taskId: number){ 
        if(isNaN(taskId)) return {message: "Некорректный id"};
        const task = await this.databaseService.tasks.findUnique({
            where: {id: taskId} ,
            
        });
        if(task.authorId == authorId) return task;
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
        if(isNaN(task1Num) || isNaN(task2Num)) return {message: "Некорректный id"};
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
}
