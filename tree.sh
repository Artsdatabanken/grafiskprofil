      cd code
      mv index.html index.bk
      find . -type d -exec tree -H . -o  '{}/index.html' \;
      rm index.html
      mv index.bk index.html
      cd ..
      ls -l