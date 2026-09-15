# OCEAN YACHT REGISTRATION
## Professional Website + Yacht Registration Application Management System

**Document Type:** Product Requirements Document / Developer Specification  
**Version:** 1.0  
**Project:** Ocean Yacht Registration  
**Target:** Production-ready MVP  
**Budget Scope:** $120 / approximately 35,000 PKR  
**Primary Users:** Website Visitors, Customers/Applicants, Admin  
**Platform:** Responsive Web Application  
**Priority:** Functional MVP first, premium visual presentation second, extensibility third

---

# 1. PROJECT OBJECTIVE

Build a professional, modern and luxury-oriented website for Ocean Yacht Registration that serves two purposes:

1. Present the company as a credible professional yacht registration service.
2. Allow potential customers to submit yacht registration applications online and allow the business owner/admin to manage those applications from a secure dashboard.

This is NOT just a static company website.

The MVP must provide:

```text
PUBLIC WEBSITE
       ↓
REGISTRATION APPLICATION
       ↓
CUSTOMER INFORMATION
       ↓
YACHT INFORMATION
       ↓
DOCUMENT UPLOAD
       ↓
APPLICATION SUBMISSION
       ↓
SYSTEM GENERATES APPLICATION ID
       ↓
CUSTOMER RECEIVES EMAIL
       ↓
ADMIN RECEIVES NOTIFICATION
       ↓
ADMIN MANAGES APPLICATION
```

---

# 2. BUSINESS OBJECTIVE

The system should replace a manual email/contact-based registration process with a centralized online application workflow.

The business owner should be able to:

- Receive applications
- Know who submitted an application
- Know what yacht/service they requested
- See customer details
- See yacht details
- Access uploaded documents
- Track application status
- Add internal notes
- Contact the customer
- See application history
- Receive notification of new applications

The customer should be able to:

- Learn about the company
- Understand available services
- Start a registration application
- Enter customer information
- Enter yacht information
- Upload required documents
- Submit the application
- Receive an automatically generated application/order number
- Receive confirmation by email

---

# 3. MVP SCOPE

## INCLUDED

### Public Website

- Home
- About
- Services
- Service details
- How It Works
- FAQ
- Contact
- Privacy Policy
- Terms & Conditions
- Start Registration CTA

### Application System

- Multi-step registration form
- Applicant details
- Yacht details
- Registration/service type
- Document upload
- Application review before submission
- Application submission
- Automatic application ID
- Confirmation page
- Automated email

### Admin

- Secure login
- Dashboard
- Application list
- Application details
- Customer details
- Yacht details
- Documents
- Status management
- Internal notes
- Basic search/filter
- Application history
- Email notification

### Technical

- Responsive design
- Mobile support
- Desktop support
- Basic SEO
- Form validation
- Secure file handling
- Production deployment

---

# 4. OUT OF SCOPE FOR MVP

The following MUST NOT be implemented unless separately approved:

- Online payment gateway
- Customer account/portal
- Customer login
- WhatsApp automation
- Advanced CRM
- Multiple staff roles
- Complex permission management
- Automated legal document generation
- AI features
- Live chat
- Multi-language system
- Advanced analytics
- Accounting
- Invoicing system
- Subscription system
- Mobile application
- Native iOS application
- Native Android application
- Complex CMS
- Advanced marketing automation

These may become Phase 2 features.

---

# 5. DESIGN DIRECTION

The website must feel:

- Premium
- Luxury
- Maritime
- Professional
- Trustworthy
- Minimal
- Elegant
- International

It must NOT feel:

- Cheap
- Generic
- Over-designed
- Like a random SaaS template
- Like a basic WordPress website
- Overloaded with animations
- Overloaded with cards
- Overloaded with gradients

The visual language should resemble a premium maritime consultancy / yacht services company.

---

# 6. DESIGN SYSTEM

## Primary Visual Direction

Use:

- Deep navy
- White / off-white
- Subtle gold accent
- Soft gray
- High-quality yacht imagery
- Large whitespace
- Elegant typography

Avoid excessive colors.

## Typography

Recommended:

### Headings

One elegant serif font such as:

- Playfair Display
- Cormorant Garamond

### Body/UI

Use:

- Inter
- Manrope

Do not use more than two font families.

---

# 7. RESPONSIVE DESIGN

The website must work on:

- Desktop
- Laptop
- Tablet
- Mobile

Minimum tested widths:

```text
360px
390px
768px
1024px
1280px
1440px
```

