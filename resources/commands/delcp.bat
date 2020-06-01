@echo off
Rem this is a script for creating a new component
Rem settiing data parameters
set component=%1
set dir=%component%Component
Rem creating hierachies directories
cd components
rmdir /S /Q %dir%
cd ..
echo %dir% successfully deleted
