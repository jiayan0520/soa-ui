module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: ['vue'],
  // add your custom rules here
  // 基于vue源码eslint 代码规范
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

  'rules': {
    'accessor-pairs': 2,    // 定义对象的set存取器属性时，强制定义get
    'arrow-spacing': [2, {  // 箭头函数的箭头前后的空格规范
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'], // 禁止或强制在单行代码块中使用空格(启用)
    'brace-style': [2, '1tbs', {  // 强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，if while function 后面的{必须与if在同一行，java风格。
      'allowSingleLine': true
    }],
    'camelcase': [0, { // 双峰驼命名格式
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],// 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    'comma-spacing': [2, {       // 控制逗号前后的空格
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],   // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    'constructor-super': 2,       // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
    'curly': [2, 'multi-line'],   // 强制所有控制语句使用一致的括号风格
    'dot-location': [2, 'property'],  // 强制object.key 中 . 的位置，参数:property，'.'号应与属性在同一行,  object, '.' 号应与对象名在同一行
    'eol-last': 2,                // 文件末尾强制换行
    'eqeqeq': [2, 'allow-null'],  // 使用 === 替代 == allow-null允许null和undefined==
    'generator-star-spacing': [2, { // 强制 generator 函数中 * 号周围使用一致的空格
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2],   // 要求回调函数中有容错处理
    'indent': [2, 2, {            // 缩进风格
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {         // 强制在对象字面量的属性中键和值之间使用一致的间距
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {    // 强制在关键字前后使用一致的空格 (前后腰需要)
      'before': true,
      'after': true
    }],
    'new-cap': [2, {           // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,            // 要求调用无参构造函数时有圆括号
    'no-array-constructor': 2,  // 禁止使用 Array 构造函数
    'no-caller': 2,             // 禁用 arguments.caller 或 arguments.callee
    'no-console': 'off',        // 禁用 console
    'no-class-assign': 2,       // 禁止修改类声明的变量

    'no-cond-assign': 2,        // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2,       // 禁止修改 const 声明的变量
    'no-control-regex': 0,      // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'no-delete-var': 2,         // 禁止删除变量
    'no-dupe-args': 2,          // 禁止 function 定义中出现重名参数
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2,          // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2,     // 禁止重复的 case 标签
    'no-empty-character-class': 2, // 禁止在正则表达式中使用空字符集 (/^abc[]/)
    'no-empty-pattern': 2,        // 禁止使用空解构模式
    'no-eval': 2,                 // 禁用 eval()
    'no-ex-assign': 2,            // 禁止对 catch 子句的参数重新赋值
    'no-extend-native': 2,        // 禁止扩展原生类型
    'no-extra-bind': 2,           // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2,   // 禁止不必要的布尔转换
    'no-extra-parens': [2, 'functions'],  //  禁止不必要的括号 //(a * b) + c;//报错
    'no-fallthrough': 2,          // 禁止 case 语句落空
    'no-floating-decimal': 2,     // 禁止数字字面量中使用前导和末尾小数点
    'no-func-assign': 2,          // 禁止对 function 声明重新赋值
    'no-implied-eval': 2,         // 禁止使用类似 eval() 的方法
    'no-inner-declarations': [2, 'functions'],  //  禁止在嵌套的块中出现 function 或 var 声明
    'no-invalid-regexp': 2,        // 禁止 RegExp 构造函数中无效的正则表达式字符串
    'no-irregular-whitespace': 2,  // 禁止在字符串和注释之外不规则的空白
    'no-iterator': 2,              // 禁用 __iterator__ 属性
    'no-label-var': 2,             // 不允许标签与变量同名
    'no-labels': [2, {             //  禁用标签语句
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,          // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2,// 不允许空格和 tab 混合缩进
    'no-multi-spaces': 2,         // 禁止使用多个空格
    'no-multi-str': 2,            // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
    'no-multiple-empty-lines': [2, {   // 不允许多个空行
      'max': 1
    }],
    'no-native-reassign': 2,        // 禁止对原生对象赋值
    'no-negated-in-lhs': 2,         // 禁止在 in 表达式中出现否定的左操作数
    'no-new-object': 2,             // 禁止使用 Object 的构造函数
    'no-new-require': 2,            // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2,             // 禁止 Symbol  的构造函数
    'no-new-wrappers': 2,           // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2,              // 禁止把全局对象 (Math 和 JSON) 作为函数调用  错误：var math = Math();
    'no-octal': 2,                  // 禁用八进制字面量
    'no-octal-escape': 2,           // 禁止在字符串中使用八进制转义序列
    'no-path-concat': 2,            // 禁止对 __dirname 和 __filename进行字符串连接
    'no-proto': 2,                  // 禁用 __proto__ 属性
    'no-redeclare': 2,              // 禁止使用 var 多次声明同一变量
    'no-regex-spaces': 2,           // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,            // 禁止自我赋值
    'no-self-compare': 2,           // 禁止自身比较
    'no-sequences': 2,              // 禁用逗号操作符
    'no-shadow-restricted-names': 2,  // 禁止覆盖受限制的标识符
    'no-spaced-func': 2,            // 禁止 function 标识符和括号之间出现空格
    'no-sparse-arrays': 2,          // 禁用稀疏数组
    'no-this-before-super': 2,      // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 2,          // 禁止抛出非异常字面量
    'no-trailing-spaces': 2,        //  禁用行尾空格
    'no-undef': 2,                  // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 2,             // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2,    // 禁止出现令人困惑的多行表达式
    'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件
    'no-unneeded-ternary': [2, {      // 禁止可以在有更简单的可替代的表达式时使用三元操作符
      'defaultAssignment': false
    }],

    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    /*
     function foo() {
     return true;
     console.log("done");
     }//错误
     */
    'no-unreachable': 2,
    'no-unsafe-finally': 2,           //禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': [2, {           // 禁止出现未使用过的变量
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,            // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2,    // 禁止不必要的计算性能键对象的文字
    'no-useless-constructor': 2,     // 禁用不必要的构造函数
    'no-useless-escape': 0,          // 禁用不必要的转义字符
    'no-whitespace-before-property': 2,// 禁止属性前有空白
    'no-with': 2,                    // 禁用 with 语句
    'one-var': [2, {                // 强制函数中的变量要么一起声明要么分开声明
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {      // 强制操作符使用一致的换行符
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],    // 要求或禁止块内填充
    'quotes': [2, 'single', {         // 强制使用一致的反勾号、双引号或单引号
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    // 'semi': [2, 'never'],
    'semi-spacing': [2, {             // 强制分号之前和之后使用一致的空格
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'], // 强制在块之前使用一致的空格
    'space-before-function-paren': [0, 'never'], // 强制在 function的左括号之前使用一致的空格
    'space-in-parens': [2, 'never'],         // 强制在圆括号内使用一致的空格
    'space-infix-ops': 2,                 // 要求操作符周围有空格
    'space-unary-ops': [2, {              // 强制在一元操作符前后使用一致的空格
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {     // 强制在注释中 // 或 /* 使用一致的空格
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'use-isnan': 2,                         // 要求使用 isNaN() 检查 NaN
    'valid-typeof': 2,                      // 强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'],                // 要求 IIFE 使用括号括起来
    'yield-star-spacing': [2, 'both'],      // 强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'],                   // 这条规则需要一个参数。如果是 "never" 那么比较绝不能是一个 Yoda 条件。
    'prefer-const': 2,                      // 要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,// 禁用 debugger
    'object-curly-spacing': [2, 'always', {       //强制在大括号中使用一致的空格
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']     //强制数组方括号中使用一致的空格
  },
}

