CREATE TABLE IF NOT EXISTS task_field_str (
 taskid INTEGER,
 taskfieldid INTEGER,
 value VARCHAR(255) not null,
 PRIMARY KEY (taskid, taskfieldid)
);

CREATE TABLE IF NOT EXISTS task_field_int (
 taskid INTEGER,
 taskfieldid INTEGER,
 value INTEGER not null,
 PRIMARY KEY (taskid, taskfieldid)
);