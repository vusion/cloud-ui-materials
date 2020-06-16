### 基本用法

``` vue
<template>
<x-monaco-editor v-model="value" theme="vs-dark" language="typescript"></x-monaco-editor>
</template>
<script>
export default {
    data() {
        return {
            value:
`/* Game of Life
 * Implemented in TypeScript
 * To learn more about TypeScript, please visit http://www.typescriptlang.org/
 */
 
module Conway {
	export class Cell {
		public row: number;
		public col: number;
		public live: boolean;
		
		constructor(row: number, col: number, live: boolean) {
			this.row = row;
			this.col = col;
			this.live = live
		}
	}
}
`,
        };
    },
};
</script>
```
