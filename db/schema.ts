import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// Role type for employees
export const EMPLOYEE_ROLES = ["ADMIN", "EMPLOYEE"] as const;
export type EmployeeRole = (typeof EMPLOYEE_ROLES)[number];

// Employees table
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 20 }).notNull().$type<EmployeeRole>(),
  referralCode: varchar("referral_code", { length: 25 })
    .notNull()
    .$defaultFn(() => createId())
    .unique(),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  sessionId: varchar("session_id", { length: 255 }).unique(),
});

// Registration types enum
export const PARTICIPANT_TYPES = [
  "new_learner",
  "student",
  "returning_gri_learner",
] as const;

// Organization enum
export const ORGANIZATIONS = ["IACL", "KCL"] as const;
export type Organization = (typeof ORGANIZATIONS)[number];

// Referral sources enum
export const REFERRAL_SOURCES = [
  "linkedin",
  "newsletter",
  "referral",
  "other_social_media",
] as const;

// Registrations table
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  participantType: varchar("participant_type", { length: 50 }).notNull(),
  organization: varchar("organization", { length: 255 }).notNull().$type<Organization>(),
  position: varchar("position", { length: 255 }).notNull(),
  referralSource: varchar("referral_source", { length: 50 }).notNull(),
  additionalInfo: text("additional_info"),
  referredById: integer("referred_by_id").references(() => employees.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relationships
export const employeesRelations = relations(employees, ({ many }) => ({
  registrations: many(registrations),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  referredBy: one(employees, {
    fields: [registrations.referredById],
    references: [employees.id],
  }),
}));

// Types for TypeScript
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;

export type ParticipantType = (typeof PARTICIPANT_TYPES)[number];
export type ReferralSource = (typeof REFERRAL_SOURCES)[number];
