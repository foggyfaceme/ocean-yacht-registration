# Ocean Yacht Registration MVP

A responsive browser MVP for Ocean Yacht Registration. It includes the public website, five-step application flow, document metadata capture, application IDs, and a local admin workspace.

## Run locally

From this directory:

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Demo admin access

- URL: `#/admin`
- Email: `admin@oceanyachtregistration.com`
- Password: `ocean-admin`

Applications are stored in the browser's `localStorage`; the in-progress form is stored in `sessionStorage`.

## Included

- Responsive public pages: home, about, services, how it works, FAQ, contact, privacy and terms
- Multi-step application form with client-side required-field validation
- Required document checks and 10 MB/type validation
- Human-readable application IDs using the `OYR-YYYY-000001` format
- Confirmation state after submission
- Admin login screen, dashboard, application list, search and status filter
- Application detail view with private-record document metadata, status history and internal notes
- Working admin views for customers, documents, contact messages, settings, email logs and audit logs
- Contact form persistence and strict demo admin credential validation
- Mobile navigation and responsive admin tables

## Production handoff

This is a front-end MVP scaffold, not a production deployment. Before handling real customer identity or ownership documents, replace the browser storage and demo login with a server-side application using PostgreSQL/Prisma, secure password hashing and sessions, private object storage, server-side MIME/file validation, rate limiting, audit logging, and a transactional email provider such as Resend, Postmark or SES. Replace the placeholder privacy and terms copy with client-approved legal content, and configure the actual company contact details and service requirements.

No customer data, secrets or uploaded files should be committed to the repository.