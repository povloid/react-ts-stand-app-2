#!/bin/bash

FILE=IconMdi.ts

echo 'export type IconMDIIname = "none"' > $FILE
ls -1 ../../../node_modules/@mdi/svg/svg | sed 's/.svg//' | awk '{print ("    | \"" $1 "\"")}' >> $FILE
