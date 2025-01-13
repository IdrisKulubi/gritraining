ALTER TABLE "employees" ADD COLUMN "session_id" varchar(255);--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_session_id_unique" UNIQUE("session_id");