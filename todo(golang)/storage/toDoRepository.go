package storage

import (
	"github.com/alevscyg/zadanie23/internal/model"
)

// ToDoRepository ...
type ToDoRepository interface {
	CreateTaskFieldInt(*model.TaskFieldInt) (*model.TaskFieldInt, error)
	CreateTaskFieldStr(*model.TaskFieldStr) (*model.TaskFieldStr, error)
	UpdateTaskFieldInt(*model.TaskFieldInt) (*model.TaskFieldInt, error)
	UpdateTaskFieldStr(*model.TaskFieldStr) (*model.TaskFieldStr, error)
	GetAllTaskFieldIntByTaskId(TaskId int) ([]model.TaskFieldInt, error)
	GetAllTaskFieldStrByTaskId(TaskId int) ([]model.TaskFieldStr, error)
	GetTaskFieldIntByTaskFieldId(TaskFieldId int, TaskId int) (*model.TaskFieldInt, error)
	GetTaskFieldStrByTaskFieldId(TaskFieldId int, TaskId int) (*model.TaskFieldStr, error)
	DeleteTaskFieldInt(taskId, taskFieldId int) error
	DeleteTaskFieldStr(taskId, taskFieldId int) error
}
