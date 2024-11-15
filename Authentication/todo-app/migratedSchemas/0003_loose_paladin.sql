CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
