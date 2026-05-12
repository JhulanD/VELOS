# Security Specification for VELO Recruitment Platform

## Data Invariants
1. A Candidate must always have a status and a name.
2. A Job must always have a title and a company.
3. A Task must be owned by the recruiter who created it.
4. Users can only read/write their own profile in the `users` collection.
5. Candidates and Jobs are accessible to authenticated recruiters (for now, assuming a collaborative team environment).

## The Dirty Dozen Payloads
1. **Identity Spoofing**: Attempt to create a user profile with a different UID.
2. **Identity Spoofing**: Attempt to update another recruiter's profile.
3. **Identity Spoofing**: Attempt to set `ownerId` of a job to someone else on creation.
4. **State Shortcutting**: Attempt to set a candidate to "placed" without any interview notes (business logic check if applicable).
5. **Resource Poisoning**: Attempt to inject a 1MB string into the `location` field of a job.
6. **Unauthorized Read**: Unauthenticated user trying to list candidates.
7. **Unauthorized Write**: Unauthenticated user trying to create a task.
8. **Malicious Update**: Authenticated user trying to delete a job they didn't create (if ownership check enabled).
9. **Malicious Update**: Attempting to change `email` in a user profile to one that doesn't match the auth token.
10. **Type Poisoning**: Sending a boolean where a string is expected for `status`.
11. **Shadow Fields**: Adding a `price` field to a Task.
12. **Timestamp Spoofing**: Sending a manual `createdAt` far in the future instead of using server timestamps.

## Test Runner
See `firestore.rules.test.ts` for implementation of these checks.
