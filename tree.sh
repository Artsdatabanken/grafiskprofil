      echo "list folder"
      ls -l
      echo "enter code"
      cd code  
      find . -type d -exec tree -H . -o  '{}/index.html' \;
      cd ..
      ls -l