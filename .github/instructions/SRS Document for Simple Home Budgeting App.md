# 😀 Purpose & Scope

# Purpose and Scope:

## Purpose:

Provide a simple platform to plan and track monthly budgets by entering projected and actual incomes, savings and expenses and to review monthly summaries and history.

## Scope:

Includes creating/editing projected and actual amounts of month’s incomes/savings; month’s budget summary; categorical details of month’s expenses; make category selectable for individual expense; create default miscellaneous category for expenses; calendar views with per date expense totals, per‑expense detail entry; month/year navigation/history for incomes/savings/expenses; difference between projected and actual amounts of incomes/savings/expenses;

# 😀 Actors

# Actors:

## User:

An individual identified by a unique phone number who creates/edits projected and actual incomes/savings/expenses, assigns categories, views summaries/calendar, and navigates history.

# 😀 Functional Requirements

# Functional Requirements:

- [x] ~~FR-0a — The user shall register to the system using phone number and name.~~
- [x] ~~FR-0b — The user shall login to the system using phone number.~~
- [x] FR-01 — The user shall input/edit/view/delete the month's projected incomes.

  FR-01 \- MVP \- High

- [ ] FR-02 — The user shall view the total of the month's projected incomes.

  FR-02 \- MVP \- High

- [x] FR-03 — The user shall input/edit/view/delete the month’s projected savings.

  FR-03 \- MVP \- High

- [] FR-04 — The user shall view the total of the month's projected savings.

  FR-04 \- MVP \- High

- [x] FR-05 — The user shall input/edit/view/delete the month's actual incomes.

  FR-05 \- MVP \- High

- [ ] FR-06 — The user shall view the total of the month's actual incomes.

  FR-06 \- MVP \- High

- [x] FR-07 — The user shall input/edit/view/delete the month’s actual savings.

  FR-07 \- MVP \- High

- [ ] FR-08 — The user shall view the total of the month's actual savings.

  FR-08 \- MVP \- High

- [ ] FR-09 — The user shall view the difference between projected and actual incomes.

  FR-09 \- MVP \- High

- [ ] FR-10 — The user shall view the difference between projected and actual savings.

  FR-10 \- MVP \- High

- [ ] FR-11 — The user shall view the difference between totals of projected and actual incomes.

  FR-11 \- MVP \- High

- [ ] FR-12 — The user shall view the difference between totals of projected and actual savings.

  FR-12 \- MVP \- High

- [x] FR-13 — The user shall track the history of incomes/savings by navigating through previous months and years.

  FR-13 \- MVP \- High

- [ ] FR-14 — The user shall create/edit/view/delete the parent category for the expenses.

  FR-14 \- MVP \- High

- [ ] FR-15 — The user shall add/edit/view/delete a category for the expenses.

  FR-15 \- MVP \- High

- [ ] FR-16 — The user shall make a category selectable/unselectable for an individual expense.

  FR-16 \- MVP \- High

- [ ] FR-17 — The user shall input/edit/view/delete the projected expenses amount for a category.

  FR-17 \- MVP \- High

- [ ] FR-18 — The user shall input/edit/view/delete the actual expenses amount for a category if and only if the category is unselectable for an individual expense.

  FR-18 \- MVP \- High

- [ ] FR-19 — The user shall only “view” the actual expenses amount for a category if it is selectable for an individual expense.

  FR-19 \- MVP \- High

- [ ] FR-20 — The user shall view the difference between projected and actual expenses amounts for a category.

  FR-20 \- MVP \- High

- [ ] FR-21 — The user shall view the difference between totals of projected and actual expenses amounts for a category.

  FR-21 \- MVP \- High

- [ ] FR-22 — The user shall view totals and difference of totals for projected and actual expenses of each parent category.

  FR-22 \- MVP \- High

- [ ] FR-23 — The user shall view totals and difference of totals for projected and actual monthly expenses.

  FR-23 \- MVP \- High

- [ ] FR-24 — The user shall track the history of monthly expenses by navigating through previous months and years.

  FR-24 \- MVP \- High

