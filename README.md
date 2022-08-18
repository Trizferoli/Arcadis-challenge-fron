# Arcadis-challenge-front

MVP of a project for registering and consulting geographic points and its parameters. Made for a selection project.
Api can be accessed here: https://github.com/Trizferoli/Arcadis-challenge-API

![image of the project](./arcadis//src/assets/Opera%20Instant%C3%A2neo_2022-08-18_130542_localhost.png)
## Technologies

- Javascript:
- React.js
- CSS
- HTML
- Axios
- Material UI
- Datefns
- React-router-dom

## Features
The user can:

- Add point
- Add parameter
- See parameters table
- Highlight irregular parameters
- See points table

_**Parameters**_

- Get specific parameter
- Get all parameters
- Get parameters 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2' legislation limit value
- Get irregular values that do surpass the limit established by 'COPAM/CERH_MG n° 01 -2008 água doce - classe 2'

---

## To run the project remotely:

1. Fork the projects repository

2. Clone the repository

ex. using SSH:
```sh
   git clone git@github.com:{yourUserName}/Arcadis-challenge-API.git
```
3. Install packages
using npm:
```sh
    npm install
```
4. Run the project
```sh
    npm start
```
---
## Files structure:

```bash
└───arcadis     # package files
    ├───public      # base html and page icon
    └───src     # application index base file, its css, routes file and global css file
        ├───assets      # images used on the project
        ├───components
        │   ├───Form    # parameter form and point form components and its css file
        │   ├───Header  # header component and its css file
        │   ├───Sidebar #sidebar and its css file
        │   └───Table   # parameter table and points table components
        ├───page
        │   ├───AddParameter # add parameter page component
        │   ├───AddPoint    # add point page component
        │   └───Dashboard   # parameter and points dashbboard page component and its css file
        └───service     # connection to the api service 

```