No horizontal scrolling.

Forms must be usable on mobile.

---

# 8. PUBLIC WEBSITE STRUCTURE

## 8.1 HEADER

Desktop:

```text
LOGO

Home
About
Services
How It Works
FAQ
Contact

[ Start Registration ]
```

Mobile:

```text
Logo
Menu
```

CTA remains highly visible.

Header may become sticky after scrolling.

---

# 9. HOME PAGE

## Hero

Purpose:

Immediately explain what the company does.

Example structure:

```text
Professional Yacht Registration Services

Your Yacht.
Properly Registered.

Professional assistance for yacht registration,
documentation and registration services.

[ Start Your Registration ]

[ Explore Services ]
```

Use a premium yacht background/image.

Do not cover the image with excessive text.

---

## Trust Section

Display concise trust/value statements:

```text
Professional Service
Clear Process
Document Assistance
Dedicated Support
```

Do not invent certifications, government approvals, years of experience or registrations unless supplied by the client.

---

## Services Section

Show the services actually confirmed by the business.

Possible structure:

```text
Yacht Registration
Yacht Re-registration
Ownership Transfer
Registration Renewal
Documentation Services
```

IMPORTANT:

Do not publish a service as an actual company offering unless confirmed by the client.

---

## How It Works

Show:

```text
01
Submit Your Application

02
Provide Your Documents

03
Application Review

04
Registration Processing

05
Receive Your Documentation
```

---

## Why Ocean Yacht Registration

Keep this section short.

Potential categories:

- Professional Assistance
- Straightforward Process
- Document Management
- Personal Support

Copy must be based on actual business information.

Do not create false claims.

---

## CTA

```text
Ready to register your yacht?

Start your application today.

[ Start Registration ]
```

---

# 10. ABOUT PAGE

Sections:

- Company introduction
- Mission
- Service philosophy
- Professional approach
- Why customers choose the company

The client must provide factual company information.

Do not fabricate:

- Company history
- Years of operation
- Number of registered yachts
- Countries served
- Government partnerships
- Certifications
- Licenses

---

# 11. SERVICES PAGE

Display available services.

Each service should contain:

- Service name
- Short description
- Benefits
- Process
- Required information/documents where applicable
- CTA

CTA:

```text
Start Your Application
```

---

# 12. HOW IT WORKS PAGE

Explain the customer journey:

```text
1. Choose Your Service

2. Complete Your Application

3. Upload Required Documents

4. Submit Your Application

5. Our Team Reviews Your Information

6. We Contact You If Additional Information Is Required

7. Application Processing

8. Completion
```

---

# 13. FAQ PAGE

Create a manageable FAQ structure.

Initial questions can include:

- What information do I need to provide?
- What documents are required?
- How do I submit my application?
- How will I know my application was received?
- Can I upload documents online?
- How do I contact the team?
- How long does the process take?

Answers must be approved by the client.

Do not make legal or processing-time guarantees.

---

# 14. CONTACT PAGE

Fields:

```text
Name
Email
Phone
Subject
Message
```

Submit button:

```text
Send Message
```

On successful submission:

```text
Thank you. Your message has been received.
```

Admin should receive an email notification.

---

# 15. START REGISTRATION

Primary CTA throughout website:

```text
START REGISTRATION
```

This opens the application form.

The application must be a multi-step process.

Do NOT place every field on one enormous page.

---

# 16. APPLICATION FLOW

Recommended:

```text
STEP 1
Service / Registration Type

↓

STEP 2
Applicant Details

↓

STEP 3
Yacht Details

↓

STEP 4
Documents

↓

STEP 5
Review

↓

STEP 6
Submit

↓

CONFIRMATION
```

---

# 17. STEP 1 — SERVICE TYPE

Field:

### Registration/Service Type

Options should be configurable.

Initial options:

```text
New Yacht Registration
Re-registration
Ownership Transfer
Registration Renewal
Other
```

If the client confirms different services, update the options.

Required.

---

# 18. STEP 2 — APPLICANT DETAILS

Fields:

```text
Applicant Type
Full Name
Company Name
Email
Phone
Nationality
Country
Address
City
State/Province
Postal Code
```

Applicant Type:

```text
Individual
Company
Other
```

Conditional logic:

If Company:

```text
Company Name
```

becomes required.

---

# 19. STEP 3 — YACHT DETAILS

Fields:

