#!/bin/bash
cd api/
python flaskr/db.py
cd ../static/data/
./autogen.sh
wait
echo "Updated Data For BCT!"
