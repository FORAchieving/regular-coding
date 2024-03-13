import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
// const path = require('path');
import path from "path";
/**  以逗号解析变量
* @each $val, $name in () ,(){};
* postcss.list.comma(str).map(str => str.replace(/^\$/, ''));
*     -》 list.split(string, [','], true)
*/
import each from 'postcss-each';
import nested from 'postcss-nested';
/**以空格解析变量
 * @each $val, $name in () ,(){};
 * const params = node.params.split(matchInOperator);
 * const args = (params[0] || '').trim().split(' ');
 * const varname = args[0].trim().slice(1);；
 * import vars from "postcss-advanced-variables";
*/
import eachVar from "postcss-each-variables";
import mix from "postcss-color-mix";
import pfor from 'postcss-for';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ vue(), eslint() ],
    // plugins: [ vue() ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css:{
        postcss: {
            plugins:
                [
                    nested(),
                    eachVar(),
                    each({
                        plugins: {
                            beforeEach: [
                                pfor(),mix(),
                            ],
                        }
                    }),

                ]

        },
    },
    server: {
        open: true,
        port: 3005,
        host: '0.0.0.0'
    }
});
