:: (rmdir) Delete test/built directory; (/s) with all content; (/q) no confirmation prompt
rmdir /q /s "test/built"

:: https://www.typescriptlang.org/docs/handbook/compiler-options.html
:: Run typescript compiler; (-p) using specific config file
tsc -p tsconfig-test.json