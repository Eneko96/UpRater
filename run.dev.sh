#!/bin/bash

panes=false
migrate=false

while [ "$#" -gt 0 ]; do
  case "$1" in
    --panes)
      panes=true
      shift
      ;;
    --migrate)
      migrate=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

if [[ "$(uname)" == "Darwin" ]]; then
  # If macOS, run the macOS version of the script
  env OPEN_PANES=$panes MIGRATE_DATA=$migrate sh run.dev.mac.sh
elif [[ "$(expr substr $(uname -s) 1 5)" == "Linux" ]]; then
  # If Linux, check if running under WSL
  if grep -qE "(Microsoft|WSL)" /proc/version &> /dev/null ; then
    # If running under WSL, run the Windows version of the script
    sh run.dev.windows.sh
  else
    # If not running under WSL, run the Linux version of the script
    sh linux_script.sh
  fi
else
  echo "Unsupported operating system"
  exit 1
fi