- [ ] FR-25 — The user shall view a monthly budget summary showing totals for projected and actual incomes, expenses and the difference (projected − actual) for both.

  FR-25 \- MVP \- High

- [ ] FR-26 — The user shall track the history of budget summaries by navigating through previous months and years.

  FR-26 \- MVP \- High

- [ ] FR-27 — The user shall view the calendar of the current month with total expense of that day written beneath the date and be able to drill down to per‑expense details.

  FR-27 \- MVP \- High

- [ ] FR-28 — The user shall add/view/edit/delete detail for each expense individually, against each date.

  FR-28 \- MVP \- High

- [ ] FR-29 — The user shall view and add category for individual expense from the list of categories made selectable in the monthly expenses window.

  FR-29 \- MVP \- High

- [ ] FR-30 — The user shall view the total of individual expenses of the day.

  FR-30 \- MVP \- High

- [ ] FR-31 — The user shall track the history of daily expenses by navigating through previous months and years.

  FR-31 \- MVP \- High

# 😀 Non-Functional Requirements

# Non-Functional Requirements:

- [ ] NFR-01 — Performance — High: Typical month view loads ≤2s; single-item operations ≤1s.
- [ ] NFR-02 — Availability & Backup — High: Uptime ≥99.5%;.
- [ ] NFR-03 — Security & Authentication — Medium: User identity is established via unique phone number.
- [ ] NFR-04 — Data Retention & Export — None.
- [ ] NFR-05 — Validation & Error Handling — High: Client/server validation (required fields, amount\>0, valid month/date); clear errors.
- [ ] NFR-06 — Mobile Responsiveness & Accessibility — High: Responsive UI.
- [ ] NFR-07 — Privacy & Encryption — None.

# 😀 Database Schema

# Database Schema:

## Tables:

1. users
2. incomes
3. savings
4. parentcategories
5. monthlycategoricalexpenses
6. dailyexpenses

## [Eraser.io](http://Eraser.io) schema link:

https://app.eraser.io/workspace/om1g0uqKmHAiBa8cQZ7Z?origin=share

## [Eraser.io](http://Eraser.io) schema code:

title Simple Home Budgeting App Data Model  
notation crows-foot  
typeface clean  
styleMode watercolor  
colorMode pastel

users \[icon: user, color: blue\] {  
 id string pk  
 phoneNumber string unique  
 phoneVerified boolean default false  
 displayName string  
 isActive boolean default true  
 createdAt Date  
 updatedAt Date  
}

incomes \[icon: cash, color: green\] {  
 id string pk  
 userId ObjectId users  
 description string  
 projectedAmount number  
 actualAmount number  
 month date  
 createdAt Date  
 updatedAt Date  
}

savings \[icon: save, color: orange\] {  
 id string pk  
 userId ObjectId users  
 description string  
 projectedAmount number  
 actualAmount number  
 month date  
 createdAt Date  
 updatedAt Date  
}

parentcategories \[icon: folder, color: purple\] {  
 id string pk  
 userId ObjectId users  
 description string  
 createdAt Date  
 updatedAt Date  
}

monthlycategoricalexpenses \[icon: tag, color: red\] {  
 id string pk  
 userId ObjectId users  
 parentId ObjectId parentcategories  
 description string  
 projectedAmount number  
 actualAmount number  
 month date  
 selectable boolean default false  
 createdAt Date  
 updatedAt Date  
}

dailyexpenses \[icon: receipt, color: yellow\] {  
 id string pk  
 userId ObjectId users  
 monthlyCategoricalExpenseId ObjectId monthlycategoricalexpenses  
 description string  
 amount number  
 date Date  
 createdAt Date  
 updatedAt Date  
}

users.id \< incomes.userId  
users.id \< savings.userId  
users.id \< parentcategories.userId  
users.id \< monthlycategoricalexpenses.userId  
users.id \< dailyexpenses.userId  
parentcategories.id \< monthlycategoricalexpenses.parentId  
monthlycategoricalexpenses.id \< dailyexpenses.monthlyCategoricalExpenseId