```text
Yacht Name
Yacht Type
Manufacturer
Model
Year Built
Hull Identification Number / HIN
Current Flag
Previous Registration Number
Length
Beam
Draft
Gross Tonnage
Engine Manufacturer
Engine Model
Engine Number
Engine Power
```

Important:

The final legal/technical field list must be confirmed by the client.

Do not invent legal requirements.

Optional fields should be marked optional.

Required fields should be clearly marked.

---

# 20. STEP 4 — DOCUMENT UPLOAD

Customer should see the document requirements relevant to the selected application type.

Example:

```text
Identity Document
Proof of Ownership
Bill of Sale
Previous Registration
Builder's Certificate
Insurance Document
Technical Documents
Other
```

IMPORTANT:

This is a configurable document checklist.

The admin should eventually be able to configure document types, but for MVP the developer may implement a fixed list if necessary.

---

# 21. DOCUMENT UPLOAD UI

Each document:

```text
Document Name
Description
Required / Optional
Upload Button
Status
```

Example:

```text
Passport / ID
Required

[ Choose File ]

No file selected
```

After upload:

```text
Passport / ID

passport.pdf

Uploaded ✓
```

---

# 22. FILE RULES

Allowed:

```text
PDF
JPG
JPEG
PNG
DOC
DOCX
```

Recommended maximum:

```text
10 MB per file
```

Maximum total upload should be configurable.

Reject unsupported file types.

Validate MIME type and extension.

Do not trust client-side validation alone.

Server must validate uploaded files.

---

# 23. DOCUMENT SECURITY

Documents may contain sensitive personal/business information.

Therefore:

DO NOT expose files using public URLs.

Bad:

```text
https://domain.com/uploads/passport.pdf
```

Preferred:

```text
Private Storage
      ↓
Authenticated Backend
      ↓
Temporary/Signed URL
      ↓
Authorized User
```

If the MVP uses local storage, ensure uploads are outside public web root and accessed through an authenticated backend endpoint.

---

# 24. STEP 5 — REVIEW

Before submission, display:

```text
Application Type
Applicant Details
Yacht Details
Documents
```

Customer must be able to go back and edit.

Include:

```text
☐ I confirm that the information provided is accurate.
```

The checkbox is required.

Button:

```text
Submit Application
```

---

# 25. APPLICATION SUBMISSION

On submission:

1. Validate all fields.
2. Validate required documents.
3. Create application record.
4. Create customer record.
5. Create yacht record.
6. Store document references.
7. Generate unique application ID.
8. Record submission timestamp.
9. Record source information.
10. Send customer confirmation email.
11. Send admin notification email.
12. Display confirmation page.

---

# 26. APPLICATION ID

Every application receives a unique human-readable ID.

Recommended format:

```text
OYR-2026-000001
OYR-2026-000002
OYR-2026-000003
```

Where:

```text
OYR = Ocean Yacht Registration
2026 = submission year
000001 = sequential identifier
```

The ID must be unique.

It must never be reused.

Application ID appears in:

- Confirmation page
- Customer email
- Admin dashboard
- Application detail
- Internal records
- Email subject

---

# 27. CONFIRMATION PAGE

After successful submission:

```text
Application Received

Thank you for submitting your yacht registration application.

Your application has been successfully received.

Application ID

OYR-2026-000001

We have sent a confirmation email containing
your application details.

Our team will review your application and contact
you if additional information is required.

[ Return to Website ]
```

Do not show uploaded documents publicly.

---

# 28. AUTOMATED CUSTOMER EMAIL

Immediately after submission.

Subject:

```text
Yacht Registration Application Received — {{application_id}}
```

Email should contain:

```text
Dear {{customer_name}},

Thank you for submitting your yacht registration application.

Application ID:
{{application_id}}

Registration Type:
{{service_type}}

Yacht:
{{yacht_name}}

Submitted:
{{submission_date}}

Your application has been received successfully.

Our team will review the information and documents provided.
If additional information is required, we will contact you.

Regards,
Ocean Yacht Registration
```

Use company branding.

---

# 29. ADMIN EMAIL

When a new application is submitted:

Subject:

```text
New Yacht Registration Application — {{application_id}}
```

Include:

```text
Application ID
Customer Name
Email
Phone
Service
Yacht Name
Country
Submission Date
```

Include a secure admin link:

```text
View Application
```

---

# 30. SOURCE / TRACKING DATA

For each application store where possible:

