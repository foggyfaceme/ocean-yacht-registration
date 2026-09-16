# Ocean Yacht Registration

A launch-ready public website, Polish EU flag pricing configurator, five-step registration application, and admin workspace for Ocean Yacht Registration.

## Run locally

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Admin

- Route: `#/admin`
- Email: `admin@oceanyachtregistration.com`
- Password: `ocean-admin`

Applications, contact messages, notes and document files are stored in this browser (`localStorage` and `IndexedDB`). They are not uploaded to a server.

## Before live traffic

Connect a database, private object storage, hashed admin credentials, transactional email, and client-approved legal copy. This front-end is the complete customer and operations interface for that handoff.
