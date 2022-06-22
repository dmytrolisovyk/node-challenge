# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!

## Solution
### Thought process
- Before starting coding I decided first to make sure that everything is setup, working and all tests are passing.
I setup the database. Since I have a local user and password it didn't make sense to commit it. So I created a local.js 
file with the data specific to my machine and added it to .gitignore
- I tried to run some tests but get errors and warnings. I moved auth.jwtSecret to qa.config and renamed config-injector to process-config, cause it didn't do anything related to config injection. Unit test passed.
- Acceptance test failed. I fixed an issue in server.ts, but eslint didn't like my fix. I added a rule to ignore unused var that start from _. Eslint is happy and the app + tests are fine. Also, I fixed some jest warning right away cause that was easy to fix.

- Ok. Now lets implement the expenses functionality. Before any major impovements and refactorings, let's make something that acctually works and then improve it. I will follow the proposed file structure to align with the rest of the API.

- Ok. Now we have something working. Let's improve it. We need to add some formatting to the data we fetch. As we can see we have 
some functions in user domain. Let's move some shared stuff to utils.
- Ok, so I was wondering all this time why we actually return JSON as a string. It turned out that the implementation of secureTrim does it in a tricky way. So I moved the formatting stuff to shared code (utils), to be able to reuse the formatting fuctionality. And then I changed secureTrim to return an object, so that JSON is now returned. Also, updated tests and added type declarations to separate layers a bit. So we have UserExpense and UserExpenseResponse.

- Ok. Let's improve the expense functionality to support paging, sorting and filtering. I've decided to add basic stateless pagination based on limit-offset. I've created some functions to build a query string with pagination, filtering and sorting. It feels like peeking an ORM would simplity stuff, but it will require rewriting half of the app. 

- I also wanted to add some validation to the input of the request. The validation seems to be quite complex, since values for page and pageSize must be correct, the same for filtering and sorting. So I decided to add a validation handler. 

- Also, I noticed an issue with the app. It returns 500 even when BadRequest or other 4.x.x error is thrown. I fixed it 
with updating the handler in server.ts.

- I was working to building querty for pagination\sorting\filtering and had some concernes. Pg.query uses prepared statements and params, but it doesn't work with dynamic queries. Even though pg doesn't allow multiple statements and I have some request validations I decided to use pg-format to make sure that all params are escaped and no SQL injection possible

- Now, when the API is more or less ready, lets cover it by tests. Some people prefer to write them before, but then they require a lot of fixes.
- Added unit test to test specific functions. The depencies are mocked. Also, added acceptance tests. For we assume that we have a shared db for testing. Ideally, we should use some inmemory db for such tests. Also, error handling in tests is a bit simplified: statuses are checked, but not messages.