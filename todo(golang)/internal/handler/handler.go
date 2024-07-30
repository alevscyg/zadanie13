package handler

import (
	"github.com/alevscyg/zadanie23/internal/model"
	"github.com/alevscyg/zadanie23/storage"
)

// CreateTaskFieldInt ...
func CreateTaskFieldInt(taskId, taskFieldId, value int, storage storage.Storage) (*model.TaskFieldInt, error) {
	u := &model.TaskFieldInt{
		TaskId:      taskId,
		TaskFieldId: taskFieldId,
		Value:       value,
	}
	todo, err := storage.ToDo().CreateTaskFieldInt(u)
	return todo, err
}

// CreateTaskFieldStr ...
func CreateTaskFieldStr(taskId, taskFieldId int, value string, storage storage.Storage) (*model.TaskFieldStr, error) {
	u := &model.TaskFieldStr{
		TaskId:      taskId,
		TaskFieldId: taskFieldId,
		Value:       value,
	}
	todo, err := storage.ToDo().CreateTaskFieldStr(u)
	return todo, err
}

// UpdateTaskFieldInt ...
func UpdateTaskFieldInt(taskId, taskFieldId, value int, storage storage.Storage) (*model.TaskFieldInt, error) {
	u := &model.TaskFieldInt{
		TaskId:      taskId,
		TaskFieldId: taskFieldId,
		Value:       value,
	}
	todo, err := storage.ToDo().UpdateTaskFieldInt(u)
	return todo, err
}

// UpdateTaskFieldStr ...
func UpdateTaskFieldStr(taskId, taskFieldId int, value string, storage storage.Storage) (*model.TaskFieldStr, error) {
	u := &model.TaskFieldStr{
		TaskId:      taskId,
		TaskFieldId: taskFieldId,
		Value:       value,
	}
	todo, err := storage.ToDo().UpdateTaskFieldStr(u)
	return todo, err
}

// GetAllTaskFieldIntByTaskId ...
func GetAllTaskFieldIntByTaskId(taskId int, storage storage.Storage) ([]model.TaskFieldInt, error) {
	todo, err := storage.ToDo().GetAllTaskFieldIntByTaskId(taskId)
	return todo, err
}

// GetAllTaskFieldStrByTaskId ...
func GetAllTaskFieldStrByTaskId(taskId int, storage storage.Storage) ([]model.TaskFieldStr, error) {
	todo, err := storage.ToDo().GetAllTaskFieldStrByTaskId(taskId)
	return todo, err
}

// GetTaskFieldIntByTaskFieldId ...
func GetTaskFieldIntByTaskFieldId(taskId, taskFieldId int, storage storage.Storage) (*model.TaskFieldInt, error) {
	todo, err := storage.ToDo().GetTaskFieldIntByTaskFieldId(taskId, taskFieldId)
	return todo, err
}

// GetTaskFieldStrByTaskFieldId ...
func GetTaskFieldStrByTaskFieldId(taskId, taskFieldId int, storage storage.Storage) (*model.TaskFieldStr, error) {
	todo, err := storage.ToDo().GetTaskFieldStrByTaskFieldId(taskId, taskFieldId)
	return todo, err
}

// DeleteTaskFieldIntByTaskFieldId ...
func DeleteTaskFieldIntByTaskFieldId(taskId, taskFieldId int, storage storage.Storage) error {
	err := storage.ToDo().DeleteTaskFieldInt(taskId, taskFieldId)
	return err
}

// DeleteTaskFieldStrByTaskFieldId ...
func DeleteTaskFieldStrByTaskFieldId(taskId, taskFieldId int, storage storage.Storage) error {
	err := storage.ToDo().DeleteTaskFieldStr(taskId, taskFieldId)
	return err
}
