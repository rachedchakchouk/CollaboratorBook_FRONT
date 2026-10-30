# CollaboratorBook — Frontend (Angular)

Angular client of **CollaboratorBook**, an internal social network and HR platform for companies,
built as my end-of-studies project (PFE, Ditriot Consulting, 2022).

Backend (Spring Boot microservices): [CollaboratorBook_BACK](https://github.com/rachedchakchouk/CollaboratorBook_BACK)

## Features

- **Authentication** — sign up, sign in with JWT, profile update, protected pages (route guard) and
  automatic `Authorization: Bearer` header on API calls (HTTP interceptor)
- **Company structure** — companies, departments, offices and jobs
- **HR** — employees, contracts and contract clauses, leave requests, projects, documents, claims
- **Social** — posts, comments and notifications between colleagues
- **Dashboard** — key figures and charts

## Tech stack

Angular 21 · TypeScript 5.9 · RxJS 7 · Bootstrap 5 / ng-bootstrap · PrimeNG 21 (Lara theme) · Ignite UI for Angular
· ApexCharts (ng-apexcharts) · @auth0/angular-jwt

## Project structure

```
src/app/
├── core/                 # AuthGuard (route protection) + AuthInterceptor (JWT header)
├── services/
│   ├── Security/         # login, users
│   ├── RH/               # employees, contracts, clauses, documents, posts, notifications…
│   └── Buissness/        # companies, departments, offices, jobs
├── component/            # feature screens (authentication, company, departments, offices, jobs, documents…)
├── contrat/              # contracts module
├── dashboard/            # dashboard widgets
├── layouts/, shared/     # main layout, header, sidebar
src/models/               # TypeScript models
```

## Run locally

Prerequisites: Node.js 20.19+ or 22.12+ (Angular 21), npm, and the backend services running
(gateway on `http://localhost:8888`).

```bash
npm install
npm start            # ng serve → http://localhost:4200
```

Production build:

```bash
npx ng build --configuration production
```

The gateway URL is configured in `src/environments/environment*.ts`.

## License

All rights reserved — the code is shared for portfolio review only. See [LICENSE](LICENSE).

## Author

**Rached Chakchouk** — Full Stack Software Engineer (Java / Spring Boot / Angular)
[LinkedIn](https://www.linkedin.com/in/rached-chakchouk) · [Portfolio](https://rached-chakchouk.netlify.app)
