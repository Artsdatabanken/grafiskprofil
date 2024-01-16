      cd code
      find . -type d -exec tree -H . -o  '{}/structure.html' \;
      cd ..
      ls -l