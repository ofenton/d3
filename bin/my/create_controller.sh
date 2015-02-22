#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "provide the controller name please"
    exit
fi
$(dirname $BASH_SOURCE)/../rails generate controller $1 index
