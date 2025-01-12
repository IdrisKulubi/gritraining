CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"referral_code" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "employees_email_unique" UNIQUE("email"),
	CONSTRAINT "employees_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"country" varchar(100) NOT NULL,
	"participant_type" varchar(50) NOT NULL,
	"organization" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"referral_source" varchar(50) NOT NULL,
	"additional_info" text,
	"referred_by_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_referred_by_id_employees_id_fk" FOREIGN KEY ("referred_by_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;