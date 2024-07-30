package model

type TaskFieldInt struct {
	TaskId      int `json:"taskid"`
	TaskFieldId int `json:"taskfieldid"`
	Value       int `json:"value"`
}

type TaskFieldStr struct {
	TaskId      int    `json:"taskid"`
	TaskFieldId int    `json:"taskfieldid"`
	Value       string `json:"value"`
}
