#!/bin/bash

echo "rdr pass inet proto tcp from any to any port 80 -> 127.0.0.1 port 14159" | sudo pfctl -ef -