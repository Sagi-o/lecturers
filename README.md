

# Lecturers

This project was generated using [Nx](https://nx.dev).

## How to run this application

Run `nx serve backend-nest` for the backend NestJS server, will be served on `http://localhost:3333/`.<br/>

Run `nx serve frontend-react` for the frontend React application. Navigate to `http://localhost:4200/`.

## Filtering
Filtering is done on the server, server can get `languageIds` query param like: `?languageIds=NodeJs,Angular` parse it, and return results to the frontend that consumes it.<br/>There is an advantage with server side filtering because:<br/>1. Not all data is found on the frontend application, especailly when working with large amounts of data<br/>2. It can be huge performance issue to make it on the frontend<br/>3. Filtering on the server makes sense becasue logic is on server and no matter which application asks to filter by `languageIds` - its exposed through the API

## Dependncy Graph of the project
![Screen Shot 2022-08-15 at 15 56 12](https://user-images.githubusercontent.com/44846094/184639258-6d843689-2f4c-41e2-a60c-82f2548febda.png)

`backend-nest` - NestJS Server<br/>
`frontend-react` - React Frontend<br/>
`data-access` - Library used as a fetch-layer, exposes API services for data access<br/>
`shared-models` - Library that exposes shared models between the applications

## Screenshots (app is responsive, and supports local CREATE/GET/DELETE operations)

![Screen Shot 2022-08-15 at 16 03 55](https://user-images.githubusercontent.com/44846094/184640340-861a1af2-e859-4cd6-a11d-29a85cec2080.png)

![Screen Shot 2022-08-15 at 16 04 12](https://user-images.githubusercontent.com/44846094/184640348-efe42772-4d0f-4d7e-b7b6-bc5a37e0a3d2.png)

![Screen Shot 2022-08-15 at 16 04 29](https://user-images.githubusercontent.com/44846094/184640362-8f0a462e-88a8-4355-b72f-500980ccb6f4.png)

![Screen Shot 2022-08-15 at 16 04 43](https://user-images.githubusercontent.com/44846094/184640372-3e8260a0-b534-4233-93a8-8fa8e7304428.png)

