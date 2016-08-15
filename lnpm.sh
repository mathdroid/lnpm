dependencies=$1
array=(${dependencies//;/ })
for element in "${array[@]}"
do
  echo -e "  Package: $element"
  npm install --verbose "$element"
done
