#!/bin/bash

if ! grep -q "authtoken: $1" /root/.config/ngrok/ngrok.yml 2>/dev/null; then
  if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <ngrok-authtoken>"
    exit 1
  fi
  ngrok authtoken "$1"
fi

ngrok http 9000
