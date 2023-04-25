/* eslint-env node */

module.exports = {
	root: true,
	env: {
		node: true,
		commonjs: true,
	},
	extends: ["eslint:recommended", "plugin:import/typescript"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"vue/no-multiple-template-root": "off",
		"vue/multi-word-component-names": "off", // 去除组件只能多单词组成
		// "vue/script-indent": ["error", 2],
		// "vue/html-indent": ["error", 2],
		// "vue/html-comment-indent": ["error", 2],
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"prefer-const": "off",
		// indent: [
		//   "error",
		//   2,
		//   {
		//     SwitchCase: 1,
		//   },
		// ],
	},
};
