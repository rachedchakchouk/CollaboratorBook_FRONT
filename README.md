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

Angular 13 · TypeScript 4.4 · RxJS · Bootstrap 5 / ng-bootstrap · PrimeNG · Chart.js (ng2-charts)
· ngx-toastr · @auth0/angular-jwt

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

Prerequisites: Node.js 16 (Angular 13), npm, and the backend services running
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
