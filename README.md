#Overkill To-do App

![alt text](https://github.com/[munyachiwundura]/[todo-app-v2]/blob/[main]public/Todoappcover.png?raw=true)
As the name implies this is just an over-engineered to-do app there is probalby better apps out there but this was my first attempt at my default stack for making progressive web apps and is [currently deployed at](https://overkilltodoapp.vercel.app)

## Technology used

- Javascript Library [React] (https://reactjs.org/)
- React Framework [Nextjs] (https://nextjs.org/)
- Object Relation Model [Prisma] (https://www.prisma.io/)
- Database Deployment [Planet-scale] (https://planetscale.com/)
- Animation [Framer-motion] (https://www.framer.com/motion/)
- Progressive Web App [next-pwa] (https://www.npmjs.com/package/next-pwa)
- Deployment [Vercel] (https://vercel.com/)

## Getting Started

[Access the app at](https://overkilltodoapp.vercel.app)

### Creating an Account

On initial load you will be redirected to the signup page, click get started.
Sing up with github which if you are reading this you probably have an account.
You will be then redirected to the home page after signing up you can now start adding tasks.

### Adding a Task

for your first task you can save it to the default category or create a new category.
after submitting the new task you will recieve a notification,
The notifications are currently set to show at the moment you add a new notification since there is a bit of an issue with browser support for locally sceduling notifications

### Some settings

on the account page you can change a few settings to your preference however currently the only supported actions are signing out and allowing notifications

## Run It Locally

First, will need to set some environment variables in a .env file

```bash

GITHUB_ID
GITHUB_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_URL
SECRET
WEB_PUSH_EMAIL
WEB_PUSH_PRIVATE_KEY
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
DATABASE_URL

```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
