import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, ExecutionContext, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthguard } from 'src/auth/jwt-auth-guard';
import { ProjectDtoResponse } from './dto/project-dto-response';
import { ProjectDto } from './dto/project-dto';
import { TasksListDto } from './dto/tasksList-dto';
import { TasksDto } from './dto/task-dto';

@ApiTags('ToDoList')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService
  ) {}
  
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание проекта'})
  @ApiResponse({status: 200})
  @Post('project')
  async createProject(@Body() createProjecteDto: ProjectDto,
  @Req() req: Request) {
    // @ts-expect-error
    return await this.projectsService.createProject(createProjecteDto, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить проекты со списками задач и задачами'})
  @ApiResponse({status: 200, type: [ProjectDtoResponse]})
  @Get('project')
  async getAllProjects(@Req() req: Request) {
    // @ts-expect-error
    return await this.projectsService.findAllProjects(req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Получить проект со списками задач и задачами'})
  @ApiResponse({status: 200, type: ProjectDtoResponse})
  @Get('project/:id')
  async getProjectsById(@Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.findProjectById(req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание списка задач'})
  @ApiResponse({status: 200})
  @Post('taskslist/:projectId')
  async createTasksList(@Body() createTasksListDto: TasksListDto,
  @Req() req: Request, @Param('projectId') projectId: string) {
    // @ts-expect-error
    return await this.projectsService.createTasksList(createTasksListDto, req.user.id, +projectId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Создание задач'})
  @ApiResponse({status: 200})
  @Post('tasks/:tasksListId')
  async createTasks(@Body() createTasksDto: TasksDto,
  @Req() req: Request, @Param('tasksListId') tasksListId: string ) {
    // @ts-expect-error
    return await this.projectsService.createTasks(createTasksDto, req.user.id, +tasksListId);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Поменять лист задачи'})
  @ApiResponse({status: 200})
  @Patch('tasksToList/:tasksToList')
  async moveTaskToList(@Req() req: Request, @Param('tasksToList') tasksToList: string ) {
    // @ts-expect-error
    return await this.projectsService.moveTaskToTaskList(tasksToList, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Поменять место листа'})
  @ApiResponse({status: 200})
  @Patch('listToList/:listToList')
  async moveListToList(@Req() req: Request, @Param('listToList') listToList: string ) {
    // @ts-expect-error
    return await this.projectsService.moveListToList(listToList, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Поменять место задачи'})
  @ApiResponse({status: 200})
  @Patch('tasksToTask/:tasksToTask')
  async moveTaskToTask(@Req() req: Request, @Param('tasksToTask') tasksToTask: string ) {
    // @ts-expect-error
    return await this.projectsService.moveTaskToTask(tasksToTask, req.user.id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удалить проект'})
  @ApiResponse({status: 200})
  @Delete('project/:id')
  async deleteProject(@Req() req: Request, @Param('id') id: string ) {
    // @ts-expect-error
    return await this.projectsService.deleteProject(req.user.id, +id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удалить лист задач'})
  @ApiResponse({status: 200})
  @Delete('taskslist/:id')
  async deleteTasksList(@Req() req: Request, @Param('id') id: string ) {
    // @ts-expect-error
    return await this.projectsService.deleteTasksList(req.user.id, +id);
  }

  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Удалить задачу'})
  @ApiResponse({status: 200})
  @Delete('task/:id')
  async deleteTask(@Req() req: Request, @Param('id') id: string ) {
    // @ts-expect-error
    return await this.projectsService.deleteTask(req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить проект'})
  @ApiResponse({status: 200})
  @Patch('project/:id')
  async patchProject(@Body() patchProjecteDto: ProjectDto,
  @Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.patchProject(patchProjecteDto, req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить список задач'})
  @ApiResponse({status: 200})
  @Patch('taskslist/:id')
  async patchTasksList(@Body() patchTasksListDto: TasksListDto,
  @Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.patchTasksList(patchTasksListDto, req.user.id, +id);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthguard)
  @ApiOperation({summary: 'Изменить задачу'})
  @ApiResponse({status: 200})
  @Patch('task/:id')
  async patchTask(@Body() patchTaskDto: TasksDto,
  @Req() req: Request, @Param('id') id: string) {
    // @ts-expect-error
    return await this.projectsService.patchTask(patchTaskDto, req.user.id, +id);
  }
}
