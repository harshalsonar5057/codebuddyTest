# Welcome to Round 3 of your Backend with NestJs Interview
# ![CodeBuddy Round 3 Interview](https://codebuddy.co/assets/img/Logo.svg)

> This round is to test your **Logical thinking, coding skills, reading skills and NestJs basics**.

> This repo uses NestJs and Jest to create a backend server and perform e2e tests.

> **_Please carefully read the instructions mentioned below._**

**DON'T CLONE THIS REPO and DON'T MAKE PULL REQUESTS TO THIS REPO.** FORK this repo to your own GitHub account then clone it. Fork button is the top right corner of the page. The forked URL should look something like this: https://github.com/${YOUR_GITHUB_USERNAME}/node

# A. Calculator
1. Implement a post route http://localhost:3000/calc that takes a JSON input in the following format:
```json
{
  "expression": "<expression>"
}
```
and returns a json in the following format by evaluating the expression.
```json
{
  "result": "<result>"
}
```
2. You cannot use `evel` or any other third party library to evaluate the expression.
3. You cannot add or remove any files from the project.
4. You can only work inside calc/calc.service.ts@calculateExpression method.
5. In case the expression is invalid, return a json in the following format with 400 status code
```json
{
  "statusCode": 400,
  "message": "Invalid expression provided",
  "error": "Bad Request"
}
```
6. You need to implement +, -, *, / operations. Handling Operator precedence is optional.
7. The repository contains 6 test cases. You need to make sure all of them pass. In case operator precedence is not handled run `pnpm test:basic` command to run only the basic test cases. Otherwise, run `pnpm test:advanced` to run all the test cases.
8. Follow the test case files to understand the input and output format.
- i. test/simpleCalc.e2e-spec.ts
- ii. test/operatorPrecedenceNotHandled.e2e-spec.ts
- iii. test/invalidExpression.e2e-spec.ts

# B. NestJS middleware
1. Implement a NestJS middleware that logs the request URL, method, time taken to execute the request and response status code.
2. The middleware should be applied to all the routes.
3. The log text example: `GET /calc 200 1.2 ms`

## > Total allocated time for the these 2 task is 2.5hr. In case you need more than the allocated time, communicate with your recruiter.
