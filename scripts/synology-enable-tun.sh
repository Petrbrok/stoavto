#!/bin/sh

case "${1:-start}" in
  start)
    /sbin/modprobe tun
    ;;
  stop)
    ;;
esac
