#!/usr/bin/env bash

# Stop at first error

set -e

## Color Variables ##

RED='\033[00;31m'
BOLD='\033[00;1m'
BOLD_RED='\033[00;1;31m'
RESET='\033[00;0m'

# Functions

display_usage() {
    echo -e "\n${BOLD}Usage:${RESET} $0 [dayNumber] \n"
}

# Check to see if arguments weren't given
if [[ $# -eq 0 ]]; then
    echo -e "${BOLD_RED}ERROR: ${RED}Missing day number${RESET}"
    display_usage
    exit 1
fi

# Get the 2-digit day
DAY=$(printf %02d $1)
FILE=./src/day-${DAY}/index.ts

# Run the `index.ts` in the given folder if it can be found
if [ -f $FILE ]; then
    echo ""
    deno run --allow-read --allow-env $FILE
    echo ""
else
    echo -e "${BOLD_RED}ERROR: ${RED}File \"${FILE}\" does not exist${RESET}"
    exit 1
fi
