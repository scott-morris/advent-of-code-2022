#!/usr/bin/env bash

# Stop at first error

set -e

## Color Variables ##

RED='\033[00;31m'
GREEN='\033[00;32m'
BLUE='\033[00;34m'
BOLD='\033[00;1m'
BOLD_RED='\033[00;1;31m'
BOLD_BLUE_UNDERLINE='\033[00;1;4;31m'
RESET='\033[00;0m'

# Functions

display_usage (){
    echo -e "\n${BOLD}Usage:${RESET} $0 [dayNumber] \n"
}

echo ""

# Check to see if arguments weren't given
if [[ $# -eq 0 ]]; then
    echo -e "${BOLD_RED}ERROR: ${RED}Missing day number${RESET}"
    display_usage
    exit 1
fi

# Check to see `session.env` exists
if [[ ! -f ./session.env ]]; then
    echo -e "${BOLD_RED}ERROR: ${RED}Missing session.env${RESET}"
    exit 0
else
    echo -e "${BLUE}Session information found in ${BOLD_BLUE_UNDERLINE}./session.env${RESET}"
fi

# Get the environment variable
. ./session.env

download () {
    FILE=$2
    URL=https://adventofcode.com/2021/day/$1/input
    echo -e "${BLUE}Downloading ${BOLD_BLUE_UNDERLINE}${URL}${BLUE} to ${BOLD_BLUE_UNDERLINE}${FILE}${RESET}"
    curl $URL --cookie "session=$SESSION" --output $FILE &>/dev/null

    LENGTH=$(wc -c <$FILE)
    if [ "$LENGTH" -ne 0 ] && [ -z "$(tail -c -1 <$FILE)" ]; then
        # The file ends with a newline or null
        echo -e "${BLUE}${BOLD_BLUE_UNDERLINE}${FILE}${BLUE} ends with a newline or null. Removing it...${RESET}"
        dd if=/dev/null of=$FILE obs="$((LENGTH-1))" seek=1 &>/dev/null
    fi

    echo "";
    echo -e "${GREEN}Your data for Day ${DAY} is available at ${BOLD_BLUE_UNDERLINE}${FILE}${RESET}"
}

# Get the 2-digit day
DAY=$(printf %02d $1)
FILE=./data/input-${DAY}.data

if [ -f $FILE ]; then
# Run the `run.js` in the given folder if it can be found
    echo ""
    while true; do
        read -p "The file \"${FILE}\" already exists. Overwrite? (y/n) " OVERWRITE
        case $OVERWRITE in
            [Yy]* ) download $1 $FILE; break;;
            [Nn]* ) exit 0; break;;
            * ) echo "Please answer yes or no.";;
        esac
    done
else
    download $1 $FILE
fi
