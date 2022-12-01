#!/usr/bin/env bash

# Stop at first error

set -e

# Private

NUM_ARGS=$#

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
if [[ $NUM_ARGS -eq 0 ]]; then
    echo -e "${BOLD_RED}ERROR: ${RED}Missing day number${RESET}"
    display_usage
    exit 1
fi

# Get the 2-digit day
DAY=$(printf %02d $1)
FOLDER="src/day-$DAY"

# while true; do
#     read -p "Download the input file? (y/n) " DOWNLOAD
#     case $DOWNLOAD in
#         [Yy]* ) ./getinput.sh $1; break;;
#         [Nn]* ) touch data/input-${DAY}.data; break;;
#         * ) echo "Please answer yes or no.";;
#     esac
# done

deno test --allow-read --allow-env $FOLDER/deno.test.ts
