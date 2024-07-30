package sqlstorage

import (
	"database/sql"

	"github.com/alevscyg/zadanie23/internal/model"
	"github.com/alevscyg/zadanie23/storage"
)

// ToDoRepository ...
type ToDoRepository struct {
	storage *Storage
}

// CreateTaskFieldInt ...
func (r *ToDoRepository) CreateTaskFieldInt(u *model.TaskFieldInt) (*model.TaskFieldInt, error) {
	if err := r.storage.db.QueryRow(
		"INSERT INTO task_field_int (taskid, taskfieldid, value) VALUES ($1, $2, $3) RETURNING value",
		u.TaskId,
		u.TaskFieldId,
		u.Value,
	).Scan(&u.Value); err != nil {
		return nil, err
	}
	return u, nil
}

// CreateTaskFieldStr ...
func (r *ToDoRepository) CreateTaskFieldStr(u *model.TaskFieldStr) (*model.TaskFieldStr, error) {
	if err := r.storage.db.QueryRow(
		"INSERT INTO task_field_str (taskid, taskfieldid, value) VALUES ($1, $2, $3) RETURNING value",
		u.TaskId,
		u.TaskFieldId,
		u.Value,
	).Scan(
		&u.Value); err != nil {
		return nil, err
	}
	return u, nil
}

// UpdateTaskFieldInt ...
func (r *ToDoRepository) UpdateTaskFieldInt(u *model.TaskFieldInt) (*model.TaskFieldInt, error) {
	if err := r.storage.db.QueryRow(
		"UPDATE task_field_int SET value = $3 WHERE taskid = $1 AND taskfieldid = $2 RETURNING value",
		u.TaskId,
		u.TaskFieldId,
		u.Value,
	).Scan(&u.Value); err != nil {
		return nil, err
	}
	return u, nil
}

// UpdateTaskFieldStr ...
func (r *ToDoRepository) UpdateTaskFieldStr(u *model.TaskFieldStr) (*model.TaskFieldStr, error) {
	if err := r.storage.db.QueryRow(
		"UPDATE task_field_str SET value = $3 WHERE taskid = $1 AND taskfieldid = $2 RETURNING value",
		u.TaskId,
		u.TaskFieldId,
		u.Value,
	).Scan(&u.Value); err != nil {
		return nil, err
	}
	return u, nil
}

// GetAllTaskFieldIntByTaskId ...
func (r *ToDoRepository) GetAllTaskFieldIntByTaskId(TaskId int) ([]model.TaskFieldInt, error) {
	var listsTaskFieldInt []model.TaskFieldInt
	err := r.storage.db.Select(&listsTaskFieldInt, "SELECT taskid, taskfieldid, value FROM task_field_int WHERE taskid = $1", TaskId)
	return listsTaskFieldInt, err
}

// GetAllTaskFieldStrByTaskId ...
func (r *ToDoRepository) GetAllTaskFieldStrByTaskId(TaskId int) ([]model.TaskFieldStr, error) {
	var listsTaskFieldStr []model.TaskFieldStr
	err := r.storage.db.Select(&listsTaskFieldStr, "SELECT taskid, taskfieldid, value FROM task_field_str WHERE taskid = $1", TaskId)
	return listsTaskFieldStr, err
}

// GetTaskFieldIntByTaskFieldId ...
func (r *ToDoRepository) GetTaskFieldIntByTaskFieldId(taskId, taskFieldId int) (*model.TaskFieldInt, error) {
	taskFieldInt := &model.TaskFieldInt{}
	if err := r.storage.db.QueryRow(
		"SELECT taskid, taskfieldid, value FROM task_field_int WHERE taskid = $1 AND taskfieldid = $2",
		taskId,
		taskFieldId,
	).Scan(
		&taskFieldInt.TaskId,
		&taskFieldInt.TaskFieldId,
		&taskFieldInt.Value,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, storage.ErrRecordNotFound
		}

		return nil, err
	}

	return taskFieldInt, nil
}

// GetTaskFieldStrByTaskFieldId ...
func (r *ToDoRepository) GetTaskFieldStrByTaskFieldId(taskId, taskFieldId int) (*model.TaskFieldStr, error) {
	taskFieldStr := &model.TaskFieldStr{}
	if err := r.storage.db.QueryRow(
		"SELECT taskid, taskfieldid, value FROM task_field_str WHERE taskid = $1 AND taskfieldid = $2",
		taskId,
		taskFieldId,
	).Scan(
		&taskFieldStr.TaskId,
		&taskFieldStr.TaskFieldId,
		&taskFieldStr.Value,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, storage.ErrRecordNotFound
		}

		return nil, err
	}

	return taskFieldStr, nil
}

// DeleteTaskFieldInt ...
func (r *ToDoRepository) DeleteTaskFieldInt(taskId, taskFieldId int) error {
	_, err := r.storage.db.Exec("DELETE FROM task_field_int WHERE taskid = $1 AND taskfieldid = $2", taskId, taskFieldId)
	return err
}

// DeleteTaskFieldInt ...
func (r *ToDoRepository) DeleteTaskFieldStr(taskId, taskFieldId int) error {
	_, err := r.storage.db.Exec("DELETE FROM task_field_str WHERE taskid = $1 AND taskfieldid = $2", taskId, taskFieldId)
	return err
}
