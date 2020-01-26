#!/bin/sh

#
# Pre Launch Runtime Tasks
#
DIR=/entrypoint.d

if [ -d "$DIR" ]
then
  /bin/run-parts --verbose "$DIR"
fi

#
# Launch CMD
#
exec "$@"