```text
IP Address
User Agent
Device Type
Browser
Operating System
Referrer
UTM Source
UTM Medium
UTM Campaign
UTM Term
UTM Content
Submission Timestamp
```

This allows the business to understand:

```text
Who submitted?
What service?
From which country?
Which campaign?
When?
Which device?
```

IMPORTANT:

Implement appropriate privacy disclosure and data retention.

Do not collect unnecessary information.

---

# 31. ADMIN PANEL

Admin URL:

```text
/admin
```

Must require authentication.

Unauthenticated users must be redirected to login.

---

# 32. ADMIN LOGIN

Fields:

```text
Email
Password
```

Features:

- Login
- Logout
- Password reset if implemented
- Session timeout
- Rate limiting

Do not store plaintext passwords.

Use secure password hashing.

---

# 33. ADMIN DASHBOARD

Dashboard should display:

```text
Total Applications
New Applications
Under Review
Documents Required
Processing
Completed
```

Example:

```text
TOTAL APPLICATIONS
148

NEW
12

UNDER REVIEW
23

DOCUMENTS REQUIRED
8

PROCESSING
31

COMPLETED
74
```

---

# 34. RECENT APPLICATIONS

Display:

```text
Application ID
Customer
Yacht
Service
Country
Status
Date
```

Example:

```text
OYR-2026-000184
John Smith
MY Ocean Star
New Registration
United Kingdom
Under Review
13 Sep 2026
```

Clicking opens application detail.

---

# 35. APPLICATION MANAGEMENT

Admin can:

- View applications
- Search
- Filter
- Open application
- Change status
- View customer
- View yacht
- View documents
- Add internal notes
- View activity/history

---

# 36. APPLICATION STATUSES

Initial statuses:

```text
SUBMITTED
UNDER_REVIEW
DOCUMENTS_REQUIRED
DOCUMENTS_VERIFIED
PROCESSING
COMPLETED
ON_HOLD
CANCELLED
REJECTED
```

Default after submission:

```text
SUBMITTED
```

Admin may change status.

---

# 37. STATUS HISTORY

Every status change must be recorded.

Example:

```text
13 Sep 2026 02:31

SUBMITTED

System

---

13 Sep 2026 03:10

UNDER_REVIEW

Admin

---

13 Sep 2026 03:30

DOCUMENTS_REQUIRED

Admin
```

Store:

```text
Application ID
Old Status
New Status
Changed By
Timestamp
Optional Note
```

---

# 38. APPLICATION DETAIL PAGE

Structure:

```text
Application Header

Application ID
Status
Submission Date

Customer Information

Yacht Information

Registration Information

Documents

Internal Notes

Activity History
```

---

# 39. CUSTOMER INFORMATION

Display:

```text
Full Name
Company
Email
Phone
Nationality
Country
Address
City
Postal Code
```

---

# 40. YACHT INFORMATION

Display:

```text
Yacht Name
Type
Manufacturer
Model
Year
HIN
Current Flag
Previous Registration
Length
Beam
Draft
Tonnage
Engine Details
```

---

# 41. DOCUMENT MANAGEMENT

Admin can:

- View document list
- Download/open document securely
- See upload date
- See document type
- See document status

Document statuses:

```text
UPLOADED
UNDER_REVIEW
APPROVED
REJECTED
```

For MVP, admin can manually update status.

---

# 42. DOCUMENT REJECTION

If a document is rejected, admin can add a reason:

```text
Reason:
The uploaded document is not clear enough.
Please upload a higher-quality copy.
```

Store:

```text
Document
Status
Reason
Admin
Timestamp
```

If automated email is implemented:

```text
Document Requires Attention — {{application_id}}
```

---

# 43. INTERNAL NOTES

Admin can add notes.

Example:

```text
Customer contacted by email.
Waiting for previous registration certificate.
```

Internal notes must NOT be visible publicly.

For MVP, notes are admin-only.

---

# 44. CUSTOMER DATA

The system should prevent unnecessary duplicate customer records where possible.

At minimum, customer email should be stored.

If an existing customer submits another application, the system may associate the application with the existing customer.

Do not accidentally overwrite old application data.

Every application is an independent historical record.

---

# 45. DATABASE MODEL

Minimum recommended entities:

```text
User
Customer
Application
Yacht
Document
DocumentType
ApplicationStatusHistory
InternalNote
EmailLog
ContactMessage
AuditLog
```

---

# 46. USERS TABLE

Fields:

```text
id
name
email
password_hash
role
status
last_login_at
created_at
updated_at
```

