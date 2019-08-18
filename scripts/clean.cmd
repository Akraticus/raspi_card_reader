:: "directory not empty" errors MAY be fixed by running with admin privileges
rmdir /s /q "%1"
if exist "%1" rmdir /s /q "%1"
rmdir /s /q "%2"
if exist "%2" rmdir /s /q "%2"