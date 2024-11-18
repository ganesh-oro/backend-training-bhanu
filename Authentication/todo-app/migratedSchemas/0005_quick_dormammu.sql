CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
