import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthguard } from 'src/auth/jwt-auth-guard';
import { ProjectDtoResponse } from './dto/project-dto-response';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { CreateTasksListDto } from './dto/crate-tasks-list-dto';
import { UpdateTasksListDto } from './dto/update-task-list.dto';
import { CreateTasksDto } from './dto/create-task-dto';
import { UpdateTasksDto } from './dto/update-task.dto';
import { CreateTasksFieldDto } from './dto/create-task-field.dto';
import { UpdateTasksFieldDto } from './dto/update-task-field.dto';
import { TasksFieldValueDto } from './dto/createa-task-field-value.dto';

@ApiTags('ToDoList')
@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService
  ) {}
  
  /////////// Проекты \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание проекта'})
  @ApiResponse({status: 200})
  @Post('project')
  async createProject(@Body() createProjecteDto: CreateProjectDto,
  @Req() req: Request) {
    // @ts-expect-error
    return await this.projectsService.createProject(createProjecteDto, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить проекты со списками задач, задачами и их полями'})
  @ApiResponse({status: 200, type: [ProjectDtoResponse]})
  @Get('project')
  async getAllProjects(@Req() req: Request) {
    // @ts-expect-error
    return await this.projectsService.findAllProjects(req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить проект с листами задач, задачами и их полями'})
  @ApiResponse({status: 200, type: ProjectDtoResponse})
  @Get('project/:id')
  async getProjectsById(@Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.findProjectById(req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить проект'})
  @ApiResponse({status: 200})
  @Patch('project/:id')
  async patchProject(@Body() patchProjecteDto: UpdateProjectDto,
  @Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.patchProject(patchProjecteDto, req.user.id, +id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удалить проект'})
  @ApiResponse({status: 200})
  @Delete('project/:id')
  async deleteProject(@Req() req: Request, @Param('id') id: string ) {
    // @ts-expect-error
    return await this.projectsService.deleteProject(req.user.id, +id);
  }

  /////////// Листы задач \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание листа задач'})
  @ApiResponse({status: 200})
  @Post('taskslist/:projectId')
  async createTasksList(@Body() createTasksListDto: CreateTasksListDto,
  @Req() req: Request, @Param('projectId') projectId: string) {
    // @ts-expect-error
    return await this.projectsService.createTasksList(createTasksListDto, req.user.id, +projectId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Поменять листы местами. Пример ввода: 3-4'})
  @ApiResponse({status: 200})
  @Patch('listToList/:listToList')
  async moveListToList(@Req() req: Request, @Param('listToList') listToList: string ) {
    // @ts-expect-error
    return await this.projectsService.moveListToList(listToList, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить лист задач для задачи. Пример ввода: /1-1 где первое значение - id задачи, второе - id листа в который она переместится'})
  @ApiResponse({status: 200})
  @Patch('tasksToList/:tasksToList')
  async moveTaskToList(@Req() req: Request, @Param('tasksToList') tasksToList: string ) {
    // @ts-expect-error
    return await this.projectsService.moveTaskToTaskList(tasksToList, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удалить лист задач'})
  @ApiResponse({status: 200})
  @Delete('taskslist/:id')
  async deleteTasksList(@Req() req: Request, @Param('id') id: string ) {
    // @ts-expect-error
    return await this.projectsService.deleteTasksList(req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить лист задач'})
  @ApiResponse({status: 200})
  @Patch('taskslist/:id')
  async patchTasksList(@Body() patchTasksListDto: UpdateTasksListDto,
  @Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.patchTasksList(patchTasksListDto, req.user.id, +id);
  }

  /////////// Задачи \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание задач'})
  @ApiResponse({status: 200})
  @Post('tasks/:tasksListId')
  async createTasks(@Body() createTasksDto: CreateTasksDto,
  @Req() req: Request, @Param('tasksListId') tasksListId: string ) {
    // @ts-expect-error
    return await this.projectsService.createTasks(createTasksDto, req.user.id, +tasksListId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить задачу по ее id'})
  @ApiResponse({status: 200, type: ProjectDtoResponse})
  @Get('task/:id')
  async getTaskById(@Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.findTaskById(req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить задачу. Пример ввода: 1&1 первое число - taskId, второе taskFieldId (можно не писать его если его нет)'})
  @ApiResponse({status: 200})
  @Patch('task/:taskURL')
  async patchTask(@Body() patchTaskDto: UpdateTasksDto,
  @Req() req: Request, @Param('taskURL') taskURL: string) {
    // @ts-expect-error
    return await this.projectsService.patchTask(patchTaskDto, req.user.id, taskURL);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Поменять задачи местами по их id. Пример ввода: 1-2'})
  @ApiResponse({status: 200})
  @Patch('tasksToTask/:tasksToTask')
  async moveTaskToTask(@Req() req: Request, @Param('tasksToTask') tasksToTask: string ) {
    // @ts-expect-error
    return await this.projectsService.moveTaskToTask(tasksToTask, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удалить задачу'})
  @ApiResponse({status: 200})
  @Delete('task/:id')
  async deleteTask(@Req() req: Request, @Param('id') id: string ) {
    // @ts-expect-error
    return await this.projectsService.deleteTask(req.user.id, +id);
  }

  /////////// Поля задач \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание поля задачи'})
  @ApiResponse({status: 200})
  @Post('tasksFiled/:taskId')
  async createTaskField(@Body() createTasksFiledDto: CreateTasksFieldDto,
  @Req() req: Request, @Param('taskId') taskId: string) {
    // @ts-expect-error
    return await this.projectsService.createTaskField(createTasksFiledDto, req.user.id, +taskId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Найти поле задачи по id'})
  @ApiResponse({status: 200})
  @Get('tasksFiled/:taskFieldId')
  async getTaskFieldById(@Req() req: Request, @Param('taskFieldId') taskFieldId: string) {
    // @ts-expect-error
    return await this.projectsService.findTaskFieldById(req.user.id, +taskFieldId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Обновление поля задачи'})
  @ApiResponse({status: 200})
  @Patch('tasksFiled/:taskFieldId')
  async updateTaskField(@Body() updateTasksFiledDto: UpdateTasksFieldDto,
  @Req() req: Request, @Param('taskFieldId') taskFieldId: string) {
    // @ts-expect-error
    return await this.projectsService.updateTaskFieldById(updateTasksFiledDto, req.user.id, +taskFieldId);
  }

  /////////// Значения полей задач \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание значений поля задачи'})
  @ApiResponse({status: 200})
  @Post('tasksFiledValue/:taskFieldId')
  async createTaskFieldValueGolang(@Body() createTaskFieldValuedDto: TasksFieldValueDto,
  @Req() req: Request, @Param('taskFieldId') taskFieldId: string) {
    // @ts-expect-error
    return await this.projectsService.createTaskFieldValueGolang(createTaskFieldValuedDto, req.user.id, +taskFieldId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Обновление значений поля задачи'})
  @ApiResponse({status: 200})
  @Patch('tasksFiledValue/:taskFieldId')
  async updateTaskFieldValue(@Body() updateTaskFieldValuedDto: TasksFieldValueDto,
  @Req() req: Request, @Param('taskFieldId') taskFieldId: string) {
    // @ts-expect-error
    return await this.projectsService.updateTaskFieldValueGolang(updateTaskFieldValuedDto, req.user.id, +taskFieldId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить все значение полей задачи по TaskId'})
  @ApiResponse({status: 200})
  @Get('tasksFiledValues/:taskId')
  async getAllTaskFieldValueByTaskId(@Req() req: Request, @Param('taskId') taskId: string) {
    // @ts-expect-error
    return await this.projectsService.getAllTaskFieldValueByTaskIdGolang(req.user.id, +taskId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить значение поля задачи по Id'})
  @ApiResponse({status: 200})
  @Get('tasksFiledValue/:taskFieldId')
  async getTaskFieldValueByTaskFieldId(@Req() req: Request, @Param('taskFieldId') taskFieldId: string) {
    // @ts-expect-error
    return await this.projectsService.getTaskFieldValueByTaskFieldIdGolang(req.user.id, +taskFieldId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удаление значений поля задачи'})
  @ApiResponse({status: 200})
  @Delete('tasksFiledValue/:taskFieldid')
  async deleteTaskFieldValue(@Req() req: Request, @Param('taskFieldid') taskFieldid: string) {
    // @ts-expect-error
    return await this.projectsService.deleteTaskFieldValueGolang(req.user.id, +taskFieldid);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Найти поле задачи по id'})
  @ApiResponse({status: 200})
  @Get('taskFieldWithValue/:taskFieldId')
  async findTaskFieldByIdWithValue(@Req() req: Request, @Param('taskFieldId') taskFieldId: string) {
    // @ts-expect-error
    return await this.projectsService.findTaskFieldByIdWithValue(req.user.id, +taskFieldId);
  }
}
