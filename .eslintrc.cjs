module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-typescript"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module",
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        // js 规则
        "semi": [ 2 ],
        "array-bracket-spacing": [ "error","always" ],
        "object-curly-spacing": [ "error","always" ],
        "indent": [ "error", 4 ],
        "no-trailing-spaces": [ 2 ],

        // eslint-plugin-vue vue文件规则
        "vue/mustache-interpolation-spacing": [ "error","always" ],
        "vue/valid-v-slot": "off"
    }
};