MVP role:

```text
ADMIN
```

Prepare architecture for future roles.

---

# 47. CUSTOMERS TABLE

Fields:

```text
id
full_name
company_name
applicant_type
email
phone
nationality
country
address
city
state
postal_code
created_at
updated_at
```

---

# 48. APPLICATIONS TABLE

Fields:

```text
id
application_number
customer_id
yacht_id
service_type
status
source
ip_address
user_agent
device_type
referrer
utm_source
utm_medium
utm_campaign
utm_term
utm_content
submitted_at
created_at
updated_at
```

---

# 49. YACHTS TABLE

Fields:

```text
id
application_id
yacht_name
yacht_type
manufacturer
model
year_built
hin
current_flag
previous_registration_number
length
beam
draft
gross_tonnage
engine_manufacturer
engine_model
engine_number
engine_power
created_at
updated_at
```

---

# 50. DOCUMENTS TABLE

Fields:

```text
id
application_id
document_type
original_filename
storage_key
mime_type
file_size
status
rejection_reason
uploaded_at
reviewed_at
reviewed_by
```

Never store raw document binaries directly in the database unless there is a specific reason.

Store them in private file/object storage.

---

# 51. APPLICATION STATUS HISTORY

Fields:

```text
id
application_id
old_status
new_status
changed_by
note
created_at
```

---

# 52. INTERNAL NOTES

Fields:

```text
id
application_id
user_id
note
created_at
updated_at
```

---

# 53. EMAIL LOG

Fields:

```text
id
application_id
recipient
subject
template
status
provider_message_id
sent_at
error_message
```

This allows troubleshooting failed emails.

---

# 54. AUDIT LOG

For security-sensitive actions:

```text
id
user_id
action
entity_type
entity_id
ip_address
metadata
created_at
```

Examples:

```text
LOGIN
VIEW_APPLICATION
DOWNLOAD_DOCUMENT
CHANGE_STATUS
DELETE_DOCUMENT
UPDATE_APPLICATION
```

---

# 55. CONTACT MESSAGES

Fields:

```text
id
name
email
phone
subject
message
status
created_at
```

Status:

```text
NEW
READ
RESPONDED
CLOSED
```

---

# 56. ADMIN APPLICATION LIST

Columns:

```text
Application ID
Customer
Yacht
Service
Country
Status
Submitted
Actions
```

Actions:

```text
View
```

Search:

```text
Application ID
Customer Name
Email
Yacht Name
```

Filters:

```text
Status
Service
Country
Date
```

---

# 57. ADMIN DASHBOARD NAVIGATION

Use:

```text
Dashboard

Applications

Customers

Documents

Contact Messages

Email Logs

Audit Logs

Settings

Logout
```

Do not add unnecessary sections in MVP.

---

# 58. SETTINGS

Basic settings:

```text
Company Name
Company Email
Support Email
Phone
Website URL
Logo
Email Sender Name
Email Sender Address
```

If easy to implement, also allow:

```text
Application Prefix
```

Default:

```text
OYR
```

---

# 59. EMAIL SYSTEM

Use a transactional email provider.

Recommended:

- Resend
- Postmark
- Amazon SES

The implementation must keep email provider configuration in environment variables.

Never hard-code API keys.

---

# 60. ENVIRONMENT VARIABLES

Example:

```text
DATABASE_URL=

AUTH_SECRET=

EMAIL_API_KEY=

EMAIL_FROM=

ADMIN_EMAIL=

STORAGE_BUCKET=

STORAGE_REGION=

STORAGE_ACCESS_KEY=

STORAGE_SECRET_KEY=

NEXT_PUBLIC_SITE_URL=
```

Actual names may vary according to chosen stack.

Secrets must never be committed to Git.

---

# 61. RECOMMENDED TECH STACK

Preferred MVP:

```text
Frontend:
Next.js + TypeScript

Styling:
Tailwind CSS

Backend:
Next.js server/API layer

Database:
PostgreSQL

ORM:
Prisma

Authentication:
Secure server-side authentication/session system

Storage:
Private S3-compatible object storage

Email:
Resend / Postmark / SES

Deployment:
Vercel or equivalent frontend/backend platform
+
Managed PostgreSQL
+
Private object storage
```

The developer may use another stack only if there is a strong technical reason.

Do NOT over-engineer the MVP.

---

# 62. SECURITY REQUIREMENTS

Because customer applications may contain identity and ownership documents, security is mandatory.

