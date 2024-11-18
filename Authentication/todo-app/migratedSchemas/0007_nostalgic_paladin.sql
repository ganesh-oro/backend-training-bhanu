ALTER TABLE "todos" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET DEFAULT 'false';--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" DROP NOT NULL;