# QA-Assignement

## Tools

Automation tool/framework used: **Playwright** <br>
Programming Language: **Javascript _(Assignment Choice of Programming language)_**,</br>
Build Tool: **npm**,</br>
CI Implementation: **Github Actions** </br>
IDE (recommended): **VS code**, <br>
Libraries used: </br>**- ajv (For Schema Validation), </br>- Playwright/test (Test Runner) <br>- Allure-Playwright(For Extend reporting)** </br>

### A comprehensive test summary report including \*test-cases, execution status, testing strategy, bug report,

recommendations\* and more details can be found in the report linked below:

**_[Test Plan Link]("https://docs.google.com/document/d/1lf5K5lNYmj6tUMeRmHMg-dv7q4DXJR4o/edit?usp=sharing&ouid=101588228377816397238&rtpof=true&sd=true")_**
**_[Test Harness Link](https://docs.google.com/spreadsheets/d/1wvJimUN1T7bW4TVsf8s84i74QuxMdrHO/edit?usp=sharing&ouid=101588228377816397238&rtpof=true&sd=true)_**

## Required software & Installation guide

- Download and install node.js

## How to execute test via docker image

- Pull the docker image from docker hub : `docker pull buddhika88/veriffqarepo:f51a2c31789b07b3bc56e7673704f46f15ce51f7`
- Run the docker image and open the terminal
- Execute command to run all (UI and API): `npm run test`
- Execute command to run Specific Test File: `npm run test <Test File Name>`
- Execute command to run only UI Tests: `npm run test --testDir ./src/tests/UI`
- Execute command to run only API Tests: `npm run test --testDir ./src/tests/API`
- Execute command to run Smoke tests: `npm run test:smoke`

## How to execute the tests in command line

- Clone the project
- Open the cmd and change directory(cd) to the cloned project folder
- Execute command to update packages: `npm install or npm ci`
- Execute command to run all (UI and API): `npm run test`
- Execute command to run Specific Test File: `npm run test <Test File Name>`
- Execute command to run only UI Tests: `npm run test --testDir ./src/tests/UI`
- Execute command to run only API Tests: `npm run test --testDir ./src/tests/API`
- Execute command to run Smoke tests: `npm run test:smoke`
- Wait for tests to be completed and results will be in the console (please refer below to get a comprehensive report)

## How to execute test with comprehensive reports

- **Execute command to run the tests with allure report enabled** : `npm run test:reporter`
- Then to generate Html report execute : `npm run allure-report`

## Things to highlight

    1. Environmental data, such as url's, are been maintained in a separate `playwright.config.js`
    file to ease the maintainability enviorment wise you have to keep a separate config file.
    2. Resuable functions created in order for readability and maintainability
    3. Test types are tagged in test automation in order to execute in groups (eg: @Smoke.. )
    4. Reporting has been implemented through Allure reporting
    5. CI/CD process is fully automated through github workflows (enviorment & Automation code)containerized and push to DockerHub as a docker image

## About the project structure

| Package Name         | File                   | Description                                                                                               |
| :------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------- |
| `src\helpers`        | `relativeUrl.js`       | Project relative/resource URLs are stored in there                                                        |
| `src\test`           | `Multiple Files`       | API and UI Tests are included here                                                                        |
|                      | `api_test_data.py`     | Implemented to store all the request payloads                                                             |
| `src\test-resources` | `schemas.json`         | Implemented to store all the responce schemas                                                             |
|                      | `api_test_data,json`   | Implemented to store all the request payloads                                                             |
|                      | `ui_test_data,json`    | Implemented to store all the UI request data                                                              |
| `root`               | `playwright.config.js` | This contain Playwright enviorment spesific data including timeouts, baseURL, reporting, browsers ..etc.. |
|                      | `Dockerfile`           | This contain the Playwright dockerimage                                                                   |

## How Project works in CI/CD

- Once the automation code is commited to github
- It will trigger github workflows through playwright.yml file
- It will get the Dockerfile in the project
- Then it will pull the playwright image and it will include the automation code
- Then image will be pushed to DockerHub
- Finally in the test stage in .yml file it will pull the created docker image from docker hub and execute the test

Note: Please keep in mind that in a perfect environment, after a code change, the tests should be run and only then should further action be taken if the tests pass. This has been done  in order to demonstrate how integration should work.