Implement:

- HTTPS
- Secure authentication
- Password hashing
- Secure sessions
- CSRF protection where applicable
- Rate limiting
- Server-side validation
- File validation
- Private file storage
- Authorization checks
- SQL injection protection through ORM/parameterized queries
- XSS protection
- Secure headers
- Error handling
- No secrets in frontend
- No sensitive information in logs

---

# 63. FILE SECURITY

For uploaded documents:

1. Validate extension.
2. Validate MIME type.
3. Validate file size.
4. Generate safe storage filename/key.
5. Do not trust original filename.
6. Store outside public web root/private bucket.
7. Do not expose permanent public URL.
8. Authorize every document access.
9. Log sensitive downloads if practical.

---

# 64. DATA VALIDATION

All important fields must be validated on the server.

Examples:

Email:

```text
valid email format
```

Phone:

```text
reasonable international phone format
```

Year:

```text
reasonable numeric range
```

File:

```text
allowed MIME
allowed extension
maximum size
```

Required fields:

```text
must not be empty
```

---

# 65. ERROR HANDLING

Never show raw server errors to users.

Customer sees:

```text
Something went wrong.
Please try again or contact our support team.
```

Admin sees meaningful error information without exposing secrets.

Technical errors should be logged securely.

---

# 66. FORM UX

The application form must have:

- Step indicator
- Required field indicators
- Inline validation
- Clear labels
- Helpful placeholders where appropriate
- Save/continue behavior where practical
- Previous button
- Next button
- Review step
- Submission loading state
- Success state
- Error state

Example:

```text
Step 2 of 5

Applicant Details

[ Full Name                    ]

[ Email                        ]

[ Phone                        ]

[ Country                      ]

[ Address                      ]

             [ Back ] [ Continue ]
```

---

# 67. DOUBLE SUBMISSION PROTECTION

Prevent accidental duplicate submissions.

When customer clicks:

```text
Submit Application
```

button becomes:

```text
Submitting...
```

Disable repeated clicks.

Backend must also use an idempotency/duplicate protection strategy where practical.

---

# 68. APPLICATION NUMBER GENERATION

Application number must be generated server-side.

Never generate the official application ID only in frontend JavaScript.

Example:

```text
OYR-2026-000001
```

Must be unique at database level.

---

# 69. SEO

Basic SEO must be implemented.

Each public page:

- Unique title
- Meta description
- Proper H1
- Semantic headings
- Clean URLs
- Open Graph metadata
- Favicon
- Sitemap
- Robots.txt

Example:

```text
/
 /about
 /services
 /services/yacht-registration
 /how-it-works
 /faq
 /contact
 /start-registration
```

---

# 70. PERFORMANCE

Target:

- Fast initial page load
- Optimized images
- Lazy-load non-critical images
- WebP/AVIF where appropriate
- Minimize unnecessary JavaScript
- Avoid excessive animation
- Optimize fonts

Do not sacrifice performance for visual effects.

---

# 71. ACCESSIBILITY

Minimum:

- Semantic HTML
- Keyboard accessible forms
- Visible focus states
- Proper labels
- Alt text
- Sufficient contrast
- Accessible buttons
- Error messages associated with fields

---

# 72. ANALYTICS

For MVP, only basic analytics if available.

Possible:

- Google Analytics
- Google Search Console

Do not build a custom analytics engine.

Track important events:

```text
Start Registration Click
Application Started
Application Submitted
Contact Form Submitted
```

Respect applicable privacy requirements.

---

# 73. PRIVACY

Because personal information and documents are collected, the website must include:

```text
Privacy Policy
Terms & Conditions
```

The client should provide or approve legal wording.

Do not invent legal compliance claims.

---

# 74. ADMIN DASHBOARD UX

Dashboard should follow the same premium design language but prioritize usability.

Use:

- Clean sidebar
- Compact cards
- Tables
- Status badges
- Search
- Filters
- Clear typography
- Responsive layouts

Admin dashboard does NOT need the same cinematic design as the public website.

Functionality > decoration.

---

# 75. STATUS COLORS

Use semantic status styling.

Example:

```text
SUBMITTED            Neutral
UNDER_REVIEW         Blue
DOCUMENTS_REQUIRED   Orange
DOCUMENTS_VERIFIED   Green
PROCESSING           Purple/Blue
COMPLETED            Green
ON_HOLD              Yellow
CANCELLED            Gray
REJECTED             Red
```

Do not rely on color alone; include text labels.

