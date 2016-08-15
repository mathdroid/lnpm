#! /usr/bin/env bash
dependencies=$1
array=(${dependencies//;/ })
for element in "${array[@]}"
do
  echo "Installing package: $element"
  npm install "$element"
done
