# amount-capitalized-in-chinese
大写中文金额转换

## Quick start

### node
npm install --save amount-capitalized-in-chinese

const acic = require('amount-capitalized-in-chinese')

acic(123) => "壹佰贰拾叁元整"

### browser
<script src="amount-capitalized-in-chinese.umd.js"></script>

amountCapitalizedInChinese(123) => "壹佰贰拾叁元整"

### How to build
#### npm run build or node rollup

generate flow format files:

cjs => index.js
amd => module-name.amd.js
es => module-name.es.js
iife => module-name.iife.js
umd => module-name.umd.js

#### node rollup umd amd

generate flow format files:

amd => module-name.amd.js
umd => module-name.umd.js

#### node rollup umd minimize

generate flow format files:

umd => module-name.umd.js
umd => module-name.umd.min.js
