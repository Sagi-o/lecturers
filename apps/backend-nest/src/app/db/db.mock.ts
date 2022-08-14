import { Database } from "./db.types";

export const db: Database = {
    "lecturers": [
        {
            "id": '1',
            "name": "Moshe",
            "email": "moshe@moshe.com",
            "languages": [
                '1',
                '3'
            ]
        },
        {
            "id": '2',
            "name": "Avi",
            "email": "avi@moshe.com",
            "languages": [
                '3'
            ]
        },
        {
            "id": '3',
            "name": "Gila",
            "email": "gila@moshe.com",
            "languages": [
                '2',
                '4',
                '7'
            ]
        },
        {
            "id": '4',
            "name": "Yossi",
            "email": "yossi@moshe.com",
            "languages": [
                '5',
                '7',
                '9',
            ]
        },
        {
            "id": '5',
            "name": "Abraham",
            "email": "abraham@moshe.com",
            "languages": [
                '5',
                '9',
            ]
        }
    ],
    "languages": [
        {
            "id": '1',
            "name": "Java"
        },
        {
            "id": '2',
            "name": ".NET"
        },
        {
            "id": '3',
            "name": "NodeJS"
        },
        {
            "id": '4',
            "name": "Advanced Vanilla JS"
        },
        {
            "id": '5',
            "name": "React"
        },
        {
            "id": '6',
            "name": "Angular"
        },
        {
            "id": '7',
            "name": "Kotlin"
        },
        {
            "id": '8',
            "name": "Dart"
        },
        {
            "id": '9',
            "name": "Flutter"
        }
    ]
}