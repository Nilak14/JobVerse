# Job Status Flow Description

## Available Status

1. DRAFT
2. PENDING
3. ACTIVE
4. REJECTED
5. REVIEW
6. PAUSED
7. EXPIRED
8. DELETED

### Initial Status (Before Admin Review)

- **DRAFT** - Employer is still working on the job post or do not want to submit now
- **PENDING** - Job is submitted for the admin review
  
### Admin Review Stages

- **APPROVED** - Admin has approved the job post
- **REJECTED** - Admin has rejected the job post
- **REVIEW** - Admin requested to changes before approval

### Active Job Status (After Admin Approval)

- **ACTIVE** - Job is live and visible to job seekers
- **PAUSED** - Employer temporarily paused the job posting
- **EXPIRED** - Job posting has reached its end date

### Flow For Job Status

1. Employer creates a job (**DRAFT**)
2. Submits for review (**PENDING**)
3. Admin reviews and either:
   - Approves (**ACTIVE**)
   - Rejects (**REJECTED**)
   - Request Changes (**REVIEW**)
4. After Approval, employer can"
   - Pause Posting (**PAUSED**)
   - Resume Posting (**ACTIVE**)
   - Job automatically Expires (**EXPIRED**)
