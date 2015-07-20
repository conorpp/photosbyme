#!/usr/bin/env bash

cp find2json /usr/bin
tar xvf lns.tar.gz
lns/lns --version > /dev/null && cp lns/lns /usr/bin
