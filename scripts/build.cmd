:: Readability
set outputDir=%1
set tsconfig=%2

:: (rmdir) Delete output directory; (/s) with all content; (/q) no confirmation prompt
rmdir /q /s "%outputDir%"

:: robust copy the package.json to the output directory
:: robocopy [fromDir] [toDir] [files]
robocopy "./" "./%outputDir%" "package.json"

:: https://www.typescriptlang.org/docs/handbook/compiler-options.html
:: Run typescript compiler; (-p) using specific config file; into specific output directory
call tsc -p "%tsconfig%" --outDir "%outputDir%"

:: change directory to output directory, so npm install runs correctly
cd "./%outputDir%"

:: run npm install (only production modules)
call npm install --production