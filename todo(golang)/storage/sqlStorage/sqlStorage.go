package sqlstorage

import (
	"github.com/alevscyg/zadanie23/storage"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // ...
)

// Storage ...
type Storage struct {
	db             *sqlx.DB
	ToDoRepository *ToDoRepository
}

// New ...
func New(db *sqlx.DB) *Storage {
	return &Storage{
		db: db,
	}
}

// ToDo ...
func (s *Storage) ToDo() storage.ToDoRepository {
	if s.ToDoRepository != nil {
		return s.ToDoRepository
	}

	return &ToDoRepository{
		storage: s,
	}
}