---

# 76. CUSTOMER EXPERIENCE

Customer should never feel like they are filling out a government form.

The application should feel:

```text
Professional
Simple
Guided
Trustworthy
```

Use short sections.

Explain why information is requested where useful.

---

# 77. ADMIN EXPERIENCE

Admin should be able to understand an application in less than one minute.

Application detail should clearly show:

```text
WHO
WHAT
WHERE
WHEN
STATUS
DOCUMENTS
NEXT ACTION
```

---

# 78. EMAIL TEMPLATE VARIABLES

Support variables:

```text
{{customer_name}}
{{application_id}}
{{service_type}}
{{yacht_name}}
{{application_status}}
{{submission_date}}
{{company_name}}
{{support_email}}
{{support_phone}}
```

---

# 79. EMAIL EVENTS

MVP:

### Customer

- Application submitted
- Application status changed, if enabled
- Document required/rejected, if enabled

### Admin

- New application
- New contact message

---

# 80. DEPLOYMENT

Production deployment should include:

```text
Production domain
SSL
Database
File storage
Email service
Environment variables
Admin account
```

Developer must provide deployment documentation.

---

# 81. ADMIN INITIAL SETUP

After deployment:

1. Create admin account.
2. Configure company email.
3. Configure email provider.
4. Configure storage.
5. Configure database.
6. Test application submission.
7. Test email.
8. Test document upload.
9. Test admin access.
10. Test status change.

---

# 82. TESTING CHECKLIST

Before delivery:

## Public Website

- [ ] Homepage works
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] All CTAs work
- [ ] Contact form works
- [ ] Forms validate
- [ ] No broken links
- [ ] Images optimized
- [ ] SEO metadata present

## Application

- [ ] Registration starts correctly
- [ ] Step navigation works
- [ ] Required fields validated
- [ ] Yacht details save
- [ ] Documents upload
- [ ] Invalid files rejected
- [ ] Review works
- [ ] Application submits
- [ ] Application ID generated
- [ ] Confirmation page works

## Email

- [ ] Customer receives confirmation
- [ ] Admin receives notification
- [ ] Application ID appears
- [ ] Email formatting works

## Admin

- [ ] Login works
- [ ] Dashboard works
- [ ] Applications visible
- [ ] Search works
- [ ] Filters work
- [ ] Application details work
- [ ] Documents accessible
- [ ] Status changes work
- [ ] Notes work
- [ ] Activity history works

## Security

- [ ] HTTPS
- [ ] Admin protected
- [ ] Unauthorized document access blocked
- [ ] Secrets not exposed
- [ ] File validation active
- [ ] Server-side validation active

---

# 83. ACCEPTANCE CRITERIA

The MVP is considered complete when:

### Website

A visitor can browse the entire public website on mobile and desktop.

### Application

A visitor can successfully submit a yacht registration application.

### Documents

A visitor can upload required documents securely.

### Application ID

The system generates a unique application number.

### Email

The customer receives an automated confirmation containing the application details and application number.

### Admin

The administrator receives the application and can open it from the dashboard.

### Management

The administrator can:

- View customer
- View yacht
- View application
- View documents
- Change status
- Add internal notes

### Security

Unauthenticated users cannot access the admin dashboard or private customer documents.

---

# 84. IMPORTANT BUSINESS RULES

## Rule 1

Do not fabricate business information.

If the developer does not know:

- service
- price
- processing time
- registration jurisdiction
- legal requirement
- certification
- company history

use placeholder/configurable content and request client confirmation.

---

## Rule 2

Do not make legal guarantees.

Avoid statements such as:

```text
Guaranteed registration
100% approval
Guaranteed processing time
Government approved
Official partner
```

unless the client provides evidence.

---

## Rule 3

Do not expose customer documents publicly.

---

## Rule 4

Do not expose customer information through application-number-only URLs.

Bad:

```text
/application/OYR-2026-000001
```

if it can be accessed without authentication.

---

# 85. MVP DEVELOPMENT PRIORITY

Development priority:

### P0 — MUST HAVE

```text
Public Website
Application Form
Customer Information
Yacht Information
Document Upload
Application ID
Database
Admin Login
Admin Dashboard
Application Management
Email Confirmation
```

### P1 — IMPORTANT

```text
Status History
Internal Notes
Search
Filters
Contact Messages
Email Logs
Basic Tracking Data
```

### P2 — FUTURE

