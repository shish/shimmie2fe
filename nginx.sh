#!/bin/sh
cd $(dirname $0)
envsubst '$BACKEND_PROTO $BACKEND_HOST $WEB_ROOT' < ./custom-nginx.template > $WEB_CONF
exec nginx -g "daemon off;"
