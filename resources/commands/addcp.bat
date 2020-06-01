@echo off
Rem this is a script for creating a new component
Rem settiing data parameters
set component=%1
set dir=%component%Component
set "tab=	"
Rem creating hierachies directories
cd components
mkdir %dir%
mkdir %dir%\css
mkdir %dir%\js
mkdir %dir%\js\data
mkdir %dir%\js\model
mkdir %dir%\js\service
Rem creating files
type nul > %dir%\css\%dir%.css
type nul > %dir%\js\%dir%.js
type nul > %dir%\js\data\%dir%DataSource.js
type nul > %dir%\js\model\%component%.js
type nul > %dir%\js\service\%dir%Service.js
type nul > %dir%\%dir%.html
Rem associate files (html)
echo ^<!DOCTYPE html^> > %dir%\%dir%.html
echo ^<html lang="en"^> >> %dir%\%dir%.html
echo %tab%^<head^> >> %dir%\%dir%.html
echo %tab%%tab%^<meta charset="UTF-8"^> >> %dir%\%dir%.html
echo ^<meta name="viewport" content="width=device-width" /^> >> %dir%\%dir%.html 
echo %tab%%tab%^<title^>%dir%^</title^> >> %dir%\%dir%.html
echo %tab%%tab%^<link rel="stylesheet" href="../../css/style.css"^> >> %dir%\%dir%.html
echo %tab%%tab%^<link rel="stylesheet" href="css/%dir%.css"^> >> %dir%\%dir%.html
echo %tab%%tab%^<script src="../../js/main.js"^>^</script^> >> %dir%\%dir%.html
echo %tab%%tab%^<script src="js/data/%dir%DataSource.js"^>^</script^> >> %dir%\%dir%.html
echo %tab%%tab%^<script src="js/model/%component%.js"^>^</script^> >> %dir%\%dir%.html
echo %tab%%tab%^<script src="js/service/%dir%Service.js"^>^</script^> >> %dir%\%dir%.html
echo %tab%%tab%^<script src="js/%dir%.js"^>^</script^> >> %dir%\%dir%.html
echo %tab%^</head^> >> %dir%\%dir%.html
echo %tab%^<body onload="main()"^> >> %dir%\%dir%.html
echo %tab%%tab%^<div class="content"^> >> %dir%\%dir%.html
echo %tab%%tab%%tab%^<div id="header"^>^</div^> >> %dir%\%dir%.html
echo %tab%%tab%%tab%^<h1^>%dir% works^</h1^> >> %dir%\%dir%.html
echo %tab%%tab%%tab%^<div id="footer"^>^</div^> >> %dir%\%dir%.html
echo %tab%%tab%^</div^> >> %dir%\%dir%.html
echo %tab%^</body^> >> %dir%\%dir%.html
echo ^</html^> >> %dir%\%dir%.html
Rem associate files (js:main)
echo /*Global Variables*/ > %dir%\js\%dir%.js
echo let view; >> %dir%\js\%dir%.js
echo let service; >> %dir%\js\%dir%.js
echo /*Default class*/ >> %dir%\js\%dir%.js
echo function %dir%(service) { >> %dir%\js\%dir%.js
echo %tab%//TODO: Intitialize controller for %dir% >> %dir%\js\%dir%.js
echo %tab%current_component = '%component%'; >> %dir%\js\%dir%.js
echo %tab%loadResources(); >> %dir%\js\%dir%.js
echo %tab%this.service = service; >> %dir%\js\%dir%.js
echo %tab%//this.table = this.get('table-%component%ID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) >> %dir%\js\%dir%.js
echo } >> %dir%\js\%dir%.js >> %dir%\js\%dir%.js
echo %dir%.prototype.get = function (id) { >> %dir%\js\%dir%.js
echo %tab%return document.getElementById(id); >> %dir%\js\%dir%.js
echo }; >> %dir%\js\%dir%.js
echo // Adding a row in the table member >> %dir%\js\%dir%.js
echo %dir%.prototype.add%component%Row = function (one%component%) { >> %dir%\js\%dir%.js
echo %tab%let row = this.table.insertRow(); >> %dir%\js\%dir%.js
echo %tab%//row.insertCell().innerHTML = news.id; >> %dir%\js\%dir%.js
echo %tab%//TODO:INSERT DATA IN CELLS >> %dir%\js\%dir%.js
echo }; >> %dir%\js\%dir%.js
echo // Printing all service data into the table member >> %dir%\js\%dir%.js
echo %dir%.prototype.print%component%List = function () { >> %dir%\js\%dir%.js
echo %tab%for (let i = 0; i ^< this.service.size(); i++) { >> %dir%\js\%dir%.js
echo %tab%%tab%this.add%component%Row(this.service.get(i)); >> %dir%\js\%dir%.js
echo %tab%} >> %dir%\js\%dir%.js
echo }; >> %dir%\js\%dir%.js
echo /* Main Function */ >> %dir%\js\%dir%.js
echo function main() { >> %dir%\js\%dir%.js
echo %tab%service = new %dir%Service(); >> %dir%\js\%dir%.js
echo %tab%//service.load(db%component%); Uncomment to load data for dynamic use >> %dir%\js\%dir%.js
echo %tab%view = new %dir%(service); >> %dir%\js\%dir%.js
echo %tab%//view.print%component%List(); Uncomment to print data in table member >> %dir%\js\%dir%.js
echo } >> %dir%\js\%dir%.js
Rem associate files (js:data)
echo /* Global data source table for %dir% */ > %dir%\js\data\%dir%DataSource.js
echo let db%component% = [ >> %dir%\js\data\%dir%DataSource.js
echo %tab%// Add object structure associated with the model created >> %dir%\js\data\%dir%DataSource.js
echo %tab%{ >> %dir%\js\data\%dir%DataSource.js
echo %tab%%tab%id:1, >> %dir%\js\data\%dir%DataSource.js
echo %tab%}, >> %dir%\js\data\%dir%DataSource.js
echo ]; >> %dir%\js\data\%dir%DataSource.js
Rem associate files (js:model)
echo /* Default Model for %dir% */ > %dir%\js\model\%component%.js
echo function %component%(id) { >> %dir%\js\model\%component%.js
echo %tab%//TODO: Intitialize model properties >> %dir%\js\model\%component%.js
echo %tab%this.id = id; >> %dir%\js\model\%component%.js
echo } >> %dir%\js\model\%component%.js
Rem associate files (js:service)
echo function %dir%Service() { > %dir%\js\service\%dir%Service.js
echo %tab%//TODO: Intitialize service for %dir% >> %dir%\js\service\%dir%Service.js
echo %tab%this.db = []; >> %dir%\js\service\%dir%Service.js
echo } >> %dir%\js\service\%dir%Service.js
echo // Add model to database table object >> %dir%\js\service\%dir%Service.js
echo %dir%Service.prototype.add = function (one%component%) { >> %dir%\js\service\%dir%Service.js
echo %tab%this.db.push(one%component%); >> %dir%\js\service\%dir%Service.js
echo }; >> %dir%\js\service\%dir%Service.js
echo // Remove from database object by index >> %dir%\js\service\%dir%Service.js
echo %dir%Service.prototype.remove = function(index) { >> %dir%\js\service\%dir%Service.js
echo %tab%this.db.splice(index, 1); >> %dir%\js\service\%dir%Service.js
echo }; >> %dir%\js\service\%dir%Service.js
echo // get from database object by index >> %dir%\js\service\%dir%Service.js
echo %dir%Service.prototype.get = function(index) { >> %dir%\js\service\%dir%Service.js
echo %tab%return this.db[index]; >> %dir%\js\service\%dir%Service.js
echo }; >> %dir%\js\service\%dir%Service.js
echo // elements count of database object >> %dir%\js\service\%dir%Service.js
echo %dir%Service.prototype.size = function() { >> %dir%\js\service\%dir%Service.js
echo %tab%return this.db.length; >> %dir%\js\service\%dir%Service.js
echo }; >> %dir%\js\service\%dir%Service.js
echo // Load all data from source to database object >> %dir%\js\service\%dir%Service.js
echo %dir%Service.prototype.load = function(dbSource) { >> %dir%\js\service\%dir%Service.js
echo %tab%for (let i = 0; i ^< dbSource.length; i++) { >> %dir%\js\service\%dir%Service.js
echo %tab%%tab%// Transforming database source into database object of %component% model >> %dir%\js\service\%dir%Service.js
echo %tab%%tab%this.add( >> %dir%\js\service\%dir%Service.js
echo %tab%%tab%%tab%new %component%( >> %dir%\js\service\%dir%Service.js
echo %tab%%tab%%tab%%tab%dbSource[i].id, >> %dir%\js\service\%dir%Service.js
echo %tab%%tab%%tab%) >> %dir%\js\service\%dir%Service.js
echo %tab%%tab%) >> %dir%\js\service\%dir%Service.js
echo %tab%} >> %dir%\js\service\%dir%Service.js
echo }; >> %dir%\js\service\%dir%Service.js
Rem associate files css
echo body { > %dir%\css\%dir%.css
echo %tab%display:block; >> %dir%\css\%dir%.css
echo %tab%margin:auto; >> %dir%\css\%dir%.css
echo } >> %dir%\css\%dir%.css
Rem finishing up
cd ..
echo %dir% successfully created a wlad nass