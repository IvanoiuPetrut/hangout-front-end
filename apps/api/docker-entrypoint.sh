#!/bin/sh
set -e

# Starts as root only to fix ownership of the data volume (it may have been
# created by an older image that ran as root), then runs the app as "node".
if [ "$(id -u)" = "0" ]; then
  node_uid="$(id -u node)"
  for dir in /data "$UPLOADS_DIR"; do
    if [ -n "$dir" ] && [ -d "$dir" ] && [ "$(stat -c %u "$dir")" != "$node_uid" ]; then
      chown -R node:node "$dir"
    fi
  done
  exec su-exec node "$@"
fi

exec "$@"
