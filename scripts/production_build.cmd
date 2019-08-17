:: (rmdir) Delete built directory; (/s) with all content; (/q) no confirmation prompt
rmdir /q /s "built"

:: https://www.typescriptlang.org/docs/handbook/compiler-options.html
:: Run typescript compiler; (-p) using specific config file
tsc -p tsconfig-src.json