```text
Customer Portal
Payments
Staff Roles
WhatsApp
Advanced CRM
Advanced Reporting
```

---

# 86. PHASE 2 ROADMAP

Future version can include:

## Customer Portal

Customer logs in and sees:

```text
My Applications
Application Status
Documents
Messages
Profile
```

---

## Advanced Document Workflow

```text
Uploaded
↓
Review
↓
Approved / Rejected
↓
Customer Notification
↓
Re-upload
```

---

## Payments

Possible:

```text
Application Fee
Service Fee
Invoice
Payment Status
Online Payment
Receipt
```

Payment gateway depends on the client's business location and preferred provider.

---

## Staff Management

Roles:

```text
Super Admin
Admin
Application Manager
Document Reviewer
Finance
```

Each role gets specific permissions.

---

## Customer Notifications

Possible:

```text
Email
WhatsApp
SMS
```

---

## CRM

Future:

```text
Leads
Follow-ups
Customer history
Sales pipeline
Communication history
```

---

# 87. FUTURE ARCHITECTURE REQUIREMENT

Even though the MVP is small, structure the code so Phase 2 can be added without rewriting the entire system.

Use:

```text
Reusable components
Reusable form components
Service layer
Database abstraction
Validation schemas
Centralized email service
Centralized storage service
Centralized authentication
```

Avoid putting the entire application inside one massive component/file.

---

# 88. CODE QUALITY

Developer must:

- Use TypeScript if using Next.js
- Use consistent naming
- Use reusable components
- Use environment variables
- Avoid duplicated logic
- Validate input
- Handle errors
- Keep secrets out of Git
- Use meaningful database relationships
- Add comments only where necessary
- Keep README updated

---

# 89. GIT REQUIREMENTS

Repository should contain:

```text
README.md
.env.example
Database setup instructions
Development instructions
Production deployment instructions
```

Do NOT commit:

```text
.env
API keys
Passwords
Private certificates
Customer documents
```

---

# 90. DELIVERABLES

Developer must deliver:

```text
1. Complete source code

2. Production website

3. Admin dashboard

4. Database

5. Application form

6. Document upload system

7. Email automation

8. Deployment

9. Environment variable documentation

10. README

11. Admin credentials handover

12. Basic technical documentation
```

---

# 91. CLIENT CONTENT REQUIREMENTS

The developer must request the following from the client before final content implementation:

```text
Company logo
Company name
Official company description
Official email
Phone number
Address
Social media links
Actual services
Service descriptions
Registration jurisdictions
Actual document requirements
Company photos
Yacht imagery if available
FAQ answers
Privacy Policy
Terms & Conditions
```

If something is missing, use temporary placeholders rather than inventing facts.

---

# 92. FINAL USER JOURNEY

The final experience should look like this:

```text
Customer discovers website
        ↓
Reads about Ocean Yacht Registration
        ↓
Reviews services
        ↓
Clicks "Start Registration"
        ↓
Selects registration/service type
        ↓
Enters applicant details
        ↓
Enters yacht details
        ↓
Uploads documents
        ↓
Reviews application
        ↓
Accepts confirmation statement
        ↓
Submits
        ↓
System generates:
OYR-2026-000001
        ↓
Customer sees confirmation
        ↓
Customer receives email
        ↓
Admin receives notification
        ↓
Admin opens application
        ↓
Admin reviews information
        ↓
Admin reviews documents
        ↓
Admin updates status
        ↓
Admin adds internal notes if required
        ↓
Application proceeds through business process
```

---

# 93. DEFINITION OF DONE

The developer should NOT consider the project finished simply because the pages are visually complete.

The project is done only when the complete core workflow works:

```text
Website
   ↓
Application
   ↓
Database
   ↓
Documents
   ↓
Application ID
   ↓
Email
   ↓
Admin
   ↓
Status
```

All of these must work together in production.

---

# 94. FINAL DEVELOPMENT INSTRUCTION

Build the application according to this PRD.

Do not add unnecessary features.

Do not over-engineer.

Do not change the business workflow without approval.

Do not fabricate company information or legal requirements.

Prioritize:

1. Functional application workflow
2. Secure document handling
3. Reliable application storage
4. Automated email
5. Usable admin dashboard
6. Premium public website
7. Responsive design
8. Clean maintainable architecture

The result should feel like a **real professional yacht registration company platform**, not a generic template website.

The MVP must be small enough to deliver within the agreed budget while being architected cleanly enough to become a larger platform in Phase 2.