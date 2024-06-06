#!/bin/bash

if docker compose build; then
    echo "build success"
    docker compose kill
    docker compose up -d
else
    echo "build failed, exit code: $?"
fi