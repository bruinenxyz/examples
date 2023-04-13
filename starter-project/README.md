The Bruinen starter app is a Next.js[Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It uses the Bruinen SDK to connect your Venmo account and log your Venmo transactions to the console, and is meant as an example to help you get started using Bruinen quickly.

## Getting Started

First, clone the repository and install dependencies:

```bash
npm install
# or
yarn
```

To develop locally, run the dev server and open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

```bash
npm run dev
# or
yarn dev
```

## Bruinen credentials

In order to use the app, you'll need to [sign up for Bruinen](https://client.bruinen.co) and generate an client ID and secret key. 
The sample app accesses these using Next's [environment variables](https://nextjs.org/docs/basic-features/environment-variables).
You should create a `.env.local` file in the root directory and add the following lines:

```
NEXT_PUBLIC_BRUINEN_CLIENT_ID="your_client_id"
BRUINEN_SECRET="your_secret_key"
```

## App structure

The starter app is separated into a frontend and backend, both written in Typescript. 
It uses Next's app directory, so all components and routes are stored in the `/src/app` directory. 

Some relevant frontend files:

- `/layout.tsx`: Application wrapper and top-level layout.
- `/page.tsx`: Landing page for the app where a user can enter their email. Note that the starter app doesn't handle authentication of the entered email — you'll want to ensure that emails are authenticated before creating a user in Bruinen's system with that email, unless it's your own email. 
- `/context/state.tsx`: Stores application state to enable different components to access the user's ID and access token.
- `/connect/page.tsx`: Page that the user is sent to after entering their email; uses Bruinen Connect to authenticate the user's Venmo account.
- `/success/page.tsx`: Success page to redirect to after successful account authentication via Connect. You should pass the link to this page as the `defaultRedirectUrl` in Connect — see the [docs](https://docs.bruinen.co/api-reference/bruinen-connect) for more.
- `/venmo/page.tsx`: Page that the user is sent to after authenticating their Venmo account; pulls the user's Venmo transactions and logs them to the console.

Some relevant backend files:
- `/api/user/create/route.tsx`: Creates the user in Bruinen's system.
- `/api/user/accounts/route.tsx`: Pulls the list of connected accounts for a given user.
- `/api/user/accounts/venmo/route.tsx`: Pulls the list of Venmo transactions for a given account.

## Learn More

To learn more about Bruinen, you can use the following links:
- [Documentation](https://docs.bruinen.co/) — learn about the Bruinen API.
- [Website](https://www.bruinen.co) — Bruinen's website.

To learn about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Reach out to support@bruinen.co or join our [Discord server](https://discord.gg/4WwZa9TPgx) if you have any questions!