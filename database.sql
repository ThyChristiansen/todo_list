CREATE TABLE "tasks" (
"id" serial primary key, 
"taskToDo" VARCHAR (250) NOT NULL
);

INSERT INTO "tasks" ( "listToDo" )
VALUES ('todo 1');

INSERT INTO "tasks" ( "listToDo")
VALUES ('todo 2');

ALTER TABLE tasks
ADD status VARCHAR(30) DEFAULT 'Uncomplete';



