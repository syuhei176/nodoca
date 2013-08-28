#!bin/sh

CLOOCAUSERPASS=aaa@gmail.com:bbb
CLOOCAPROJECTID=27d5c9758c7618a1e646876c7e743ef6

# source download
curl --user $CLOOCAUSERPASS http://www.clooca.com/api/dl/$CLOOCAPROJECTID > project.zip

# upload
unzip project.zip
rm project.zip
