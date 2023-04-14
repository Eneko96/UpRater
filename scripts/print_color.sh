#!/bin/bash

function print_color {
  case "$1" in
    red)
      color='\033[0;31m'
      ;;
    green)
      color='\033[0;32m'
      ;;
    yellow)
      color='\033[0;33m'
      ;;
    blue)
      color='\033[0;34m'
      ;;
    purple)
      color='\033[0;35m'
      ;;
    cyan)
      color='\033[0;36m'
      ;;
    gray)
      color='\033[0;37m'
      ;;
    *)
      color='\033[0m'
      ;;
  esac
  printf "%b%s%b\n" "$color" "$2" "\033[0m"
}
