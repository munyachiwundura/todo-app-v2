# Overkill To-do App

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Todoappcover.png)
As the name implies this is just an over-engineered to-do app there is probalby better apps out there but this was my first attempt at my default stack for making progressive web apps and is [currently deployed at](https://overkilltodoapp.vercel.app)

## Preview


https://user-images.githubusercontent.com/76268381/156883224-7c5e9ad4-7255-4fb7-b9df-780119594ce6.mp4


## Technology used

- Javascript Library [React](https://reactjs.org/)
- React Framework [Nextjs](https://nextjs.org/)
- Object Relation Model [Prisma](https://www.prisma.io/)
- Database Deployment [Planet-scale](https://planetscale.com/)
- Animation [Framer-motion](https://www.framer.com/motion/)
- Progressive Web App [next-pwa](https://www.npmjs.com/package/next-pwa)
- Deployment [Vercel](https://vercel.com/)

## Getting Started

[Access the app at](https://overkilltodoapp.vercel.app)

### Creating an Account

On initial load you will be redirected to the signup page, click get started.
Sing up with github which if you are reading this you probably have an account.
You will be then redirected to the home page after signing up you can now start adding tasks.

### Adding a Task

For your first task you can save it to the default category or create a new category.
after submitting the new task you will recieve a notification,
The notifications are currently set to show at the moment you add a new notification since there is a bit of an issue with browser support for locally sceduling notifications

### Some settings

On the account page you can change a few settings to your preference however currently the only supported actions are signing out and allowing notifications

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

## Background Info

So I started making this app as my first full stack Nextjs project, At first I was supposed to be a simple to-do app with tasks set in state. But as I stated to learn new technologies I added these to the app and making it a fine example of overengineering and pesronally a testament to my willingness to learn new things

### inspiration

The design was roughly reverse engineered from [this design](https://ui8.net/ui8/products/taskez-productivity-app-ios-ui-kit?ref=dribbb) from [UI8](https://ui8.net/) which I had found on dribbble so I decided to remodel the components in [figma](https://www.figma.com/file/G9XQORbDLWTOo0dlV7t8o6/IOS?node-id=0%3A1) at first before I can start developing them in nextjs.

### Acknowledgements

-Obviously the designers at [UI8](https://ui8.net/) who I'm yet to inform about my borrowed inspiration
-Lee Rob literally told me everything I know about Next.js
-Colby Fayok whose tutorial on page animations taught me how to implement them to this app
-James Quick For the Next-auth tutorial
-Fireship.io "yup thats your real name" Literally inspired my whole tech stack trhough his videos
-Ben Award Taught me React is better than Angular
-Ryan Chenkie For the prisma tutorial

I'll probably not make all these acknolwedgents when I use this technology in the future but I'm eternally greatful :)

### Screenshots

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Todoappcover.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot1.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot2.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot3.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot4.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot5.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot6.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot7.png)

![Cover Image](https://raw.githubusercontent.com/munyachiwundura/todo-app-v2/main/public/Screenshot8.png)
