#!/bin/bash

STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health)

if [ "$STATUS" -eq 200 ]; then
    echo "Health check passed."
    exit 0
else
    echo "Health check failed with status code: $STATUS"
    exit 1
fi