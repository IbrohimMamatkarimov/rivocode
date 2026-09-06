import type { LessonContentBlock } from "./types";

type SectionContent = Record<string, LessonContentBlock[]>;

const javascriptFundamentals: SectionContent = {
  Introduction: [
    {
      heading: "What is JavaScript?",
      explanation:
        "JavaScript is the programming language of the web. It runs in every browser, adds interactivity to HTML and CSS pages, and now also runs on servers via Node.js.\n\nAlongside HTML and CSS, JavaScript is one of the three core technologies of the web. HTML structures a page, CSS styles it, and JavaScript makes it interactive.",
      codeExample: 'console.log("Hello, RivoCode!");',
      language: "javascript",
      examples: [
        {
          heading: "Writing to the page instead of the console",
          code: 'document.write("JavaScript can write directly into a page.");',
          language: "javascript",
          note: "document.write() is handy for quick demos, but real apps update specific elements instead of the whole page.",
        },
      ],
      note: "JavaScript has nothing to do with Java — the similar name was purely a 1995 marketing decision. They are completely different languages.",
      exercisePrompt: "Open the console and print your name using console.log().",
    },
    {
      heading: "Setting Up and Running Code",
      explanation:
        "You can run JavaScript directly in a browser console, inside a script tag, or in an editor like the one below. A program executes from the top of the file, line by line.\n\nMost real websites keep JavaScript in a separate .js file and link it with a script tag, rather than writing it inline in the HTML.",
      codeExample: 'let message = "JavaScript is running";\nconsole.log(message);',
      language: "javascript",
      syntax: '<script src="script.js"></script>',
      examples: [
        {
          heading: "Linking an external script",
          code: '<script src="script.js"></script>',
          language: "html",
          note: "Placing the script tag right before the closing </body> tag ensures the page's HTML loads first.",
        },
      ],
      exercisePrompt: "Change the message variable to say something about yourself, then run the code.",
    },
  ],
  "Variables & Data Types": [
    {
      heading: "Declaring Variables with let and const",
      explanation:
        "Use let for values that change and const for values that should not be reassigned. Avoid var in modern code — it has confusing scoping rules that let and const were introduced to fix.\n\nA good default: reach for const first, and only switch to let when a variable's value genuinely needs to change later.",
      codeExample: 'let age = 20;\nconst name = "Alex";\nage = 21;\nconsole.log(name, age);',
      language: "javascript",
      syntax: "let variableName = value;\nconst constantName = value;",
      examples: [
        {
          heading: "Reassigning a const throws an error",
          code: 'const pi = 3.14;\npi = 3.15; // TypeError: Assignment to constant variable.',
          language: "javascript",
          note: "This error is a feature, not a bug — it catches accidental reassignments before they cause a hard-to-find issue elsewhere.",
        },
      ],
      note: "const prevents reassignment of the variable itself, but objects and arrays declared with const can still have their contents changed — only the binding is locked.",
      exercisePrompt: "Declare a const for your favorite language and a let for a counter, then log both.",
    },
    {
      heading: "Primitive Data Types",
      explanation:
        "JavaScript has string, number, boolean, undefined, null, and more. The typeof operator tells you what type you are working with.\n\nUnlike languages such as Java or C++, you never declare a type up front — a variable's type is simply whatever value is currently assigned to it.",
      codeExample: 'let city = "Tashkent";\nlet year = 2026;\nlet isStudent = true;\nconsole.log(typeof city, typeof year, typeof isStudent);',
      language: "javascript",
      syntax: "typeof value",
      examples: [
        {
          heading: "undefined vs null",
          code: 'let a;\nlet b = null;\nconsole.log(a, typeof a);\nconsole.log(b, typeof b);',
          language: "javascript",
          note: "undefined means a variable was declared but never given a value. null is an explicit, intentional 'no value' that you assign yourself.",
        },
      ],
      exercisePrompt: "Create one variable of each primitive type and log its typeof.",
    },
    {
      heading: "Type Conversion",
      explanation:
        "JavaScript often converts types automatically, which is called coercion. You can also convert explicitly with Number(), String(), and Boolean(), which is usually safer since the result is predictable.",
      codeExample: 'let input = "42";\nlet number = Number(input);\nconsole.log(number + 8);',
      language: "javascript",
      syntax: "Number(value)\nString(value)\nBoolean(value)",
      examples: [
        {
          heading: "A classic coercion surprise",
          code: 'console.log("5" + 3);  // "53" (string concatenation)\nconsole.log("5" - 3);  // 2   (numeric subtraction)',
          language: "javascript",
          note: "The + operator concatenates when either side is a string, but - always tries to convert both sides to numbers first.",
        },
      ],
      exercisePrompt: "Convert the string \"100\" to a number and add 25 to it.",
    },
  ],
  Conditions: [
    {
      heading: "if, else if, and else",
      explanation:
        "Conditions let a program make decisions by running different code depending on whether an expression is true or false.\n\nJavaScript checks each condition top to bottom and runs only the first branch whose condition is true, skipping the rest.",
      codeExample: 'let score = 85;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
      language: "javascript",
      syntax: "if (condition) {\n  // code if true\n} else if (anotherCondition) {\n  // code if that's true\n} else {\n  // code otherwise\n}",
      examples: [
        {
          heading: "The ternary operator: a compact if/else",
          code: 'let age = 20;\nlet type = age >= 18 ? "adult" : "minor";\nconsole.log(type);',
          language: "javascript",
          note: "Ternaries are great for a simple either/or value, but nested ternaries get hard to read fast.",
        },
      ],
      exercisePrompt: "Write an if/else chain that prints \"Pass\" for scores 60 and above, and \"Fail\" otherwise.",
    },
    {
      heading: "Comparison and Logical Operators",
      explanation:
        "===, !==, <, and > compare values. && (and), || (or), and ! (not) combine multiple conditions together.\n\nAlways prefer === and !== over == and != — the triple-equals versions compare both value and type, avoiding surprising automatic type coercion.",
      codeExample: 'let age = 19;\nlet hasId = true;\nif (age >= 18 && hasId) {\n  console.log("Entry allowed");\n}',
      language: "javascript",
      syntax: "a === b   // strict equality\na && b    // both must be true\na || b    // at least one must be true",
      examples: [
        {
          heading: "Why === beats ==",
          code: 'console.log(0 == "0");   // true  (coerces types)\nconsole.log(0 === "0");  // false (no coercion)',
          language: "javascript",
        },
      ],
      note: "|| is also commonly used for a fallback value, like let name = input || \"Guest\";, though ?? is safer when 0 or an empty string are valid values.",
      exercisePrompt: "Write a condition that checks if a number is between 1 and 100 using &&.",
    },
    {
      heading: "Switch Statements",
      explanation:
        "A switch statement is a cleaner way to handle many possible exact-match values for a single variable, instead of writing a long chain of else if statements.",
      codeExample: 'let day = "Mon";\nswitch (day) {\n  case "Mon":\n    console.log("Start of week");\n    break;\n  default:\n    console.log("Some other day");\n}',
      language: "javascript",
      syntax: "switch (expression) {\n  case value1:\n    // code\n    break;\n  default:\n    // code\n}",
      examples: [
        {
          heading: "Falling through on purpose",
          code: 'let month = "Feb";\nswitch (month) {\n  case "Dec":\n  case "Jan":\n  case "Feb":\n    console.log("Winter");\n    break;\n  default:\n    console.log("Not winter");\n}',
          language: "javascript",
          note: "Stacking case labels with no code between them lets several values share the same block.",
        },
      ],
      note: "Forgetting break is one of the most common switch bugs — without it, execution 'falls through' into the next case.",
      exercisePrompt: "Write a switch statement that logs a greeting in a different language based on a lang variable.",
    },
  ],
  Loops: [
    {
      heading: "for Loops",
      explanation: "A for loop repeats code a set number of times using a counter. It's the most common loop when you know in advance how many times you need to repeat something.\n\nA for loop packs three steps — where to start, when to stop, and how to move forward — into a single, easy-to-scan line, instead of spreading them across separate statements.",
      codeExample: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
      language: "javascript",
      syntax: "for (initializer; condition; increment) {\n  // code to repeat\n}",
      examples: [
        {
          heading: "Counting down instead of up",
          code: "for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}",
          language: "javascript",
        },
        {
          heading: "Skipping every other number",
          code: "for (let i = 0; i <= 10; i += 2) {\n  console.log(i);\n}",
          language: "javascript",
          note: "The increment step doesn't have to be i++ — any expression that changes i works, including i += 2 to step by twos.",
        },
      ],
      note: "All three parts of a for loop are optional — for (;;) creates an infinite loop, easy to create by accident if you forget the increment.",
      exercisePrompt: "Use a for loop to print the numbers 10 down to 1.",
    },
    {
      heading: "while Loops",
      explanation:
        "A while loop repeats as long as a condition stays true, which is useful when you do not know exactly how many iterations you will need.\n\nBecause the condition is checked before every pass, a while loop can also run zero times if the condition is already false the first time it's checked.",
      codeExample: 'let count = 0;\nwhile (count < 3) {\n  console.log("Count:", count);\n  count++;\n}',
      language: "javascript",
      syntax: "while (condition) {\n  // code to repeat\n}",
      examples: [
        {
          heading: "do...while: run at least once",
          code: 'let n = 10;\ndo {\n  console.log(n);\n  n++;\n} while (n < 5);',
          language: "javascript",
          note: "Even though the condition is false from the start, do...while always runs its body at least once before checking.",
        },
        {
          heading: "Looping until a condition is met",
          code: 'let attempts = 0;\nwhile (attempts < 3) {\n  attempts++;\n}\nconsole.log("Gave up after", attempts, "attempts");',
          language: "javascript",
        },
      ],
      exercisePrompt: "Write a while loop that keeps doubling a number starting from 1 until it exceeds 100.",
    },
    {
      heading: "Looping Over Arrays",
      explanation: "A for...of loop lets you iterate directly over the values in an array, without managing an index counter yourself.\n\nThis makes the intent of the code clearer — you're saying \"for each item in this list\" instead of \"count from 0 to length, then look up each item by index.\"",
      codeExample: 'const fruits = ["apple", "banana", "mango"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}',
      language: "javascript",
      syntax: "for (const item of iterable) {\n  // code using item\n}",
      examples: [
        {
          heading: "Getting the index too, with .forEach()",
          code: 'const fruits = ["apple", "banana", "mango"];\nfruits.forEach((fruit, index) => {\n  console.log(index, fruit);\n});',
          language: "javascript",
          note: "forEach() is a method on arrays, and unlike for...of it always gives you the index alongside each value.",
        },
        {
          heading: "for...in for object keys",
          code: 'const student = { name: "Alex", age: 20 };\nfor (const key in student) {\n  console.log(key, student[key]);\n}',
          language: "javascript",
          note: "for...in loops over an object's keys, while for...of loops over an array's values — mixing the two up is a common source of bugs.",
        },
      ],
      exercisePrompt: "Loop over an array of your favorite courses and print each one.",
    },
  ],
  Functions: [
    {
      heading: "Declaring Functions",
      explanation:
        "Functions bundle reusable logic. Define one with the function keyword, then call it any number of times.\n\nWriting the same logic as a function instead of copy-pasting it everywhere means you only have to fix a bug, or change the behavior, in one place.",
      codeExample: 'function greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("Rivo"));',
      language: "javascript",
      syntax: "function functionName(parameter1, parameter2) {\n  // code\n  return value;\n}",
      examples: [
        {
          heading: "A function with no parameters",
          code: 'function sayHi() {\n  console.log("Hi there!");\n}\nsayHi();',
          language: "javascript",
        },
      ],
      note: "A function that doesn't explicitly return anything returns undefined by default.",
      exercisePrompt: "Write a function square(n) that returns n multiplied by itself.",
    },
    {
      heading: "Parameters and Return Values",
      explanation:
        "Parameters are placeholders for input values. return sends a result back to wherever the function was called.\n\nAs soon as return runs, the function stops immediately — any code written after it in the same block never executes.",
      codeExample: "function add(a, b) {\n  return a + b;\n}\nconst total = add(4, 7);\nconsole.log(total);",
      language: "javascript",
      syntax: "function name(param1, param2) {\n  return param1 + param2;\n}",
      examples: [
        {
          heading: "Default parameter values",
          code: 'function greet(name = "friend") {\n  return "Hi, " + name;\n}\nconsole.log(greet());',
          language: "javascript",
          note: "A default value is used only when the argument is omitted entirely, or passed as undefined.",
        },
      ],
      exercisePrompt: "Write a function that takes three numbers and returns their average.",
    },
    {
      heading: "Arrow Functions",
      explanation:
        "Arrow functions are a shorter syntax for writing functions, especially handy for short, one-line logic.\n\nWhen the function body is a single expression, you can even drop the curly braces and the return keyword — the expression's value is returned automatically.",
      codeExample: "const multiply = (a, b) => a * b;\nconsole.log(multiply(6, 7));",
      language: "javascript",
      syntax: "const name = (param1, param2) => expression;",
      examples: [
        {
          heading: "Arrow function with a full body",
          code: 'const describe = (n) => {\n  const kind = n % 2 === 0 ? "even" : "odd";\n  return n + " is " + kind;\n};\nconsole.log(describe(4));',
          language: "javascript",
          note: "Once you add curly braces, you need an explicit return statement again, just like a regular function.",
        },
      ],
      exercisePrompt: "Rewrite the greet function from the first lesson as an arrow function.",
    },
    {
      heading: "Scope",
      explanation:
        "Variables declared inside a function only exist inside that function, which is called local scope. Variables declared outside are global.\n\nThis isolation is a feature: it means two different functions can each safely use a variable named total without interfering with each other.",
      codeExample: "let outside = \"I am global\";\nfunction show() {\n  let inside = \"I am local\";\n  console.log(outside, inside);\n}\nshow();",
      language: "javascript",
      syntax: "function outer() {\n  let local = 1; // only visible inside outer()\n}",
      examples: [
        {
          heading: "Block scope with let",
          code: 'if (true) {\n  let blockScoped = "only visible here";\n  console.log(blockScoped);\n}',
          language: "javascript",
          note: "let and const are scoped to the nearest set of curly braces, not just to functions — this includes if blocks and loops.",
        },
      ],
      exercisePrompt: "Predict and then test what happens if you try to log the inside variable outside the function.",
    },
  ],
  Arrays: [
    {
      heading: "Creating and Accessing Arrays",
      explanation: "Arrays store ordered lists of values, accessed by a zero-based index.\n\nBecause indexing starts at 0, the last item in an array sits at index length - 1, not at index length — a classic off-by-one spot to double check.",
      codeExample: 'const colors = ["red", "green", "blue"];\nconsole.log(colors[0], colors.length);',
      language: "javascript",
      syntax: "const arrayName = [item1, item2, item3];\narrayName[index]",
      examples: [
        {
          heading: "Accessing the last item safely",
          code: 'const colors = ["red", "green", "blue"];\nconsole.log(colors[colors.length - 1]);',
          language: "javascript",
          note: "colors.length - 1 always points to the last element, no matter how long the array is.",
        },
      ],
      exercisePrompt: "Create an array of 5 numbers and log the last one using its index.",
    },
    {
      heading: "Array Methods: push, pop, map",
      explanation:
        "push and pop add or remove items from the end of an array. map creates a new array by transforming each item.\n\nUnlike push and pop, map never changes the original array — it always returns a brand new one, which makes it safer to use when other code still relies on the original.",
      codeExample: "const nums = [1, 2, 3];\nnums.push(4);\nconst doubled = nums.map((n) => n * 2);\nconsole.log(doubled);",
      language: "javascript",
      syntax: "array.push(item)\narray.pop()\narray.map((item) => transformedItem)",
      examples: [
        {
          heading: "unshift and shift for the front of the array",
          code: 'const nums = [2, 3];\nnums.unshift(1);\nconsole.log(nums);\nnums.shift();\nconsole.log(nums);',
          language: "javascript",
          note: "unshift adds to the start and shift removes from the start — the mirror image of push and pop.",
        },
      ],
      exercisePrompt: "Use map to turn an array of names into an array of greeting strings.",
    },
    {
      heading: "filter and reduce",
      explanation:
        "filter keeps only the items that pass a test. reduce combines all items in an array into a single value.\n\nreduce is the most flexible of the three — sum, count, and even map or filter can technically be built out of reduce, though the dedicated methods usually read more clearly.",
      codeExample: "const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter((n) => n % 2 === 0);\nconst sum = nums.reduce((total, n) => total + n, 0);\nconsole.log(evens, sum);",
      language: "javascript",
      syntax: "array.filter((item) => condition)\narray.reduce((accumulator, item) => newAccumulator, startValue)",
      examples: [
        {
          heading: "Finding one item with find",
          code: 'const users = [{ id: 1 }, { id: 2 }];\nconst match = users.find((u) => u.id === 2);\nconsole.log(match);',
          language: "javascript",
          note: "find returns the first matching item itself (or undefined), not an array — different from filter, which always returns an array.",
        },
      ],
      exercisePrompt: "Use filter to get numbers greater than 10 from an array, then reduce to sum them.",
    },
  ],
  Objects: [
    {
      heading: "Object Basics",
      explanation: "Objects store data as key-value pairs, which makes them great for representing real-world things.\n\nKeys are usually written without quotes when they're valid identifiers, but you can always fall back to bracket notation, especially for keys with spaces or that are stored in a variable.",
      codeExample: 'const student = { name: "Alex", age: 20, city: "Tashkent" };\nconsole.log(student.name, student["age"]);',
      language: "javascript",
      syntax: "const objectName = {\n  key1: value1,\n  key2: value2,\n};",
      examples: [
        {
          heading: "Adding and deleting properties",
          code: 'const student = { name: "Alex" };\nstudent.age = 20;\ndelete student.age;\nconsole.log(student);',
          language: "javascript",
        },
      ],
      exercisePrompt: "Create an object representing a course with title, level, and duration properties.",
    },
    {
      heading: "Methods and this",
      explanation:
        "Functions stored inside objects are called methods. The this keyword refers to the object the method belongs to.\n\nthis is determined by how a function is called, not where it's defined — calling person.greet() sets this to person, but copying that same function elsewhere can change what this refers to.",
      codeExample: 'const person = {\n  name: "Alex",\n  greet() {\n    return "Hi, I am " + this.name;\n  },\n};\nconsole.log(person.greet());',
      language: "javascript",
      syntax: "const objectName = {\n  methodName() {\n    return this.someProperty;\n  },\n};",
      examples: [
        {
          heading: "Arrow functions don't get their own this",
          code: 'const person = {\n  name: "Alex",\n  greet: () => "Hi, I am " + this.name,\n};\nconsole.log(person.greet());',
          language: "javascript",
          note: "An arrow function method inherits this from its surrounding scope instead of the object, which is why regular methods use this more predictably.",
        },
      ],
      exercisePrompt: "Add a method to the student object that returns a formatted introduction sentence.",
    },
    {
      heading: "Destructuring",
      explanation:
        "Destructuring pulls values out of objects, or arrays, into their own variables in a single line.\n\nIt's especially common in function parameters, letting a function accept an object and immediately unpack just the fields it needs.",
      codeExample: 'const student = { name: "Alex", age: 20 };\nconst { name, age } = student;\nconsole.log(name, age);',
      language: "javascript",
      syntax: "const { key1, key2 } = objectName;\nconst [first, second] = arrayName;",
      examples: [
        {
          heading: "Destructuring in a function parameter",
          code: 'function introduce({ name, age }) {\n  return name + " is " + age;\n}\nconsole.log(introduce({ name: "Alex", age: 20 }));',
          language: "javascript",
        },
      ],
      exercisePrompt: "Destructure title and level from a course object and log them.",
    },
  ],
  DOM: [
    {
      heading: "What is the DOM?",
      explanation:
        "The DOM is the browser's live representation of your HTML page as a tree of objects that JavaScript can read and change.\n\nBecause it's live, changes you make through JavaScript show up on the page immediately — the DOM isn't a static copy of your HTML, it IS what the browser is currently displaying.",
      codeExample: "console.log(document.title);",
      language: "javascript",
      syntax: "document.title\ndocument.body\ndocument.documentElement",
      examples: [
        {
          heading: "The DOM as a tree",
          code: "// <html>\n//   <body>\n//     <h1>Title</h1>\n//     <p>Text</p>\n//   </body>\n// </html>\n// Each tag becomes a connected \"node\" JavaScript can reach.",
          language: "javascript",
        },
      ],
      exercisePrompt: "Log document.title in your own browser console and see what you get.",
    },
    {
      heading: "Selecting Elements",
      explanation:
        "document.querySelector and getElementById find elements on the page so you can read or update them.\n\nquerySelector accepts any valid CSS selector, so the same syntax you already use for styling — .class, #id, tag names — also works for finding elements in JavaScript.",
      codeExample: 'const heading = document.querySelector("h1");\nconsole.log(heading);',
      language: "javascript",
      syntax: 'document.querySelector("selector")\ndocument.querySelectorAll("selector")\ndocument.getElementById("id")',
      examples: [
        {
          heading: "Selecting multiple elements",
          code: 'const cards = document.querySelectorAll(".card");\nconsole.log(cards.length);',
          language: "javascript",
          note: "querySelectorAll returns a NodeList of every match, while querySelector only returns the first one it finds.",
        },
      ],
      exercisePrompt: "Describe, in a comment, how you would select every element with the class \"card\".",
    },
    {
      heading: "Changing Content and Styles",
      explanation:
        "Once selected, you can change an element's text with textContent and its appearance with the style property.\n\ntextContent is safer than innerHTML for plain text, since it never interprets the string as HTML — avoiding a common security pitfall when the text comes from user input.",
      codeExample: 'const box = document.querySelector(".box");\nbox.textContent = "Updated!";\nbox.style.color = "green";',
      language: "javascript",
      syntax: "element.textContent = \"new text\";\nelement.style.property = \"value\";\nelement.classList.add(\"className\");",
      examples: [
        {
          heading: "Toggling a CSS class instead",
          code: 'const box = document.querySelector(".box");\nbox.classList.toggle("active");',
          language: "javascript",
          note: "Toggling a class defined in your CSS is usually cleaner than setting inline styles one property at a time.",
        },
      ],
      exercisePrompt: "Write code that changes a paragraph's text and makes it bold.",
    },
    {
      heading: "Handling Events",
      explanation:
        "addEventListener lets your code react when a user clicks, types, or otherwise interacts with the page.\n\nYou can attach multiple listeners to the same element and the same event without them overwriting each other, unlike setting element.onclick directly.",
      codeExample: 'const button = document.querySelector("button");\nbutton.addEventListener("click", () => {\n  console.log("Button clicked!");\n});',
      language: "javascript",
      syntax: 'element.addEventListener("eventType", callbackFunction);',
      examples: [
        {
          heading: "Reading input as the user types",
          code: 'const input = document.querySelector("input");\ninput.addEventListener("input", (e) => {\n  console.log(e.target.value);\n});',
          language: "javascript",
          note: "The event object passed to the callback (often named e) carries details about what happened, including e.target — the element the event fired on.",
        },
      ],
      exercisePrompt: "Write an event listener that logs a message when a button with id \"submit\" is clicked.",
    },
  ],
  "Async JavaScript": [
    {
      heading: "Callbacks and setTimeout",
      explanation:
        "JavaScript can schedule code to run later without blocking everything else, and setTimeout is the simplest example.\n\nThis non-blocking behavior is what lets a web page stay responsive to clicks and scrolling even while something slow, like a network request, is still in progress.",
      codeExample: 'console.log("Start");\nsetTimeout(() => console.log("This runs later"), 1000);\nconsole.log("End");',
      language: "javascript",
      syntax: "setTimeout(callbackFunction, delayInMilliseconds);",
      examples: [
        {
          heading: "Repeating with setInterval",
          code: 'let count = 0;\nconst id = setInterval(() => {\n  count++;\n  console.log(count);\n  if (count === 3) clearInterval(id);\n}, 1000);',
          language: "javascript",
          note: "clearInterval stops a repeating setInterval — without it, the callback would keep firing forever.",
        },
      ],
      exercisePrompt: "Predict the console output order before running the code above.",
    },
    {
      heading: "Promises",
      explanation:
        "A Promise represents a value that will be available now, later, or never. then() handles success and catch() handles failure.\n\nA Promise is always in one of three states — pending, fulfilled, or rejected — and once it settles into fulfilled or rejected, it never changes state again.",
      codeExample: 'const fetchData = new Promise((resolve) => {\n  setTimeout(() => resolve("Data loaded"), 500);\n});\nfetchData.then((data) => console.log(data));',
      language: "javascript",
      syntax: "new Promise((resolve, reject) => {\n  // resolve(value) on success\n  // reject(error) on failure\n})\n  .then((value) => {})\n  .catch((error) => {});",
      examples: [
        {
          heading: "Handling a rejected Promise",
          code: 'const risky = new Promise((resolve, reject) => {\n  reject(new Error("Something failed"));\n});\nrisky.catch((error) => console.log(error.message));',
          language: "javascript",
        },
      ],
      exercisePrompt: "Write a Promise that resolves with your name after 1 second.",
    },
    {
      heading: "async/await",
      explanation:
        "async and await are modern syntax that make asynchronous code read like regular, top-to-bottom code.\n\nUnder the hood it's still Promises — await simply pauses the function until the Promise settles, which is why await can only be used inside a function marked async.",
      codeExample: 'async function loadData() {\n  const data = await Promise.resolve("Loaded!");\n  console.log(data);\n}\nloadData();',
      language: "javascript",
      syntax: "async function name() {\n  const result = await somePromise;\n}",
      examples: [
        {
          heading: "try/catch with await",
          code: 'async function loadData() {\n  try {\n    const data = await Promise.reject("Failed");\n  } catch (error) {\n    console.log("Caught:", error);\n  }\n}\nloadData();',
          language: "javascript",
          note: "try/catch works with await exactly like it does with regular synchronous code that might throw.",
        },
      ],
      exercisePrompt: "Convert the Promise from the previous lesson into an async function using await.",
    },
  ],
  "Error Handling": [
    {
      heading: "try, catch, and finally",
      explanation:
        "Wrapping risky code in a try block lets you catch errors gracefully instead of crashing the whole program. finally always runs, whether an error happened or not.\n\nOnly code inside the try block is protected — an error thrown asynchronously later, like inside a setTimeout callback, won't be caught by a try/catch wrapped around the setTimeout call itself.",
      codeExample: 'try {\n  const data = JSON.parse("not valid json");\n  console.log(data);\n} catch (error) {\n  console.log("Something went wrong:", error.message);\n} finally {\n  console.log("Done attempting to parse.");\n}',
      language: "javascript",
      syntax: "try {\n  // risky code\n} catch (error) {\n  // handle the error\n} finally {\n  // always runs\n}",
      examples: [
        {
          heading: "Inspecting the error object",
          code: 'try {\n  null.someMethod();\n} catch (error) {\n  console.log(error.name, "-", error.message);\n}',
          language: "javascript",
        },
      ],
      exercisePrompt: "Wrap a line that intentionally throws (like calling a function that doesn't exist) in try/catch and log a friendly message instead of letting it crash.",
    },
    {
      heading: "Throwing Your Own Errors",
      explanation:
        "The throw keyword lets your own functions signal that something went wrong, using the built-in Error object or a custom message.\n\nThrowing immediately stops the current function, unwinding up the call stack until a matching catch block handles it — or, if none exists, crashing the program.",
      codeExample: 'function withdraw(balance, amount) {\n  if (amount > balance) {\n    throw new Error("Insufficient funds");\n  }\n  return balance - amount;\n}\n\ntry {\n  withdraw(50, 100);\n} catch (error) {\n  console.log(error.message);\n}',
      language: "javascript",
      syntax: 'throw new Error("message");',
      examples: [
        {
          heading: "Custom error types",
          code: 'class ValidationError extends Error {}\n\ntry {\n  throw new ValidationError("Invalid input");\n} catch (error) {\n  console.log(error instanceof ValidationError);\n}',
          language: "javascript",
          note: "Extending Error lets you create custom error types that can be identified with instanceof, useful when different errors need different handling.",
        },
      ],
      exercisePrompt: "Write a function divide(a, b) that throws an Error when b is 0, then call it inside a try/catch.",
    },
    {
      heading: "Handling Errors in Async Code",
      explanation:
        "try/catch also works with await, and Promises have their own .catch() method — both let you handle failures from asynchronous operations cleanly.\n\nAn unhandled rejected Promise doesn't crash Node.js or the browser immediately the way a thrown synchronous error does, but it will log a warning and is worth catching explicitly.",
      codeExample: 'async function loadUser() {\n  try {\n    const response = await fetch("/api/user");\n    const user = await response.json();\n    console.log(user);\n  } catch (error) {\n    console.log("Failed to load user:", error.message);\n  }\n}',
      language: "javascript",
      syntax: "async function name() {\n  try {\n    await somePromise;\n  } catch (error) {}\n}",
      examples: [
        {
          heading: "Chaining .catch() without async/await",
          code: 'fetch("/api/user")\n  .then((res) => res.json())\n  .catch((error) => console.log("Failed:", error.message));',
          language: "javascript",
        },
      ],
      exercisePrompt: "Write an async function that awaits a rejected Promise inside a try/catch and logs a fallback message.",
    },
  ],
  "Working with JSON": [
    {
      heading: "What is JSON?",
      explanation:
        "JSON (JavaScript Object Notation) is a lightweight, text-based format for representing data. It's the standard way APIs send and receive structured data on the web.\n\nDespite the name, JSON is language-independent — nearly every programming language has a library for reading and writing it, which is exactly why it became the universal format for web APIs.",
      codeExample: '{\n  "name": "Alex",\n  "age": 20,\n  "isStudent": true\n}',
      language: "json",
      syntax: '{\n  "key": "value",\n  "number": 42,\n  "array": [1, 2, 3]\n}',
      examples: [
        {
          heading: "Nested JSON",
          code: '{\n  "name": "Alex",\n  "address": {\n    "city": "Tashkent"\n  }\n}',
          language: "json",
          note: "JSON object keys must always be wrapped in double quotes — single quotes and unquoted keys are valid in JavaScript objects, but not in strict JSON.",
        },
      ],
      exercisePrompt: "Write a small JSON object describing a course, with title, level, and totalLessons fields.",
    },
    {
      heading: "Converting Objects to JSON with stringify",
      explanation:
        "JSON.stringify() turns a JavaScript object into a JSON string, which is what you send over the network or save to a file.\n\nAny value that isn't representable in JSON — like a function, undefined, or a Symbol — is simply dropped when it's a property value during stringify.",
      codeExample: 'const student = { name: "Alex", age: 20 };\nconst json = JSON.stringify(student);\nconsole.log(json);',
      language: "javascript",
      syntax: "JSON.stringify(value)\nJSON.stringify(value, null, 2) // pretty-printed",
      examples: [
        {
          heading: "Pretty-printing with indentation",
          code: 'const student = { name: "Alex", age: 20 };\nconsole.log(JSON.stringify(student, null, 2));',
          language: "javascript",
          note: "The third argument to stringify controls indentation, which is handy when logging JSON for a human to read.",
        },
      ],
      exercisePrompt: "Stringify an object representing your favorite course, then log both the object and the string to compare them.",
    },
    {
      heading: "Parsing JSON with parse",
      explanation:
        "JSON.parse() does the reverse — it turns a JSON string back into a real JavaScript object you can work with, including nested objects and arrays.\n\nParsing invalid JSON throws a SyntaxError, so real code that parses external data (like an API response) usually wraps JSON.parse in a try/catch.",
      codeExample: 'const json = \'{"name":"Alex","skills":["JS","CSS"]}\';\nconst data = JSON.parse(json);\nconsole.log(data.name, data.skills[0]);',
      language: "javascript",
      syntax: "JSON.parse(jsonString)",
      examples: [
        {
          heading: "Safely parsing with try/catch",
          code: 'try {\n  const data = JSON.parse("not valid json");\n} catch (error) {\n  console.log("Invalid JSON received");\n}',
          language: "javascript",
        },
      ],
      exercisePrompt: "Parse a JSON string containing a nested array, then log one item from that array.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning Your Project",
      explanation:
        "Before writing code, sketch what your project does, what data it needs, and which functions you will build.\n\nSpending ten minutes planning on paper, or in comments, before touching real code usually saves far more than ten minutes of confused rewriting later.",
      codeExample: "// Project: Simple grade calculator\n// Input: array of scores\n// Output: average and letter grade",
      language: "javascript",
      syntax: "// Plan template:\n// Input: what data comes in\n// Process: what functions transform it\n// Output: what the user sees",
      exercisePrompt: "Write your own project plan as comments for a small app of your choice.",
    },
    {
      heading: "Building and Testing",
      explanation:
        "Combine variables, functions, conditions, and loops from this course into one working program, then test it with different inputs.\n\nTesting a few edge cases on purpose — an empty array, a negative number, an unusually large input — catches far more bugs than only testing the input you expect.",
      codeExample: "function average(scores) {\n  const total = scores.reduce((sum, s) => sum + s, 0);\n  return total / scores.length;\n}\nconsole.log(average([80, 90, 100]));",
      language: "javascript",
      examples: [
        {
          heading: "Guarding against an empty array",
          code: 'function average(scores) {\n  if (scores.length === 0) return 0;\n  return scores.reduce((sum, s) => sum + s, 0) / scores.length;\n}',
          language: "javascript",
          note: "Without this guard, average([]) would divide by zero and return NaN instead of a sensible default.",
        },
      ],
      exercisePrompt: "Extend the average function to also return a letter grade based on the result.",
    },
  ],
};

const htmlCss: SectionContent = {
  "Document Structure": [
    {
      heading: "The HTML Skeleton",
      explanation:
        "Every HTML page starts with a doctype, then html, head, and body tags. The head holds metadata and the body holds visible content.\n\nThe doctype isn't a tag in the usual sense — it's a signal that tells the browser to render the page in modern standards mode instead of an old quirks mode meant for compatibility with ancient pages.",
      codeExample: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>",
      language: "html",
      syntax: "<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>",
      examples: [
        {
          heading: "Adding a language and charset",
          code: '<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>My Page</title>\n  </head>\n</html>',
          language: "html",
          note: "lang helps screen readers and translators, and charset=\"UTF-8\" ensures special characters display correctly.",
        },
      ],
      exercisePrompt: "Write a minimal HTML page with your name as the title and a heading that says Welcome.",
    },
    {
      heading: "Common Tags",
      explanation:
        "Tags like p, h1 through h6, a, and img structure text, headings, links, and images on a page.\n\nHeadings should be used in order (one h1, then h2s under it, and so on) rather than picked for their default size — skipping levels confuses both screen readers and search engines.",
      codeExample: '<h1>RivoCode</h1>\n<p>Learn to code with short, hands-on lessons.</p>\n<a href="/courses">Browse courses</a>',
      language: "html",
      syntax: '<h1>Heading</h1>\n<p>Paragraph text</p>\n<a href="url">Link text</a>\n<img src="image.jpg" alt="description" />',
      examples: [
        {
          heading: "Images need an alt attribute",
          code: '<img src="logo.png" alt="RivoCode logo" />',
          language: "html",
          note: "alt text describes the image for screen readers and shows up if the image fails to load — never leave it out.",
        },
      ],
      exercisePrompt: "Write a small page with a heading, a paragraph, and a link to a website you like.",
    },
    {
      heading: "Semantic HTML",
      explanation:
        "Tags like header, nav, main, and footer describe what content means, not just how it looks, which helps accessibility and SEO.\n\nA screen reader user can jump straight to <main> or <nav> by name — something that's impossible when every section of a page is just an unlabeled <div>.",
      codeExample: "<header><h1>My Site</h1></header>\n<main><p>Main content goes here.</p></main>\n<footer><p>2026</p></footer>",
      language: "html",
      syntax: "<header>...</header>\n<nav>...</nav>\n<main>...</main>\n<footer>...</footer>",
      examples: [
        {
          heading: "A semantic article and section",
          code: "<article>\n  <h2>Post title</h2>\n  <section>\n    <p>Post content...</p>\n  </section>\n</article>",
          language: "html",
        },
      ],
      exercisePrompt: "Rewrite a page using semantic tags instead of generic div elements.",
    },
  ],
  "Text & Typography": [
    {
      heading: "Text Formatting Tags",
      explanation:
        "strong, em, br, and span let you emphasize or format inline text without breaking the flow of a paragraph.\n\nstrong and em carry semantic meaning (importance and emphasis), which is why screen readers announce them differently — use CSS font-weight or font-style instead if you only want the visual look without the meaning.",
      codeExample: "<p>This is <strong>important</strong> and this is <em>emphasized</em>.</p>",
      language: "html",
      syntax: "<strong>important text</strong>\n<em>emphasized text</em>\n<span>generic inline text</span>",
      examples: [
        {
          heading: "A line break vs a new paragraph",
          code: "<p>Line one<br />Line two</p>\n<p>A separate paragraph</p>",
          language: "html",
          note: "br forces a line break inside the same paragraph, while a new <p> starts an entirely separate block with its own spacing.",
        },
      ],
      exercisePrompt: "Write a paragraph using both strong and em tags at least once each.",
    },
    {
      heading: "Styling Fonts with CSS",
      explanation:
        "font-family, font-size, and font-weight control how text looks. line-height controls spacing between lines.\n\nListing several fonts in font-family, separated by commas, gives the browser fallbacks to try in order if the first choice isn't available on the user's device.",
      codeExample: "p {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n}",
      language: "css",
      syntax: "selector {\n  font-family: \"Font Name\", fallback;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 1.5;\n}",
      examples: [
        {
          heading: "Numeric font-weight values",
          code: "h1 {\n  font-weight: 700; /* same as bold */\n}\np {\n  font-weight: 400; /* same as normal */\n}",
          language: "css",
        },
      ],
      exercisePrompt: "Style a heading with a custom font-family and a larger font-size.",
    },
    {
      heading: "Color and Text Alignment",
      explanation:
        "The color property sets text color, and text-align controls horizontal alignment such as left, center, or right.\n\nColors can be written as names, hex codes, or rgb()/hsl() functions — hex and hsl are the most common in real projects since they're precise and easy to adjust.",
      codeExample: "h1 {\n  color: #04aa6d;\n  text-align: center;\n}",
      language: "css",
      syntax: "selector {\n  color: #hexcode;\n  text-align: left | center | right | justify;\n}",
      examples: [
        {
          heading: "Using rgba for transparency",
          code: "p {\n  color: rgba(0, 0, 0, 0.7);\n}",
          language: "css",
          note: "The fourth value in rgba is alpha (opacity), from 0 (invisible) to 1 (fully opaque).",
        },
      ],
      exercisePrompt: "Center-align a heading and give it an accent color of your choice.",
    },
  ],
  "The Box Model": [
    {
      heading: "Understanding the Box Model",
      explanation:
        "Every element is a box made of content, padding, border, and margin, counted from the inside out.\n\nPadding adds space inside the border (and gets the element's background color), while margin adds space outside the border and is always transparent.",
      codeExample: ".card {\n  padding: 16px;\n  border: 1px solid #ccc;\n  margin: 12px;\n}",
      language: "css",
      syntax: ".selector {\n  padding: 16px;\n  border: 1px solid color;\n  margin: 12px;\n}",
      examples: [
        {
          heading: "Different values per side",
          code: ".card {\n  padding: 10px 20px; /* top/bottom 10px, left/right 20px */\n  margin: 8px 0 8px 0; /* top right bottom left */\n}",
          language: "css",
          note: "The four-value shorthand always goes clockwise: top, right, bottom, left.",
        },
      ],
      exercisePrompt: "Create a box with 20px padding, a 2px border, and 10px margin.",
    },
    {
      heading: "Width, Height, and Box-Sizing",
      explanation:
        "box-sizing: border-box makes width and height include padding and border, which avoids a lot of layout surprises.\n\nWithout border-box (the default, content-box), padding and border are added on top of the width you set, so a 200px box with 20px padding actually takes up 240px — which trips up almost every beginner at least once.",
      codeExample: ".box {\n  width: 200px;\n  padding: 20px;\n  box-sizing: border-box;\n}",
      language: "css",
      syntax: "* {\n  box-sizing: border-box;\n}",
      examples: [
        {
          heading: "Applying border-box globally",
          code: "*, *::before, *::after {\n  box-sizing: border-box;\n}",
          language: "css",
          note: "Most real-world stylesheets apply border-box to every element up front, right at the top of the CSS file.",
        },
      ],
      exercisePrompt: "Compare how a 200px box looks with and without box-sizing: border-box.",
    },
    {
      heading: "Backgrounds and Borders",
      explanation:
        "background-color, background-image, and border-radius let you style a box's fill and corners.\n\nborder-radius can take a single value for uniform corners, or up to four values to round each corner independently — a value of 50% on a square element makes it a perfect circle.",
      codeExample: ".card {\n  background-color: #e7f8f1;\n  border-radius: 12px;\n}",
      language: "css",
      syntax: ".selector {\n  background-color: color;\n  background-image: url(\"image.jpg\");\n  border-radius: 12px;\n}",
      examples: [
        {
          heading: "A circular avatar",
          code: ".avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n}",
          language: "css",
        },
      ],
      exercisePrompt: "Style a card with a soft background color and rounded corners.",
    },
  ],
  Flexbox: [
    {
      heading: "Introducing Flexbox",
      explanation:
        "Setting display: flex turns a container's children into a flexible row, or column, that is easy to align and space.\n\nOnce a container is flex, its direct children become \"flex items\" that automatically arrange themselves in a row by default, without needing floats or manual positioning.",
      codeExample: ".row {\n  display: flex;\n  gap: 12px;\n}",
      language: "css",
      syntax: ".selector {\n  display: flex;\n  gap: 12px;\n}",
      examples: [
        {
          heading: "Letting an item grow to fill space",
          code: ".sidebar { flex: 0 0 200px; }\n.main { flex: 1; }",
          language: "css",
          note: "flex: 1 tells an item to grow and take up any remaining space, which is how flexible sidebar/main layouts are built.",
        },
      ],
      exercisePrompt: "Put three boxes in a flex row with a 16px gap between them.",
    },
    {
      heading: "justify-content and align-items",
      explanation:
        "justify-content controls spacing along the main axis, and align-items controls alignment along the cross axis.\n\nBy default the main axis is horizontal (a row), so justify-content controls left-right spacing and align-items controls top-bottom alignment — both flip if flex-direction is column.",
      codeExample: ".row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
      language: "css",
      syntax: ".selector {\n  justify-content: flex-start | center | space-between | space-around;\n  align-items: flex-start | center | flex-end | stretch;\n}",
      examples: [
        {
          heading: "Perfectly centering one item",
          code: ".center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 300px;\n}",
          language: "css",
          note: "This two-line combination is the classic Flexbox trick for centering anything, both horizontally and vertically.",
        },
      ],
      exercisePrompt: "Center three items both horizontally and vertically in a flex container.",
    },
    {
      heading: "flex-direction and Wrapping",
      explanation:
        "flex-direction: column stacks items vertically, and flex-wrap lets items move to a new line instead of overflowing.\n\nBy default flex-wrap is nowrap, which shrinks items to fit on one line — setting it to wrap instead lets extra items flow onto new rows, which is essential for responsive card grids.",
      codeExample: ".row {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n}",
      language: "css",
      syntax: ".selector {\n  flex-direction: row | column;\n  flex-wrap: nowrap | wrap;\n}",
      examples: [
        {
          heading: "The flex-flow shorthand",
          code: ".row {\n  display: flex;\n  flex-flow: row wrap;\n}",
          language: "css",
          note: "flex-flow combines flex-direction and flex-wrap into one property.",
        },
      ],
      exercisePrompt: "Build a flex container that switches from a row to a column layout.",
    },
    {
      heading: "Building a Navbar with Flexbox",
      explanation:
        "A classic use case is a logo on the left and nav links on the right, all aligned with one flex container.\n\nThis single pattern — display: flex plus justify-content: space-between — covers a huge share of real navbars, toolbars, and header layouts you'll build.",
      codeExample: '<nav class="nav">\n  <span>Logo</span>\n  <div class="links">Home About Contact</div>\n</nav>\n\n.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
      language: "html",
      syntax: ".nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
      examples: [
        {
          heading: "Spacing the nav links themselves",
          code: ".links {\n  display: flex;\n  gap: 20px;\n}",
          language: "css",
        },
      ],
      exercisePrompt: "Build a simple navbar with a logo on the left and three links on the right.",
    },
  ],
  "Grid Layout": [
    {
      heading: "Introducing CSS Grid",
      explanation: "Setting display: grid turns a container into a two-dimensional layout system of rows and columns.\n\nUnlike Flexbox, which mainly thinks in one direction at a time, Grid lets you define an entire layout's rows and columns together up front, then place items into that structure.",
      codeExample: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}",
      language: "css",
      syntax: ".selector {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}",
      examples: [
        {
          heading: "Mixing fixed and flexible columns",
          code: ".layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n}",
          language: "css",
          note: "fr units share the remaining space proportionally, so 1fr next to a fixed 200px column simply fills whatever space is left.",
        },
      ],
      exercisePrompt: "Create a 3-column grid with equal-width columns and a 16px gap.",
    },
    {
      heading: "Grid Template Areas",
      explanation:
        "grid-template-areas lets you name regions of your layout and place elements into them by name.\n\nBecause the CSS literally looks like a visual map of the layout, grid-template-areas is often the easiest way to read and reason about a page's overall structure at a glance.",
      codeExample: '.layout {\n  display: grid;\n  grid-template-areas: "header header" "sidebar main";\n}',
      language: "css",
      syntax: '.layout {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar main";\n}\n.header { grid-area: header; }',
      examples: [
        {
          heading: "Assigning elements to named areas",
          code: ".header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }",
          language: "css",
        },
      ],
      exercisePrompt: "Sketch a grid-template-areas layout for a page with a header, sidebar, and main content.",
    },
    {
      heading: "Responsive Grids with auto-fit",
      explanation:
        "repeat(auto-fit, minmax(200px, 1fr)) creates a grid that automatically adds or removes columns based on available space.\n\nThis single line replaces what would otherwise require several media queries — the browser recalculates the column count itself as the container resizes.",
      codeExample: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}",
      language: "css",
      syntax: ".selector {\n  grid-template-columns: repeat(auto-fit, minmax(minSize, 1fr));\n}",
      examples: [
        {
          heading: "auto-fill vs auto-fit",
          code: "/* auto-fill leaves empty tracks if there aren't enough items */\n/* auto-fit collapses empty tracks so items stretch to fill space */",
          language: "css",
          note: "With few items, auto-fit stretches them to fill the row, while auto-fill leaves gaps as if more items were coming.",
        },
      ],
      exercisePrompt: "Build a card grid that reflows from 3 columns down to 1 as the screen narrows.",
    },
    {
      heading: "Grid vs Flexbox",
      explanation:
        "Use Flexbox for one-dimensional layouts such as a single row or column. Use Grid when you need to control rows and columns together.\n\nIn practice, most real pages use both: Grid for the overall page skeleton, and Flexbox for aligning content inside smaller components like a card or a navbar.",
      codeExample: "/* Flexbox: one direction */\n.row { display: flex; }\n\n/* Grid: two directions */\n.grid { display: grid; grid-template-columns: repeat(2, 1fr); }",
      language: "css",
      exercisePrompt: "Decide whether Flexbox or Grid fits a photo gallery best, and explain why in a comment.",
    },
  ],
  "Responsive Design": [
    {
      heading: "Media Queries",
      explanation:
        "media rules apply CSS only when conditions like screen width are met, which is the foundation of responsive design.\n\nCommon breakpoints tend to cluster around typical device widths — roughly 480px for phones, 768px for tablets, and 1024px+ for desktops — though the right breakpoint is really wherever your own layout starts to look cramped.",
      codeExample: ".container {\n  width: 100%;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n    margin: 0 auto;\n  }\n}",
      language: "css",
      syntax: "@media (min-width: 768px) {\n  .selector {\n    /* styles for wider screens */\n  }\n}",
      examples: [
        {
          heading: "A max-width query for small screens only",
          code: "@media (max-width: 600px) {\n  .nav { flex-direction: column; }\n}",
          language: "css",
        },
      ],
      exercisePrompt: "Write a media query that changes text color on screens narrower than 600px.",
    },
    {
      heading: "Mobile-First Design",
      explanation:
        "Writing base styles for small screens first, then adding complexity with min-width media queries, keeps mobile experiences fast and simple.\n\nThis approach also matches how most real traffic works today, since more visits to most sites come from phones than from desktops.",
      codeExample: ".card {\n  padding: 12px;\n}\n@media (min-width: 900px) {\n  .card {\n    padding: 24px;\n  }\n}",
      language: "css",
      syntax: ".selector {\n  /* mobile styles here, unwrapped */\n}\n@media (min-width: 900px) {\n  .selector {\n    /* enhancements for larger screens */\n  }\n}",
      exercisePrompt: "Rewrite a component's CSS mobile-first, starting with the smallest screen.",
    },
    {
      heading: "Responsive Images",
      explanation: "max-width: 100% keeps images from overflowing their container on any screen size.\n\ndisplay: block also removes the small default gap that appears under inline images, which otherwise shows up as unexplained extra space beneath a picture.",
      codeExample: "img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}",
      language: "css",
      syntax: "img {\n  max-width: 100%;\n  height: auto;\n}",
      exercisePrompt: "Make an image responsive so it never overflows its parent container.",
    },
  ],
  "Forms & Inputs": [
    {
      heading: "Building a Basic Form",
      explanation:
        "A form groups related inputs together. label connects descriptive text to an input, and button (or an input of type submit) triggers submission.\n\nClicking a label whose for attribute matches an input's id automatically focuses that input — a small but important usability and accessibility win.",
      codeExample: '<form>\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" />\n  <button type="submit">Sign up</button>\n</form>',
      language: "html",
      syntax: '<form>\n  <label for="id">Label</label>\n  <input type="text" id="id" name="name" />\n  <button type="submit">Submit</button>\n</form>',
      exercisePrompt: "Build a form with a labeled text input for a username and a submit button.",
    },
    {
      heading: "Input Types and Attributes",
      explanation:
        "Changing type gives you checkboxes, radio buttons, dates, and more — each with built-in browser behavior. placeholder, required, and disabled fine-tune how an input behaves.\n\nRadio buttons only behave as a mutually exclusive group when they share the same name attribute — different names create independent, unrelated buttons.",
      codeExample: '<input type="checkbox" id="agree" required />\n<input type="radio" name="plan" value="free" checked />\n<input type="text" placeholder="Your name" required />',
      language: "html",
      syntax: '<input type="text | email | checkbox | radio | date" name="field" required />',
      examples: [
        {
          heading: "A grouped set of radio buttons",
          code: '<input type="radio" name="plan" value="free" /> Free\n<input type="radio" name="plan" value="pro" /> Pro',
          language: "html",
        },
      ],
      exercisePrompt: "Add a required checkbox and two radio buttons (in the same name group) to a form.",
    },
    {
      heading: "Styling Forms with CSS",
      explanation:
        "Inputs are just elements, so normal CSS applies — padding, border, and border-radius turn a plain input into something that matches the rest of your design.\n\nBrowsers apply their own default styling to form elements, which varies between browsers — that's why real projects almost always reset and restyle inputs and buttons explicitly.",
      codeExample: 'input, button {\n  padding: 10px 14px;\n  border-radius: 8px;\n  border: 1px solid #ccc;\n  font-size: 14px;\n}\n\ninput:focus {\n  outline: none;\n  border-color: #04aa6d;\n}',
      language: "css",
      syntax: "input:focus {\n  outline: none;\n  border-color: accent-color;\n}",
      examples: [
        {
          heading: "A visible focus ring for accessibility",
          code: "input:focus {\n  box-shadow: 0 0 0 3px rgba(4, 170, 109, 0.3);\n}",
          language: "css",
          note: "Removing outline without adding a replacement focus style hurts keyboard users, who rely on that visual cue to know which field they're in.",
        },
      ],
      exercisePrompt: "Style a form's inputs and button with consistent padding and rounded corners, and add a focus style.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a Landing Page",
      explanation:
        "Sketch a simple landing page with a header, hero section, features grid, and footer before writing any code.\n\nDrafting the section order as plain comments first keeps you from getting lost in styling details before the overall structure is settled.",
      codeExample: "<!-- header / hero / features / footer -->",
      language: "html",
      exercisePrompt: "List the sections your landing page will have, in order.",
    },
    {
      heading: "Building and Polishing",
      explanation:
        "Combine semantic HTML, the box model, flexbox or grid, and a media query into one finished, responsive page.\n\nBuild and check your work at each screen size as you go, rather than styling everything for desktop first and trying to fix mobile at the very end.",
      codeExample: ".hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 48px 16px;\n}",
      language: "css",
      exercisePrompt: "Build your landing page's hero section and make it responsive.",
    },
  ],
};

const reactEssentials: SectionContent = {
  "Components & JSX": [
    {
      heading: "What is a Component?",
      explanation:
        "A component is a reusable, self-contained piece of UI written as a function that returns JSX.",
      codeExample: "function Welcome() {\n  return <h1>Hello, RivoCode!</h1>;\n}",
      language: "jsx",
      exercisePrompt: "Write a component called Greeting that renders your name in an h2.",
    },
    {
      heading: "JSX Syntax Basics",
      explanation:
        "JSX looks like HTML but is actually JavaScript. Curly braces let you embed any JavaScript expression inside it.",
      codeExample: 'function Profile() {\n  const name = "Alex";\n  return <p>Welcome, {name}!</p>;\n}',
      language: "jsx",
      exercisePrompt: "Render a component that shows today's date using new Date().toDateString().",
    },
    {
      heading: "Composing Components",
      explanation:
        "Components can render other components, letting you build complex UIs from small, reusable pieces.",
      codeExample: "function App() {\n  return (\n    <div>\n      <Welcome />\n      <Profile />\n    </div>\n  );\n}",
      language: "jsx",
      exercisePrompt: "Compose two of your own components inside a parent App component.",
    },
  ],
  "Props & State": [
    {
      heading: "Passing Props",
      explanation:
        "Props are how you pass data from a parent component into a child, similar to function arguments.",
      codeExample: 'function Greeting({ name }) {\n  return <p>Hi, {name}!</p>;\n}\n\n<Greeting name="Alex" />;',
      language: "jsx",
      exercisePrompt: "Create a Card component that accepts a title prop and displays it.",
    },
    {
      heading: "useState Basics",
      explanation:
        "useState gives a component its own memory that persists between renders and triggers a re-render when updated.",
      codeExample: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
      language: "jsx",
      exercisePrompt: "Build a counter that also has a Reset button.",
    },
    {
      heading: "Lifting State Up",
      explanation:
        "When two components need to share data, move the state to their closest common parent and pass it down as props.",
      codeExample: 'function Parent() {\n  const [value, setValue] = useState("");\n  return <Child value={value} onChange={setValue} />;\n}',
      language: "jsx",
      exercisePrompt: "Explain why state needs to live in the parent when two sibling components must stay in sync.",
    },
    {
      heading: "Conditional Rendering",
      explanation:
        "Use if statements, ternaries, or && inside JSX to show different UI depending on the current state.",
      codeExample: '{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}',
      language: "jsx",
      exercisePrompt: "Render a \"Loading...\" message only while a loading state is true.",
    },
  ],
  Hooks: [
    {
      heading: "useState Recap",
      explanation: "useState is the most common hook. It stores a value and a function used to update it.",
      codeExample: 'const [theme, setTheme] = useState("light");',
      language: "jsx",
      exercisePrompt: "Use useState to track whether a sidebar is open or closed.",
    },
    {
      heading: "useEffect for Side Effects",
      explanation:
        "useEffect runs code after render, which is perfect for data fetching, subscriptions, or syncing with something outside React.",
      codeExample: 'useEffect(() => {\n  document.title = "RivoCode - " + count;\n}, [count]);',
      language: "jsx",
      exercisePrompt: "Use useEffect to log a message every time a count value changes.",
    },
    {
      heading: "useRef for Mutable Values",
      explanation:
        "useRef stores a value that persists across renders without causing a re-render, often used to access DOM elements directly.",
      codeExample: "const inputRef = useRef(null);\n\n<input ref={inputRef} />;",
      language: "jsx",
      exercisePrompt: "Use useRef to focus an input element when a button is clicked.",
    },
    {
      heading: "useMemo and useCallback",
      explanation:
        "These hooks memoize expensive calculations and function references so they are not recreated on every render.",
      codeExample: "const total = useMemo(() => items.reduce((a, b) => a + b, 0), [items]);",
      language: "jsx",
      exercisePrompt: "Explain in a comment when you would reach for useMemo instead of just recalculating a value.",
    },
    {
      heading: "Writing a Custom Hook",
      explanation:
        "A custom hook is just a function starting with use that packages up reusable stateful logic.",
      codeExample: "function useToggle(initial = false) {\n  const [value, setValue] = useState(initial);\n  return [value, () => setValue((v) => !v)];\n}",
      language: "jsx",
      exercisePrompt: "Use the useToggle hook to build a show/hide password field.",
    },
  ],
  "Forms & Events": [
    {
      heading: "Controlled Inputs",
      explanation:
        "A controlled input's value is driven by React state, so state and the UI always stay in sync.",
      codeExample: 'const [name, setName] = useState("");\n\n<input value={name} onChange={(e) => setName(e.target.value)} />;',
      language: "jsx",
      exercisePrompt: "Build a controlled input that shows a live character count.",
    },
    {
      heading: "Handling Form Submission",
      explanation:
        "onSubmit on a form, combined with event.preventDefault(), lets you control what happens when a form is submitted.",
      codeExample: 'function handleSubmit(e) {\n  e.preventDefault();\n  console.log("Submitted!");\n}',
      language: "jsx",
      exercisePrompt: "Build a form with a name field that logs the name on submit.",
    },
    {
      heading: "Validating Input",
      explanation:
        "Simple validation checks values before allowing submission and shows an error message when something is wrong.",
      codeExample: 'if (email.trim() === "") {\n  setError("Email is required");\n}',
      language: "jsx",
      exercisePrompt: "Add validation that blocks submission if a password field is empty.",
    },
    {
      heading: "Multiple Form Fields",
      explanation:
        "For forms with many fields, storing them in one state object keeps everything organized.",
      codeExample: 'const [form, setForm] = useState({ name: "", email: "" });',
      language: "jsx",
      exercisePrompt: "Build a form with name and email fields using a single state object.",
    },
  ],
  "Data Fetching": [
    {
      heading: "Fetching Data with useEffect",
      explanation: "Combine fetch() with useEffect to load data when a component mounts.",
      codeExample: 'useEffect(() => {\n  fetch("/api/courses").then((res) => res.json()).then(setCourses);\n}, []);',
      language: "jsx",
      exercisePrompt: "Describe what the empty dependency array means for when this effect runs.",
    },
    {
      heading: "Loading and Error States",
      explanation:
        "Real apps track loading and error state alongside the data itself, so the UI can respond to all three cases.",
      codeExample: "const [loading, setLoading] = useState(true);\nconst [error, setError] = useState(null);",
      language: "jsx",
      exercisePrompt: "Render \"Loading...\", an error message, or the data depending on state.",
    },
    {
      heading: "Displaying Fetched Lists",
      explanation:
        "Use map() to turn an array of fetched data into a list of JSX elements, each with a unique key.",
      codeExample: "{courses.map((c) => <li key={c.id}>{c.title}</li>)}",
      language: "jsx",
      exercisePrompt: "Render a fetched array of items as a list, using each item's id as the key.",
    },
    {
      heading: "Refetching on User Action",
      explanation:
        "You can trigger a new fetch whenever a dependency, like a search query, changes, or manually on a button click.",
      codeExample: 'useEffect(() => {\n  fetch("/api/search?q=" + query).then((res) => res.json()).then(setResults);\n}, [query]);',
      language: "jsx",
      exercisePrompt: "Explain what would happen if query were left out of the dependency array.",
    },
  ],
  "Routing Basics": [
    {
      heading: "Why Client-Side Routing?",
      explanation:
        "A single-page app has one HTML file, so a router swaps which component renders based on the URL, without a full page reload.",
      codeExample: '// Without a router: one static page\n// With a router: URL decides which component shows\n// "/"        -> <Home />\n// "/courses" -> <Courses />',
      language: "jsx",
      exercisePrompt: "List three URLs your own app would need and which component each should render.",
    },
    {
      heading: "Routes, Route, and Link",
      explanation:
        "react-router-dom's Routes and Route map a URL path to a component. Link renders navigable anchor tags without reloading the page.",
      codeExample: 'import { Routes, Route, Link } from "react-router-dom";\n\nfunction App() {\n  return (\n    <div>\n      <Link to="/courses">Courses</Link>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/courses" element={<Courses />} />\n      </Routes>\n    </div>\n  );\n}',
      language: "jsx",
      exercisePrompt: "Add a third Route and matching Link for a \"/about\" page.",
    },
    {
      heading: "Dynamic Routes with useParams",
      explanation:
        "A route like /courses/:id captures part of the URL as a parameter, which useParams reads inside the matched component.",
      codeExample: 'import { useParams } from "react-router-dom";\n\nfunction CourseDetail() {\n  const { id } = useParams();\n  return <p>Showing course {id}</p>;\n}\n\n<Route path="/courses/:id" element={<CourseDetail />} />;',
      language: "jsx",
      exercisePrompt: "Set up a dynamic route /users/:username and read the username with useParams.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a React App",
      explanation:
        "Sketch your components as a tree before coding. Decide what state lives where and what data flows between them.",
      codeExample: "// App\n//  -> TodoList\n//       -> TodoItem",
      language: "jsx",
      exercisePrompt: "Draw the component tree, as comments, for a small app of your choice.",
    },
    {
      heading: "Building the Core Feature",
      explanation:
        "Start with the core interaction, like adding a todo, before adding extras like filtering or persistence.",
      codeExample: "function addTodo(text) {\n  setTodos([...todos, { id: Date.now(), text }]);\n}",
      language: "jsx",
      exercisePrompt: "Implement an addItem function for your project's main list.",
    },
    {
      heading: "Polishing and Testing",
      explanation:
        "Once the core works, test edge cases such as empty inputs, long lists, and fast clicking, then clean up the UI.",
      codeExample: 'if (text.trim() === "") return;',
      language: "jsx",
      exercisePrompt: "Add a guard clause so your app ignores empty input submissions.",
    },
  ],
};

const pythonBasics: SectionContent = {
  "Getting Started": [
    {
      heading: "Your First Python Program",
      explanation: "Python code runs top to bottom. print() displays output to the console.\n\nPython is interpreted rather than compiled, so there's no separate build step — you write a line and it runs, which is a big part of why it's a popular first language.",
      codeExample: 'print("Hello, RivoCode!")',
      language: "python",
      syntax: 'print(value)',
      examples: [
        {
          heading: "Printing multiple values",
          code: 'print("Score:", 95, "out of", 100)',
          language: "python",
          note: "print() automatically joins multiple arguments with a space and adds a newline at the end.",
        },
      ],
      exercisePrompt: "Print your name and the current year on two separate lines.",
    },
    {
      heading: "Comments and Readability",
      explanation:
        "Lines starting with # are comments, ignored by Python but useful for explaining your code to humans.\n\nPython has no separate multi-line comment syntax, though a triple-quoted string not assigned to anything is often used the same way.",
      codeExample: '# This program greets the user\nprint("Welcome!")  # prints a greeting',
      language: "python",
      syntax: "# single-line comment",
      exercisePrompt: "Add a comment above one line of code explaining what it does.",
    },
    {
      heading: "Running Python Files",
      explanation:
        "Python files end in .py and run top-to-bottom with the python filename.py command, or right here in the browser editor.\n\nIndentation in Python isn't just a style choice — it's how the language knows which lines belong to which block, so consistent spacing (usually 4 spaces) actually matters for the code to run at all.",
      codeExample: 'name = "Alex"\nprint("Hi,", name)',
      language: "python",
      exercisePrompt: "Write a two-line script that stores your name in a variable and prints a greeting.",
    },
  ],
  "Variables & Types": [
    {
      heading: "Variables in Python",
      explanation: "Python variables do not need a declared type. Just assign a value with the equals sign.\n\nThis is called dynamic typing — the same variable name could hold a number at one point and a string later, though doing that on purpose usually makes code harder to follow.",
      codeExample: 'age = 20\nname = "Alex"\nprint(name, age)',
      language: "python",
      syntax: "variable_name = value",
      exercisePrompt: "Store your age and city in two variables and print them together.",
    },
    {
      heading: "Numbers, Strings, and Booleans",
      explanation:
        "Python's core types are int, float, str, and bool. Use type() to check what you are working with.\n\nint and float behave differently in division — dividing two ints with / always produces a float in Python 3, even when the result is a whole number.",
      codeExample: "score = 95\npi = 3.14\nis_passing = True\nprint(type(score), type(pi), type(is_passing))",
      language: "python",
      syntax: "type(value)",
      examples: [
        {
          heading: "Integer division with //",
          code: "print(7 / 2)   # 3.5\nprint(7 // 2)  # 3",
          language: "python",
          note: "// discards the remainder and always returns a whole number result, unlike the regular / operator.",
        },
      ],
      exercisePrompt: "Create one variable of each type and print its type().",
    },
    {
      heading: "f-strings",
      explanation: "f-strings let you embed variables directly inside a string using curly braces.\n\nYou can put any expression inside the braces, not just a variable name — including function calls and arithmetic, which get evaluated and inserted automatically.",
      codeExample: 'name = "Alex"\nage = 20\nprint(f"{name} is {age} years old")',
      language: "python",
      syntax: 'f"text {variable} more text"',
      examples: [
        {
          heading: "An expression inside an f-string",
          code: 'price = 19.999\nprint(f"Total: ${price:.2f}")',
          language: "python",
          note: ":.2f formats a number to 2 decimal places, right inside the f-string.",
        },
      ],
      exercisePrompt: "Use an f-string to print a sentence combining three variables.",
    },
  ],
  "Control Flow": [
    {
      heading: "if/elif/else",
      explanation:
        "Python uses indentation, not braces, to define which code belongs to each branch of a condition.\n\nelif is Python's word for \"else if\" — a chain can have as many elif branches as needed, with at most one final else.",
      codeExample: 'score = 72\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")',
      language: "python",
      syntax: "if condition:\n    # code\nelif other_condition:\n    # code\nelse:\n    # code",
      exercisePrompt: "Write an if/elif/else chain that prints a weather-appropriate outfit suggestion.",
    },
    {
      heading: "Comparison and Logic",
      explanation:
        "==, !=, <, and > compare values. and, or, and not combine conditions, spelled out instead of using symbols.\n\nChained comparisons like 0 < age < 18 also work in Python and read almost like plain English, unlike most other languages.",
      codeExample: 'age = 20\nhas_id = True\nif age >= 18 and has_id:\n    print("Entry allowed")',
      language: "python",
      syntax: "a == b\na and b\na or b\nnot a",
      examples: [
        {
          heading: "A chained comparison",
          code: "age = 15\nif 13 <= age < 20:\n    print(\"Teenager\")",
          language: "python",
        },
      ],
      exercisePrompt: "Write a condition using or that checks if a day is Saturday or Sunday.",
    },
    {
      heading: "for Loops and range()",
      explanation:
        "for loops in Python iterate directly over sequences. range() generates a sequence of numbers to loop over.\n\nrange(5) generates 0 through 4, not 0 through 5 — it always stops one short of its argument, which is the most common range() surprise for beginners.",
      codeExample: "for i in range(5):\n    print(i)",
      language: "python",
      syntax: "for variable in range(start, stop, step):\n    # code",
      examples: [
        {
          heading: "range with a start and step",
          code: "for i in range(2, 10, 2):\n    print(i)",
          language: "python",
          note: "range(2, 10, 2) starts at 2, stops before 10, and steps by 2 each time.",
        },
      ],
      exercisePrompt: "Use a for loop with range() to print the numbers 1 through 10.",
    },
    {
      heading: "while Loops",
      explanation:
        "while loops repeat as long as a condition is true. Remember to update the condition or you will loop forever.\n\nbreak exits a loop immediately, and continue skips to the next iteration — both work in while and for loops alike.",
      codeExample: 'count = 0\nwhile count < 3:\n    print("Count:", count)\n    count += 1',
      language: "python",
      syntax: "while condition:\n    # code",
      exercisePrompt: "Write a while loop that counts down from 5 to 1.",
    },
  ],
  Functions: [
    {
      heading: "Defining Functions",
      explanation:
        "Functions are defined with def, and Python uses indentation to mark what is inside the function body.\n\nA function without an explicit return statement returns None automatically, the same way JavaScript functions return undefined by default.",
      codeExample: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Rivo"))',
      language: "python",
      syntax: "def function_name(parameter):\n    # code\n    return value",
      exercisePrompt: "Write a function square(n) that returns n squared.",
    },
    {
      heading: "Parameters and Default Values",
      explanation:
        "Function parameters can have default values, which are used automatically when no argument is passed.\n\nParameters with defaults must come after parameters without defaults in the function signature, or Python raises a syntax error.",
      codeExample: 'def greet(name="friend"):\n    return f"Hi, {name}!"\n\nprint(greet())\nprint(greet("Alex"))',
      language: "python",
      syntax: "def function_name(param=default_value):\n    return value",
      exercisePrompt: "Write a function with a default parameter for a discount percentage.",
    },
    {
      heading: "Return Values",
      explanation:
        "return sends a value back to the caller and immediately ends the function. Without it, a function returns None.\n\nA function can return multiple values at once as a tuple, which the caller can then unpack into separate variables.",
      codeExample: "def add(a, b):\n    return a + b\n\ntotal = add(3, 4)\nprint(total)",
      language: "python",
      examples: [
        {
          heading: "Returning multiple values",
          code: "def min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([4, 1, 9, 2])\nprint(low, high)",
          language: "python",
        },
      ],
      exercisePrompt: "Write a function that returns both the sum and the product of two numbers as a tuple.",
    },
    {
      heading: "Scope in Python",
      explanation:
        "Variables created inside a function are local to it. Variables created outside are accessible everywhere unless shadowed.\n\nTo modify a global variable from inside a function, you need the global keyword — without it, assigning to that name just creates a new local variable instead.",
      codeExample: 'x = "global"\ndef show():\n    x = "local"\n    print(x)\n\nshow()\nprint(x)',
      language: "python",
      exercisePrompt: "Predict what the two print statements above output, then run the code.",
    },
  ],
  "Data Structures": [
    {
      heading: "Lists",
      explanation: "Lists are ordered, changeable collections, created with square brackets.\n\nLists can hold mixed types and can be sliced with fruits[1:3] to grab a range of items, similar to slicing a string.",
      codeExample: 'fruits = ["apple", "banana", "mango"]\nfruits.append("kiwi")\nprint(fruits[0], len(fruits))',
      language: "python",
      syntax: "my_list = [item1, item2, item3]\nmy_list.append(item)",
      examples: [
        {
          heading: "Slicing a list",
          code: 'fruits = ["apple", "banana", "mango", "kiwi"]\nprint(fruits[1:3])',
          language: "python",
          note: "Slicing [start:stop] includes start but excludes stop, same rule as range().",
        },
      ],
      exercisePrompt: "Create a list of 5 courses and print the third one.",
    },
    {
      heading: "Tuples",
      explanation:
        "Tuples are like lists but immutable, meaning they cannot be changed after creation, which is great for fixed groups of values.\n\nBecause they can't change, tuples can be used as dictionary keys, while lists cannot.",
      codeExample: "point = (10, 20)\nx, y = point\nprint(x, y)",
      language: "python",
      syntax: "my_tuple = (value1, value2)",
      exercisePrompt: "Create a tuple representing a date with day, month, and year, and unpack it into three variables.",
    },
    {
      heading: "Dictionaries",
      explanation: "Dictionaries store key-value pairs, accessed by key instead of position.\n\n.get(\"key\") is a safer way to read a value than square brackets, since it returns None (or a default you choose) instead of raising an error when the key doesn't exist.",
      codeExample: 'student = {"name": "Alex", "age": 20}\nprint(student["name"])\nstudent["city"] = "Tashkent"',
      language: "python",
      syntax: 'my_dict = {"key": "value"}\nmy_dict.get("key", default)',
      examples: [
        {
          heading: "Using .get() to avoid errors",
          code: 'student = {"name": "Alex"}\nprint(student.get("age", "unknown"))',
          language: "python",
        },
      ],
      exercisePrompt: "Create a dictionary representing a course with title and level keys.",
    },
    {
      heading: "Sets",
      explanation:
        "Sets store unique, unordered values, useful for removing duplicates or checking membership quickly.\n\nChecking whether a value is in a set with in is much faster than checking a list, especially as the collection grows large.",
      codeExample: "numbers = {1, 2, 2, 3, 3, 3}\nprint(numbers)\nprint(2 in numbers)",
      language: "python",
      syntax: "my_set = {value1, value2}\nset(some_list)",
      examples: [
        {
          heading: "Deduplicating a list",
          code: "nums = [1, 2, 2, 3, 3, 3]\nunique = list(set(nums))\nprint(unique)",
          language: "python",
        },
      ],
      exercisePrompt: "Create a set from a list with duplicate values and print its length.",
    },
    {
      heading: "List Comprehensions",
      explanation:
        "A list comprehension builds a new list in one concise line, combining a loop and a condition.\n\nUnder the hood it's equivalent to a for loop that appends to a new list, just written more compactly and often considered more \"Pythonic.\"",
      codeExample: "squares = [n * n for n in range(1, 6)]\nevens = [n for n in range(20) if n % 2 == 0]\nprint(squares, evens)",
      language: "python",
      syntax: "[expression for item in iterable if condition]",
      exercisePrompt: "Write a list comprehension that returns only the even numbers from a list.",
    },
  ],
  "Error Handling": [
    {
      heading: "try and except",
      explanation:
        "Wrapping risky code in a try block lets Python attempt it, then fall back to an except block instead of crashing when something goes wrong.\n\nYou can catch specific exception types, like ValueError, or catch every exception with a bare except: — though being specific makes bugs easier to find later.",
      codeExample: 'try:\n    number = int("not a number")\nexcept ValueError:\n    print("That wasn\'t a valid number.")',
      language: "python",
      syntax: "try:\n    # risky code\nexcept ExceptionType:\n    # handle it",
      exercisePrompt: "Wrap a line that divides by a variable that might be zero in a try/except that catches ZeroDivisionError.",
    },
    {
      heading: "Raising Your Own Exceptions",
      explanation:
        "The raise keyword lets your own functions signal a problem, using a built-in exception type like ValueError or a custom message.\n\nRaising stops the function immediately, the same way return does, but signals failure instead of a normal result.",
      codeExample: 'def withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError("Insufficient funds")\n    return balance - amount\n\ntry:\n    withdraw(50, 100)\nexcept ValueError as error:\n    print(error)',
      language: "python",
      syntax: 'raise ExceptionType("message")',
      exercisePrompt: "Write a function divide(a, b) that raises a ValueError when b is 0, then call it inside a try/except.",
    },
    {
      heading: "else and finally",
      explanation:
        "An else block runs only if no exception was raised. finally always runs at the end, whether there was an error or not — useful for cleanup.\n\nA common finally use case is closing a file or network connection, guaranteeing it happens even if the code above it fails.",
      codeExample: 'try:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nelse:\n    print("Success:", result)\nfinally:\n    print("Done attempting the division.")',
      language: "python",
      syntax: "try:\n    # code\nexcept ExceptionType:\n    # handle error\nelse:\n    # runs if no error\nfinally:\n    # always runs",
      exercisePrompt: "Add an else clause to a try/except that prints a success message only when no exception occurred.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning Your Python Project",
      explanation:
        "Decide what data your project needs, such as a list or a dictionary, and sketch the functions before coding.\n\nChoosing the right data structure up front — a list for order, a dict for lookup by key, a set for uniqueness — makes the rest of the project noticeably easier to write.",
      codeExample: "# Project: Contact book\n# Data: list of dictionaries with name and phone keys",
      language: "python",
      exercisePrompt: "Write a plan, as comments, for a small Python project of your choice.",
    },
    {
      heading: "Building and Testing",
      explanation:
        "Combine variables, functions, loops, and data structures from this course into one working program.\n\nTry your program with an empty list, a single item, and a large list — these edge cases catch a surprising number of bugs that \"normal\" test inputs miss.",
      codeExample: "def average(scores):\n    return sum(scores) / len(scores)\n\nprint(average([80, 90, 100]))",
      language: "python",
      exercisePrompt: "Extend the average function to also print a pass/fail message.",
    },
  ],
};

const typescriptInDepth: SectionContent = {
  "Type Basics": [
    {
      heading: "Adding Types to Variables",
      explanation:
        "TypeScript lets you annotate variables with a type. The compiler then catches mismatched values before you run the code.",
      codeExample: 'let age: number = 20;\nlet name: string = "Alex";',
      language: "typescript",
      exercisePrompt: "Declare a boolean variable with an explicit type and assign it a value.",
    },
    {
      heading: "Function Type Annotations",
      explanation: "You can type both function parameters and return values, making function contracts explicit.",
      codeExample: "function add(a: number, b: number): number {\n  return a + b;\n}",
      language: "typescript",
      exercisePrompt: "Write a typed function greet(name: string): string.",
    },
    {
      heading: "Union and Literal Types",
      explanation:
        "Union types let a value be one of several types. Literal types restrict it to specific exact values.",
      codeExample: 'let status: "loading" | "success" | "error" = "loading";',
      language: "typescript",
      exercisePrompt: "Declare a variable typed as either a number or a string, and assign both in turn.",
    },
  ],
  "Interfaces & Types": [
    {
      heading: "Defining Interfaces",
      explanation: "An interface describes the shape of an object, meaning which properties it must have and their types.",
      codeExample: 'interface Student {\n  name: string;\n  age: number;\n}\nconst s: Student = { name: "Alex", age: 20 };',
      language: "typescript",
      exercisePrompt: "Define an interface Course with title, level, and totalLessons fields.",
    },
    {
      heading: "Optional and Readonly Properties",
      explanation:
        "A question mark marks a property optional. readonly prevents it from being reassigned after creation.",
      codeExample: "interface Config {\n  readonly id: string;\n  timeout?: number;\n}",
      language: "typescript",
      exercisePrompt: "Add an optional property to the Student interface from the previous lesson.",
    },
    {
      heading: "type Aliases vs Interfaces",
      explanation:
        "type can name any type, including unions, while interface is best for describing object shapes that might be extended later.",
      codeExample: "type ID = string | number;\ninterface User {\n  id: ID;\n  name: string;\n}",
      language: "typescript",
      exercisePrompt: "Create a type alias for a Status that can be \"active\" or \"inactive\".",
    },
  ],
  Generics: [
    {
      heading: "Why Generics?",
      explanation:
        "Generics let a function or type work with any type while still preserving type safety, instead of writing duplicate code per type.",
      codeExample: "function identity<T>(value: T): T {\n  return value;\n}",
      language: "typescript",
      exercisePrompt: "Call the identity function with a number, then with a string.",
    },
    {
      heading: "Generic Functions",
      explanation:
        "A generic function's type parameter is inferred from the arguments you pass, or can be specified explicitly.",
      codeExample: "function firstItem<T>(items: T[]): T {\n  return items[0];\n}",
      language: "typescript",
      exercisePrompt: "Write a generic function lastItem that returns the last element of any array.",
    },
    {
      heading: "Generic Interfaces",
      explanation: "Interfaces can also take type parameters, useful for reusable shapes like API responses.",
      codeExample: "interface ApiResponse<T> {\n  data: T;\n  success: boolean;\n}",
      language: "typescript",
      exercisePrompt: "Define a generic Box<T> interface with a single value: T property.",
    },
    {
      heading: "Constraints on Generics",
      explanation:
        "The extends keyword lets you restrict a generic type to only types that have certain properties.",
      codeExample: "function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}",
      language: "typescript",
      exercisePrompt: "Explain why getLength([1,2,3]) works but getLength(42) would fail to compile.",
    },
  ],
  "Typing React": [
    {
      heading: "Typing Props",
      explanation:
        "Define an interface for a component's props so TypeScript checks every usage of that component.",
      codeExample: "interface ButtonProps {\n  label: string;\n  onClick: () => void;\n}\nfunction Button({ label, onClick }: ButtonProps) {}",
      language: "typescript",
      exercisePrompt: "Define props for a Card component with a title and an optional description.",
    },
    {
      heading: "Typing useState",
      explanation:
        "useState infers its type from the initial value, but you can specify it explicitly for cases like starting with null.",
      codeExample: "const [user, setUser] = useState<string | null>(null);",
      language: "typescript",
      exercisePrompt: "Type a useState hook that holds an array of numbers, starting empty.",
    },
    {
      heading: "Typing Event Handlers",
      explanation:
        "React provides specific event types like React.ChangeEvent<HTMLInputElement> for strongly-typed event handlers.",
      codeExample: "function handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n  console.log(e.target.value);\n}",
      language: "typescript",
      exercisePrompt: "Write a typed onClick handler for a button element.",
    },
    {
      heading: "Typing Children and Components",
      explanation:
        "React.ReactNode types anything renderable as children, which is useful for wrapper and layout components.",
      codeExample: "interface CardProps {\n  children: React.ReactNode;\n}",
      language: "typescript",
      exercisePrompt: "Define a Layout component's props to accept children of type React.ReactNode.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a Typed App",
      explanation:
        "Sketch your interfaces first. Once your data shapes are defined, the rest of your code becomes much safer to write.",
      codeExample: "interface Task {\n  id: string;\n  title: string;\n  done: boolean;\n}",
      language: "typescript",
      exercisePrompt: "Define the interfaces you would need for a small typed todo app.",
    },
    {
      heading: "Building with Confidence",
      explanation:
        "With interfaces and generics in place, TypeScript catches typos and mismatched types as you build, letting the compiler guide you.",
      codeExample: "function toggleTask(tasks: Task[], id: string): Task[] {\n  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));\n}",
      language: "typescript",
      exercisePrompt: "Write a typed function that adds a new Task to an array of tasks.",
    },
  ],
};

const nodejsFundamentals: SectionContent = {
  "The Node Runtime": [
    {
      heading: "What is Node.js?",
      explanation:
        "Node.js lets you run JavaScript outside the browser, on servers and in command-line tools, using the same language you already know.",
      codeExample: 'console.log("Running in Node.js");\nconsole.log(process.version);',
      language: "javascript",
      exercisePrompt: "Log the current working directory using process.cwd().",
    },
    {
      heading: "Running Scripts and process.argv",
      explanation:
        "Node scripts run with the node command followed by a filename. process.argv gives you access to command-line arguments passed in.",
      codeExample: 'const args = process.argv.slice(2);\nconsole.log("Arguments:", args);',
      language: "javascript",
      exercisePrompt: "Explain what process.argv.slice(2) removes and why.",
    },
    {
      heading: "The Node Event Loop",
      explanation:
        "Node runs JavaScript on a single thread but handles input and output asynchronously via an event loop, so slow operations do not block everything else.",
      codeExample: 'console.log("1");\nsetTimeout(() => console.log("2"), 0);\nconsole.log("3");',
      language: "javascript",
      exercisePrompt: "Predict the output order of the code above before running it.",
    },
  ],
  "Modules & npm": [
    {
      heading: "CommonJS Modules",
      explanation:
        "require() imports code from other files or packages. module.exports shares code from the current file.",
      codeExample: '// math.js\nmodule.exports.add = (a, b) => a + b;\n\n// app.js\nconst { add } = require("./math");',
      language: "javascript",
      exercisePrompt: "Explain what module.exports lets other files access.",
    },
    {
      heading: "Installing Packages with npm",
      explanation:
        "npm install adds third-party packages to your project, tracked in package.json and stored in node_modules.",
      codeExample: '{\n  "dependencies": {\n    "express": "^4.18.0"\n  }\n}',
      language: "json",
      exercisePrompt: "Look up one npm package you would like to use in a project and note what it does.",
    },
    {
      heading: "package.json Scripts",
      explanation:
        "The scripts field defines shortcuts like npm run dev or npm start for common project commands.",
      codeExample: '{\n  "scripts": {\n    "start": "node server.js",\n    "dev": "node --watch server.js"\n  }\n}',
      language: "json",
      exercisePrompt: "Write a package.json scripts block with a test command.",
    },
  ],
  "Building an API": [
    {
      heading: "Creating an HTTP Server",
      explanation:
        "Node's built-in http module can create a basic web server that listens for and responds to requests.",
      codeExample: 'const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.end("Hello from Node!");\n});\nserver.listen(3000);',
      language: "javascript",
      exercisePrompt: "Explain what server.listen(3000) does.",
    },
    {
      heading: "Routing Requests",
      explanation:
        "Checking req.url and req.method lets a server respond differently depending on the requested path.",
      codeExample: 'if (req.url === "/api/health" && req.method === "GET") {\n  res.end("OK");\n}',
      language: "javascript",
      exercisePrompt: "Add a second route that responds to \"/api/hello\".",
    },
    {
      heading: "Sending JSON Responses",
      explanation:
        "Set the Content-Type header and use JSON.stringify to send structured data back to the client.",
      codeExample: 'res.setHeader("Content-Type", "application/json");\nres.end(JSON.stringify({ status: "ok" }));',
      language: "javascript",
      exercisePrompt: "Write code that sends { message: \"Hello\" } as a JSON response.",
    },
    {
      heading: "Reading the Request Body",
      explanation:
        "For POST requests, data arrives in chunks. You collect them and parse the full body once it is done.",
      codeExample: 'let body = "";\nreq.on("data", (chunk) => (body += chunk));\nreq.on("end", () => console.log(JSON.parse(body)));',
      language: "javascript",
      exercisePrompt: "Explain why request body data arrives as multiple chunks instead of all at once.",
    },
    {
      heading: "Environment Variables",
      explanation:
        "process.env lets you read configuration, like ports or API keys, from outside your code, keeping secrets out of source files.",
      codeExample: 'const port = process.env.PORT || 3000;\nconsole.log("Server running on port " + port);',
      language: "javascript",
      exercisePrompt: "Write code that reads a DATABASE_URL environment variable with a fallback default.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a Small API",
      explanation:
        "Decide which routes your API needs and what data each one returns before writing the server code.",
      codeExample: "// GET /api/courses -> list of courses\n// GET /api/courses/:id -> one course",
      language: "javascript",
      exercisePrompt: "List the routes your own small API project would need.",
    },
    {
      heading: "Building and Testing the API",
      explanation:
        "Combine routing, JSON responses, and environment variables into a working server, then test each route.",
      codeExample: 'const server = http.createServer((req, res) => {\n  res.setHeader("Content-Type", "application/json");\n  res.end(JSON.stringify({ status: "running" }));\n});\nserver.listen(process.env.PORT || 3000);',
      language: "javascript",
      exercisePrompt: "Add one more route to the server above and test it locally.",
    },
  ],
};

const gitGithub: SectionContent = {
  "Version Control Basics": [
    {
      heading: "What is Git?",
      explanation:
        "Git tracks changes to your files over time, letting you save snapshots called commits and go back to any previous version.",
      codeExample: "git init\ngit status",
      language: "bash",
      exercisePrompt: "Explain in one sentence what git init does.",
    },
    {
      heading: "Staging and Committing",
      explanation:
        "git add stages changes you want to save. git commit saves a snapshot with a message describing what changed.",
      codeExample: 'git add index.html\ngit commit -m "Add homepage"',
      language: "bash",
      exercisePrompt: "Write a commit message for a change that fixes a typo in a README.",
    },
    {
      heading: "Checking History",
      explanation: "git log shows the commit history, and git diff shows exactly what changed between snapshots.",
      codeExample: "git log --oneline\ngit diff",
      language: "bash",
      exercisePrompt: "Explain the difference between git log and git diff.",
    },
  ],
  "Branching & Merging": [
    {
      heading: "Creating Branches",
      explanation:
        "Branches let you work on new features without affecting the main codebase until you are ready to merge.",
      codeExample: "git branch feature-login\ngit checkout feature-login",
      language: "bash",
      exercisePrompt: "Write the single command that creates and switches to a new branch in one step.",
    },
    {
      heading: "Making Changes on a Branch",
      explanation: "Commits made on a branch only exist on that branch until it is merged elsewhere.",
      codeExample: 'git checkout -b feature-navbar\ngit add .\ngit commit -m "Add navbar component"',
      language: "bash",
      exercisePrompt: "Describe what happens to your commits if you switch back to main without merging.",
    },
    {
      heading: "Merging Branches",
      explanation:
        "git merge combines the changes from one branch into another, usually merging a feature branch back into main.",
      codeExample: "git checkout main\ngit merge feature-navbar",
      language: "bash",
      exercisePrompt: "Explain why you switch to main before running git merge.",
    },
    {
      heading: "Resolving Merge Conflicts",
      explanation:
        "A conflict happens when Git cannot automatically combine changes. You edit the file to choose the final version, then commit.",
      codeExample: "<<<<<<< HEAD\nconst title = \"Home\";\n=======\nconst title = \"Dashboard\";\n>>>>>>> feature-branch",
      language: "bash",
      exercisePrompt: "Explain what the conflict markers in a conflicted file mean.",
    },
  ],
  "Working with GitHub": [
    {
      heading: "Remotes and Cloning",
      explanation:
        "A remote is a version of your repo hosted elsewhere, like GitHub. git clone downloads a full copy to your machine.",
      codeExample: "git clone https://github.com/user/repo.git\ngit remote -v",
      language: "bash",
      exercisePrompt: "Explain the difference between git clone and git init.",
    },
    {
      heading: "Pushing and Pulling",
      explanation:
        "git push uploads your local commits to the remote. git pull downloads and merges commits others have pushed.",
      codeExample: "git push origin main\ngit pull origin main",
      language: "bash",
      exercisePrompt: "Explain when you would need to git pull before you can git push.",
    },
    {
      heading: "Pull Requests",
      explanation:
        "A pull request proposes merging your branch into another, letting teammates review the changes before they are merged.",
      codeExample: "git push origin feature-login\n# then open a Pull Request on GitHub",
      language: "bash",
      exercisePrompt: "List two things you would want a teammate to check in your pull request.",
    },
    {
      heading: "A Practical Team Workflow",
      explanation:
        "A common flow is to branch from main, commit small changes, push, open a pull request, review, merge, then delete the branch.",
      codeExample: 'git checkout -b fix-bug\ngit commit -am "Fix off-by-one error"\ngit push origin fix-bug',
      language: "bash",
      exercisePrompt: "Write out the sequence of git commands you would use to fix a small bug end-to-end.",
    },
  ],
};

const dataScienceIntro: SectionContent = {
  "Working with Data": [
    {
      heading: "Loading Data with pandas",
      explanation:
        "pandas reads CSV files into a DataFrame, a table-like structure that is easy to explore and manipulate.",
      codeExample: 'import pandas as pd\n\ndf = pd.read_csv("data.csv")\nprint(df.head())',
      language: "python",
      exercisePrompt: "Explain what df.head() shows you about a dataset.",
    },
    {
      heading: "Exploring a DataFrame",
      explanation:
        "The shape, columns, and describe() attributes quickly summarize a dataset's size, fields, and basic statistics.",
      codeExample: "print(df.shape)\nprint(df.columns)\nprint(df.describe())",
      language: "python",
      exercisePrompt: "List three questions you could answer using df.describe().",
    },
    {
      heading: "Selecting and Filtering Data",
      explanation:
        "You can select columns with df[\"col\"] and filter rows with boolean conditions.",
      codeExample: 'young = df[df["age"] < 25]\nnames = df["name"]',
      language: "python",
      exercisePrompt: "Write a filter that keeps only rows where a score column is above 80.",
    },
    {
      heading: "Cleaning Missing Data",
      explanation:
        "Real datasets often have missing values. dropna() removes them, and fillna() replaces them with a default.",
      codeExample: "df_clean = df.dropna()\ndf_filled = df.fillna(0)",
      language: "python",
      exercisePrompt: "Explain a situation where fillna(0) would be misleading for a dataset.",
    },
  ],
  Visualization: [
    {
      heading: "Plotting with matplotlib",
      explanation:
        "matplotlib is the foundational Python plotting library. A few lines create a chart from your data.",
      codeExample: "import matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [10, 20, 15])\nplt.show()",
      language: "python",
      exercisePrompt: "Describe what changing the second list of numbers would do to the plot.",
    },
    {
      heading: "Bar Charts and Histograms",
      explanation: "Bar charts compare categories, while histograms show the distribution of a single numeric column.",
      codeExample: 'df["category"].value_counts().plot(kind="bar")\ndf["age"].plot(kind="hist")',
      language: "python",
      exercisePrompt: "Explain when you would choose a histogram over a bar chart.",
    },
    {
      heading: "Scatter Plots for Relationships",
      explanation:
        "Scatter plots reveal whether two numeric variables are related, and how strongly.",
      codeExample: 'plt.scatter(df["hours_studied"], df["score"])\nplt.xlabel("Hours studied")\nplt.ylabel("Score")',
      language: "python",
      exercisePrompt: "Describe what an upward-sloping scatter plot would suggest about the two variables.",
    },
    {
      heading: "Labels, Titles, and Legends",
      explanation:
        "Clear titles, axis labels, and legends turn a raw chart into something someone else can actually understand.",
      codeExample: 'plt.title("Score vs Hours Studied")\nplt.legend(["2026 cohort"])',
      language: "python",
      exercisePrompt: "Add a title and axis labels to a chart from an earlier lesson.",
    },
  ],
  Analysis: [
    {
      heading: "Grouping Data with groupby",
      explanation:
        "groupby splits data into groups, such as by category, so you can compute a statistic per group.",
      codeExample: 'avg_by_category = df.groupby("category")["score"].mean()\nprint(avg_by_category)',
      language: "python",
      exercisePrompt: "Use groupby to find the average score per difficulty level in a dataset.",
    },
    {
      heading: "Sorting and Ranking",
      explanation:
        "sort_values() reorders rows by a column, useful for finding top or bottom performers in a dataset.",
      codeExample: 'top5 = df.sort_values("score", ascending=False).head(5)',
      language: "python",
      exercisePrompt: "Write code that finds the 3 lowest scores in a dataset.",
    },
    {
      heading: "Correlation",
      explanation:
        "corr() measures how strongly two numeric columns move together, from -1 for opposite to 1 for the same direction.",
      codeExample: 'correlation = df["hours_studied"].corr(df["score"])\nprint(correlation)',
      language: "python",
      exercisePrompt: "Explain what a correlation close to 0 would mean between two columns.",
    },
    {
      heading: "Drawing Conclusions",
      explanation:
        "The final step of analysis is turning numbers into a plain-language insight someone without a data background can understand.",
      codeExample: 'print("Students who studied more scored higher on average:", avg_by_category.max())',
      language: "python",
      exercisePrompt: "Write one sentence summarizing an insight from a dataset you have explored.",
    },
  ],
};

const cppFundamentals: SectionContent = {
  "Getting Started": [
    {
      heading: "Your First C++ Program",
      explanation:
        "Every C++ program starts with include directives and a main() function, the required entry point that runs first.",
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, RivoCode!" << endl;\n    return 0;\n}',
      language: "cpp",
      exercisePrompt: "Modify the program to print your name instead.",
    },
    {
      heading: "Compiling and Running",
      explanation:
        "C++ is a compiled language. A compiler translates your source file into an executable before it can run.",
      codeExample: '// Compile: g++ main.cpp -o main\n// Run:     ./main\n#include <iostream>\nint main() {\n    std::cout << "Compiled and running!";\n    return 0;\n}',
      language: "cpp",
      exercisePrompt: "Explain in a comment what the compiler does before your program can run.",
    },
    {
      heading: "Comments and Structure",
      explanation:
        "Two forward slashes start a single-line comment, and /* */ wraps a multi-line comment, both ignored by the compiler.",
      codeExample: '// This program greets the user\n#include <iostream>\nint main() {\n    std::cout << "Welcome!"; // prints a greeting\n    return 0;\n}',
      language: "cpp",
      exercisePrompt: "Add a comment above one line explaining what it does.",
    },
  ],
  "Variables & Data Types": [
    {
      heading: "Declaring Variables",
      explanation:
        "C++ variables must declare a type up front, such as int, double, char, or bool, before you can use them.",
      codeExample: "int age = 20;\ndouble price = 9.99;\nchar grade = 'A';\nbool isStudent = true;",
      language: "cpp",
      exercisePrompt: "Declare one variable of each type shown above with your own values.",
    },
    {
      heading: "Strings in C++",
      explanation:
        "The std::string type stores text and supports concatenation with the plus operator.",
      codeExample: '#include <string>\nstd::string name = "Alex";\nstd::string greeting = "Hello, " + name;',
      language: "cpp",
      exercisePrompt: "Create a string variable with your city name and print it.",
    },
    {
      heading: "Type Casting",
      explanation:
        "static_cast converts a value from one type to another, such as an int to a double for precise division.",
      codeExample: "int a = 7;\nint b = 2;\ndouble result = static_cast<double>(a) / b;",
      language: "cpp",
      exercisePrompt: "Cast an int to a double and divide it by another int to get a decimal result.",
    },
  ],
  "Operators & Conditionals": [
    {
      heading: "Arithmetic and Comparison Operators",
      explanation:
        "Plus, minus, star, slash, and percent perform math. Comparison operators compare two values and produce a bool.",
      codeExample: "int a = 10, b = 3;\nstd::cout << a % b << std::endl;\nstd::cout << (a > b) << std::endl;",
      language: "cpp",
      exercisePrompt: "Print the remainder of dividing 17 by 5 using the percent operator.",
    },
    {
      heading: "if / else if / else",
      explanation:
        "Conditionals run different blocks of code depending on whether an expression evaluates to true.",
      codeExample: 'int score = 85;\nif (score >= 90) {\n    std::cout << "A";\n} else if (score >= 80) {\n    std::cout << "B";\n} else {\n    std::cout << "C";\n}',
      language: "cpp",
      exercisePrompt: "Write an if/else chain that prints \"Pass\" for scores 60 and above.",
    },
    {
      heading: "Logical Operators",
      explanation:
        "The and, or, and not operators combine multiple boolean conditions into one.",
      codeExample: 'int age = 20;\nbool hasId = true;\nif (age >= 18 && hasId) {\n    std::cout << "Entry allowed";\n}',
      language: "cpp",
      exercisePrompt: "Write a condition using the or operator that checks if a number is negative or zero.",
    },
  ],
  Loops: [
    {
      heading: "for Loops",
      explanation:
        "A for loop repeats a block a fixed number of times, controlled by an initializer, condition, and increment.",
      codeExample: 'for (int i = 1; i <= 5; i++) {\n    std::cout << i << " ";\n}',
      language: "cpp",
      exercisePrompt: "Use a for loop to print the numbers 10 down to 1.",
    },
    {
      heading: "while and do-while Loops",
      explanation:
        "while checks its condition before each iteration. do-while runs the body at least once before checking.",
      codeExample: 'int count = 0;\nwhile (count < 3) {\n    std::cout << count << " ";\n    count++;\n}',
      language: "cpp",
      exercisePrompt: "Write a do-while loop that runs exactly once even if the condition starts false.",
    },
    {
      heading: "Looping Over Arrays",
      explanation:
        "A range-based for loop iterates over every element of an array without manual indexing.",
      codeExample: 'int nums[] = {1, 2, 3, 4};\nfor (int n : nums) {\n    std::cout << n << " ";\n}',
      language: "cpp",
      exercisePrompt: "Loop over an array of 5 numbers and print their sum.",
    },
  ],
  Functions: [
    {
      heading: "Declaring Functions",
      explanation:
        "A function has a return type, a name, and parameters. void means it returns nothing.",
      codeExample: "int add(int a, int b) {\n    return a + b;\n}\nint main() {\n    std::cout << add(3, 4);\n}",
      language: "cpp",
      exercisePrompt: "Write a function square(int n) that returns n multiplied by itself.",
    },
    {
      heading: "Pass by Value vs Reference",
      explanation:
        "By default, arguments are copied, which is called pass by value. Adding an ampersand makes a parameter a reference that modifies the original.",
      codeExample: "void increment(int &n) {\n    n = n + 1;\n}\nint x = 5;\nincrement(x); // x is now 6",
      language: "cpp",
      exercisePrompt: "Explain in a comment why increment(x) needed a reference to actually change x.",
    },
    {
      heading: "Function Overloading",
      explanation:
        "C++ lets you define multiple functions with the same name but different parameter types or counts.",
      codeExample: "int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }",
      language: "cpp",
      exercisePrompt: "Overload a function greet() to accept either no arguments or a name string.",
    },
  ],
  "Arrays & Pointers": [
    {
      heading: "Arrays",
      explanation:
        "An array holds a fixed-size sequence of elements of the same type, accessed by a zero-based index.",
      codeExample: "int scores[3] = {90, 85, 78};\nstd::cout << scores[0] << std::endl;",
      language: "cpp",
      exercisePrompt: "Create an array of 5 integers and print the last one.",
    },
    {
      heading: "Introduction to Pointers",
      explanation:
        "A pointer stores the memory address of a variable. The ampersand gets an address, and the asterisk dereferences a pointer to get its value.",
      codeExample: "int x = 10;\nint* p = &x;\nstd::cout << *p << std::endl;",
      language: "cpp",
      exercisePrompt: "Declare a pointer to an int variable and print the value it points to.",
    },
    {
      heading: "Pointers and Arrays",
      explanation:
        "An array's name decays to a pointer to its first element, which is why pointer arithmetic can walk through an array.",
      codeExample: "int arr[3] = {1, 2, 3};\nint* p = arr;\nstd::cout << *(p + 1) << std::endl;",
      language: "cpp",
      exercisePrompt: "Use pointer arithmetic to print the second element of an array.",
    },
    {
      heading: "Dynamic Memory with new/delete",
      explanation:
        "new allocates memory on the heap at runtime. delete frees it, and forgetting to delete causes a memory leak.",
      codeExample: "int* p = new int(42);\nstd::cout << *p << std::endl;\ndelete p;",
      language: "cpp",
      exercisePrompt: "Allocate an int with new, print its value, then free it with delete.",
    },
  ],
  "Classes & OOP": [
    {
      heading: "Defining a Class",
      explanation:
        "A class bundles data, called members, and behavior, called methods, together into a single reusable blueprint for objects.",
      codeExample: 'class Student {\npublic:\n    std::string name;\n    int age;\n};\nStudent s;\ns.name = "Alex";',
      language: "cpp",
      exercisePrompt: "Define a Course class with title and level members.",
    },
    {
      heading: "Constructors",
      explanation:
        "A constructor is a special method that runs automatically when an object is created, usually to set initial values.",
      codeExample: 'class Student {\npublic:\n    std::string name;\n    Student(std::string n) { name = n; }\n};\nStudent s("Alex");',
      language: "cpp",
      exercisePrompt: "Add a constructor to your Course class that sets title on creation.",
    },
    {
      heading: "Encapsulation with private",
      explanation:
        "private members can only be accessed inside the class itself, forcing outside code to go through public methods.",
      codeExample: "class Account {\nprivate:\n    double balance;\npublic:\n    void deposit(double amount) { balance += amount; }\n};",
      language: "cpp",
      exercisePrompt: "Explain why marking balance private prevents it from being changed directly.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a C++ Program",
      explanation:
        "Sketch what data your program needs, such as variables, arrays, or a class, and which functions you will write before coding.",
      codeExample: "// Project: Grade calculator\n// class Student { name, vector<int> scores }\n// function average(Student)",
      language: "cpp",
      exercisePrompt: "Write a plan, as comments, for a small C++ project of your choice.",
    },
    {
      heading: "Building and Testing",
      explanation:
        "Combine variables, functions, loops, and a class from this course into one working program, then test it with different inputs.",
      codeExample: "double average(int scores[], int count) {\n    int total = 0;\n    for (int i = 0; i < count; i++) total += scores[i];\n    return static_cast<double>(total) / count;\n}",
      language: "cpp",
      exercisePrompt: "Extend the average function above to also print a pass/fail message.",
    },
  ],
};

const javaFundamentals: SectionContent = {
  "Getting Started": [
    {
      heading: "Your First Java Program",
      explanation:
        "Every Java program lives inside a class, and execution begins in a special method called main. System.out.println prints a line of text to the console.",
      codeExample: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, RivoCode!");\n    }\n}',
      language: "java",
      exercisePrompt: "Change the program to print your own name instead.",
    },
    {
      heading: "Compiling and Running Java",
      explanation:
        "Java source files compile to bytecode with javac, then run on the Java Virtual Machine (JVM) with the java command — which is how the same compiled program can run on any device with a JVM installed.",
      codeExample: "// Compile: javac Main.java\n// Run:     java Main\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Compiled and running!\");\n    }\n}",
      language: "java",
      exercisePrompt: "Explain, in a comment, the difference between compiling and running a Java program.",
    },
    {
      heading: "Comments and Class Structure",
      explanation:
        "Two slashes start a single-line comment, and /* */ wraps a multi-line one. Every class name should match its filename exactly, which is a rule the compiler enforces.",
      codeExample: "// Greets the user\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome!\"); // prints a greeting\n    }\n}",
      language: "java",
      exercisePrompt: "Add a comment above one line of code explaining what it does.",
    },
  ],
  "Variables & Data Types": [
    {
      heading: "Declaring Variables",
      explanation:
        "Java is statically typed, so every variable declares its type up front — int for whole numbers, double for decimals, boolean for true/false, and String for text.",
      codeExample: 'int age = 20;\ndouble price = 9.99;\nboolean isStudent = true;\nString name = "Alex";',
      language: "java",
      exercisePrompt: "Declare one variable of each type shown above with your own values.",
    },
    {
      heading: "Primitive Types vs Objects",
      explanation:
        "Types like int and boolean are primitives that hold raw values directly. String and other capitalized types are objects, with their own built-in methods.",
      codeExample: 'String name = "Alex";\nSystem.out.println(name.length());\nSystem.out.println(name.toUpperCase());',
      language: "java",
      exercisePrompt: "Call two different String methods on a variable holding your name.",
    },
    {
      heading: "Type Casting",
      explanation:
        "Casting converts a value from one type to another, such as an int to a double, using parentheses around the target type.",
      codeExample: "int a = 7;\nint b = 2;\ndouble result = (double) a / b;\nSystem.out.println(result);",
      language: "java",
      exercisePrompt: "Cast an int to a double before dividing it by another int to get a decimal result.",
    },
  ],
  "Operators, Strings & Input": [
    {
      heading: "Arithmetic and Comparison Operators",
      explanation:
        "Plus, minus, star, slash, and percent perform arithmetic. Comparison operators like == and > compare values and produce a boolean result.",
      codeExample: "int a = 10, b = 3;\nSystem.out.println(a % b);\nSystem.out.println(a > b);",
      language: "java",
      exercisePrompt: "Print the remainder of dividing 17 by 5 using the percent operator.",
    },
    {
      heading: "Working with Strings",
      explanation:
        "Strings can be joined with the plus operator, and methods like .substring(), .indexOf(), and .replace() let you inspect and transform text.",
      codeExample: 'String first = "Rivo";\nString last = "Code";\nString full = first + last;\nSystem.out.println(full.toLowerCase());',
      language: "java",
      exercisePrompt: "Combine your first and last name into one string and print it in uppercase.",
    },
    {
      heading: "Getting User Input with Scanner",
      explanation:
        "The Scanner class reads input from the console, letting a program react to whatever the user types.",
      codeExample: 'import java.util.Scanner;\n\nScanner input = new Scanner(System.in);\nSystem.out.print("Enter your name: ");\nString name = input.nextLine();\nSystem.out.println("Hi, " + name);',
      language: "java",
      exercisePrompt: "Write code that reads a number from the user with Scanner and prints double that number.",
    },
  ],
  "Conditionals & Switch": [
    {
      heading: "if / else if / else",
      explanation:
        "Conditionals run different blocks of code depending on whether a boolean expression evaluates to true.",
      codeExample: 'int score = 85;\nif (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n} else {\n    System.out.println("C");\n}',
      language: "java",
      exercisePrompt: "Write an if/else chain that prints \"Pass\" for scores 60 and above.",
    },
    {
      heading: "Logical Operators",
      explanation:
        "&&, ||, and ! combine multiple boolean conditions into a single expression to check.",
      codeExample: 'int age = 20;\nboolean hasId = true;\nif (age >= 18 && hasId) {\n    System.out.println("Entry allowed");\n}',
      language: "java",
      exercisePrompt: "Write a condition using || that checks if a number is negative or zero.",
    },
    {
      heading: "Switch Statements",
      explanation:
        "A switch statement is a clean way to handle many possible exact-match values for one variable, using break to stop falling through to the next case.",
      codeExample: 'int day = 2;\nswitch (day) {\n    case 1:\n        System.out.println("Monday");\n        break;\n    case 2:\n        System.out.println("Tuesday");\n        break;\n    default:\n        System.out.println("Another day");\n}',
      language: "java",
      exercisePrompt: "Write a switch statement that prints a season name based on a month number.",
    },
  ],
  Loops: [
    {
      heading: "for Loops",
      explanation:
        "A for loop repeats a block a fixed number of times, controlled by an initializer, a condition, and an increment.",
      codeExample: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
      language: "java",
      exercisePrompt: "Use a for loop to print the numbers 10 down to 1.",
    },
    {
      heading: "while and do-while Loops",
      explanation:
        "while checks its condition before each iteration. do-while runs the loop body at least once before checking, which is useful for menus.",
      codeExample: 'int count = 0;\nwhile (count < 3) {\n    System.out.println(count);\n    count++;\n}',
      language: "java",
      exercisePrompt: "Write a do-while loop that runs exactly once even when its condition starts false.",
    },
    {
      heading: "Looping Over Arrays",
      explanation:
        "An enhanced for loop (for-each) iterates over every element of an array without manual indexing.",
      codeExample: 'int[] nums = {1, 2, 3, 4};\nfor (int n : nums) {\n    System.out.println(n);\n}',
      language: "java",
      exercisePrompt: "Loop over an array of 5 integers and print their sum.",
    },
  ],
  "Arrays & Collections": [
    {
      heading: "Arrays",
      explanation:
        "An array holds a fixed number of elements of the same type, accessed by a zero-based index, and its length never changes after creation.",
      codeExample: "int[] scores = {90, 85, 78};\nSystem.out.println(scores[0]);\nSystem.out.println(scores.length);",
      language: "java",
      exercisePrompt: "Create an array of 5 integers and print the last one using scores.length - 1.",
    },
    {
      heading: "ArrayList: A Resizable List",
      explanation:
        "Unlike arrays, an ArrayList can grow and shrink at runtime, with methods like .add() and .get() for working with its elements.",
      codeExample: 'import java.util.ArrayList;\n\nArrayList<String> names = new ArrayList<>();\nnames.add("Alex");\nnames.add("Sam");\nSystem.out.println(names.get(0));',
      language: "java",
      exercisePrompt: "Create an ArrayList of 3 course names and print the second one.",
    },
    {
      heading: "HashMap: Key-Value Pairs",
      explanation:
        "A HashMap stores key-value pairs, similar to a dictionary, letting you look up a value quickly by its key instead of by position.",
      codeExample: 'import java.util.HashMap;\n\nHashMap<String, Integer> ages = new HashMap<>();\nages.put("Alex", 20);\nSystem.out.println(ages.get("Alex"));',
      language: "java",
      exercisePrompt: "Create a HashMap mapping course names to their difficulty level, then print one value.",
    },
  ],
  "Object-Oriented Programming": [
    {
      heading: "Classes and Objects",
      explanation:
        "A class is a blueprint describing fields (data) and methods (behavior). An object is a specific instance created from that class with the new keyword.",
      codeExample: 'class Student {\n    String name;\n    int age;\n}\n\nStudent s = new Student();\ns.name = "Alex";\nSystem.out.println(s.name);',
      language: "java",
      exercisePrompt: "Define a Course class with title and level fields, then create one instance.",
    },
    {
      heading: "Constructors and Inheritance",
      explanation:
        "A constructor runs automatically when an object is created, usually to set initial field values. The extends keyword lets one class inherit fields and methods from another.",
      codeExample: 'class Animal {\n    void speak() { System.out.println("..."); }\n}\n\nclass Dog extends Animal {\n    Dog() { System.out.println("A dog was created"); }\n    void speak() { System.out.println("Woof!"); }\n}',
      language: "java",
      exercisePrompt: "Add a constructor to your Course class that sets title when the object is created.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a Java Program",
      explanation:
        "Sketch what data your program needs — variables, an array, or a class — and which methods you will write before coding.",
      codeExample: "// Project: Grade calculator\n// class Student { name, int[] scores }\n// method average(Student s)",
      language: "java",
      exercisePrompt: "Write a plan, as comments, for a small Java project of your choice.",
    },
    {
      heading: "Building and Testing",
      explanation:
        "Combine variables, arrays, loops, and a class from this course into one working program, then test it with different inputs.",
      codeExample: 'static double average(int[] scores) {\n    int total = 0;\n    for (int s : scores) total += s;\n    return (double) total / scores.length;\n}',
      language: "java",
      exercisePrompt: "Extend the average method above to also print a pass/fail message.",
    },
  ],
};

const sqlFundamentals: SectionContent = {
  "Database Basics": [
    {
      heading: "What is a Relational Database?",
      explanation:
        "A relational database organizes data into tables made of rows and columns, with relationships between tables linked by shared keys.",
      codeExample: "-- A table stores rows of structured data\n-- students(id, name, age)\n-- courses(id, title, level)",
      language: "sql",
      exercisePrompt: "Sketch, as a comment, the columns you would need for an orders table.",
    },
    {
      heading: "Creating a Table",
      explanation:
        "CREATE TABLE defines a table's structure: its columns, each column's data type, and constraints like PRIMARY KEY.",
      codeExample: "CREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    age INT\n);",
      language: "sql",
      exercisePrompt: "Write a CREATE TABLE statement for a courses table with id, title, and level columns.",
    },
    {
      heading: "Common Data Types",
      explanation:
        "INT stores whole numbers, VARCHAR stores variable-length text, and DATE stores calendar dates — picking the right type keeps data consistent.",
      codeExample: "CREATE TABLE enrollments (\n    id INT PRIMARY KEY,\n    student_id INT,\n    enrolled_on DATE\n);",
      language: "sql",
      exercisePrompt: "Add a VARCHAR column for a status field to the enrollments table above.",
    },
  ],
  "Inserting & Querying Data": [
    {
      heading: "Inserting Rows",
      explanation:
        "INSERT INTO adds a new row to a table, specifying which columns you are filling in and their values.",
      codeExample: "INSERT INTO students (id, name, age)\nVALUES (1, 'Alex', 20);",
      language: "sql",
      exercisePrompt: "Write an INSERT statement that adds a second student to the table.",
    },
    {
      heading: "Selecting Data",
      explanation:
        "SELECT retrieves data from a table. The star selects every column, while naming specific columns retrieves only those.",
      codeExample: "SELECT * FROM students;\nSELECT name, age FROM students;",
      language: "sql",
      exercisePrompt: "Write a SELECT statement that returns only the name column from students.",
    },
    {
      heading: "Filtering with WHERE",
      explanation:
        "WHERE narrows a query down to only the rows that match a condition, using comparison operators just like other languages.",
      codeExample: "SELECT * FROM students\nWHERE age >= 18;",
      language: "sql",
      exercisePrompt: "Write a query that selects students older than 21.",
    },
  ],
  "Filtering & Sorting": [
    {
      heading: "Sorting with ORDER BY",
      explanation:
        "ORDER BY sorts query results by one or more columns, ascending by default or descending with DESC.",
      codeExample: "SELECT name, age FROM students\nORDER BY age DESC;",
      language: "sql",
      exercisePrompt: "Write a query that sorts students by name in ascending order.",
    },
    {
      heading: "Limiting Results",
      explanation:
        "LIMIT restricts how many rows a query returns, useful for previewing data or building a \"top N\" list.",
      codeExample: "SELECT * FROM students\nORDER BY age DESC\nLIMIT 5;",
      language: "sql",
      exercisePrompt: "Write a query that returns only the 3 oldest students.",
    },
    {
      heading: "Pattern Matching with LIKE",
      explanation:
        "LIKE finds rows matching a text pattern, where % matches any sequence of characters and _ matches a single character.",
      codeExample: "SELECT * FROM students\nWHERE name LIKE 'A%';",
      language: "sql",
      exercisePrompt: "Write a query that finds all students whose name ends with the letter n.",
    },
  ],
  "Updating & Deleting": [
    {
      heading: "Updating Rows",
      explanation:
        "UPDATE changes existing data in a table. Always pair it with a WHERE clause, or every row in the table will be updated.",
      codeExample: "UPDATE students\nSET age = 21\nWHERE id = 1;",
      language: "sql",
      exercisePrompt: "Write an UPDATE statement that changes one student's name.",
    },
    {
      heading: "Deleting Rows",
      explanation:
        "DELETE removes rows from a table. Like UPDATE, a missing WHERE clause means every row gets deleted.",
      codeExample: "DELETE FROM students\nWHERE id = 2;",
      language: "sql",
      exercisePrompt: "Write a DELETE statement that removes students younger than 18.",
    },
  ],
  Joins: [
    {
      heading: "Why Joins?",
      explanation:
        "Relational data is split across multiple tables to avoid repetition. A JOIN combines rows from two tables based on a shared column.",
      codeExample: "-- students(id, name)\n-- enrollments(student_id, course_id)\n-- Join them on students.id = enrollments.student_id",
      language: "sql",
      exercisePrompt: "Explain, as a comment, why storing enrollments in a separate table avoids duplicating student data.",
    },
    {
      heading: "INNER JOIN",
      explanation:
        "INNER JOIN returns only the rows that have a match in both tables being joined.",
      codeExample: "SELECT students.name, courses.title\nFROM students\nINNER JOIN enrollments ON students.id = enrollments.student_id\nINNER JOIN courses ON enrollments.course_id = courses.id;",
      language: "sql",
      exercisePrompt: "Explain what would happen to a student with no enrollments in an INNER JOIN.",
    },
    {
      heading: "LEFT JOIN",
      explanation:
        "LEFT JOIN returns every row from the left table, filling in NULLs for any columns from the right table that have no match.",
      codeExample: "SELECT students.name, enrollments.course_id\nFROM students\nLEFT JOIN enrollments ON students.id = enrollments.student_id;",
      language: "sql",
      exercisePrompt: "Explain when you would prefer LEFT JOIN over INNER JOIN.",
    },
  ],
  "Aggregation & Grouping": [
    {
      heading: "Aggregate Functions",
      explanation:
        "COUNT, SUM, AVG, MIN, and MAX compute a single summary value across many rows.",
      codeExample: "SELECT COUNT(*) FROM students;\nSELECT AVG(age) FROM students;",
      language: "sql",
      exercisePrompt: "Write a query that returns the oldest age in the students table using MAX.",
    },
    {
      heading: "Grouping with GROUP BY",
      explanation:
        "GROUP BY splits rows into groups, such as by category, so an aggregate function can be computed once per group instead of across the whole table.",
      codeExample: "SELECT level, COUNT(*) AS total\nFROM courses\nGROUP BY level;",
      language: "sql",
      exercisePrompt: "Write a query that counts how many students exist for each age.",
    },
    {
      heading: "Filtering Groups with HAVING",
      explanation:
        "WHERE filters rows before grouping; HAVING filters groups after aggregation, which is why COUNT and other aggregates can appear in a HAVING clause but not in WHERE.",
      codeExample: "SELECT level, COUNT(*) AS total\nFROM courses\nGROUP BY level\nHAVING COUNT(*) > 2;",
      language: "sql",
      exercisePrompt: "Write a query that finds ages shared by more than one student, using GROUP BY and HAVING.",
    },
  ],
};

const csharpFundamentals: SectionContent = {
  "Getting Started": [
    {
      heading: "Your First C# Program",
      explanation:
        "A C# program's entry point is the Main method inside a class. Console.WriteLine prints a line of text to the console.",
      codeExample: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, RivoCode!");\n    }\n}',
      language: "csharp",
      exercisePrompt: "Modify the program to print your own name instead.",
    },
    {
      heading: "Building and Running with .NET",
      explanation:
        "The dotnet CLI compiles and runs C# projects. dotnet run builds your code and immediately executes it.",
      codeExample: "// Run: dotnet run\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Running with dotnet!\");\n    }\n}",
      language: "csharp",
      exercisePrompt: "Explain, in a comment, what the dotnet run command does.",
    },
    {
      heading: "Comments and Structure",
      explanation:
        "Two slashes start a single-line comment, and /* */ wraps a multi-line one, both ignored by the compiler.",
      codeExample: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Welcome!"); // prints a greeting\n    }\n}',
      language: "csharp",
      exercisePrompt: "Add a comment above one line explaining what it does.",
    },
  ],
  "Variables & Data Types": [
    {
      heading: "Declaring Variables",
      explanation:
        "C# is statically typed — int, double, bool, and string are the most common types, each declared before use.",
      codeExample: 'int age = 20;\ndouble price = 9.99;\nbool isStudent = true;\nstring name = "Alex";',
      language: "csharp",
      exercisePrompt: "Declare one variable of each type shown above with your own values.",
    },
    {
      heading: "The var Keyword",
      explanation:
        "var lets the compiler infer a variable's type from its initial value, while still keeping the type fixed and checked at compile time.",
      codeExample: 'var name = "Alex"; // inferred as string\nvar age = 20;      // inferred as int',
      language: "csharp",
      exercisePrompt: "Declare two variables with var and explain what type each was inferred as.",
    },
    {
      heading: "Constants with const",
      explanation:
        "const declares a value that cannot change after it is set, useful for values like a fixed tax rate or maximum size.",
      codeExample: "const double TaxRate = 0.08;\nConsole.WriteLine(TaxRate);",
      language: "csharp",
      exercisePrompt: "Declare a const for a discount percentage and use it in a calculation.",
    },
  ],
  "Strings & Numbers": [
    {
      heading: "Working with Strings",
      explanation:
        "Strings can be combined with the plus operator or with string interpolation, which embeds variables directly using a dollar sign and curly braces.",
      codeExample: 'string name = "Alex";\nstring greeting = $"Hello, {name}!";\nConsole.WriteLine(greeting);',
      language: "csharp",
      exercisePrompt: "Use string interpolation to print a sentence combining two variables.",
    },
    {
      heading: "Numeric Operations",
      explanation:
        "C# supports the usual arithmetic operators, and dividing two ints performs integer division unless you cast one to a double.",
      codeExample: "int a = 7, b = 2;\ndouble result = (double)a / b;\nConsole.WriteLine(result);",
      language: "csharp",
      exercisePrompt: "Cast an int to a double before dividing to get a precise decimal result.",
    },
    {
      heading: "Reading User Input",
      explanation:
        "Console.ReadLine() reads a line of text typed by the user, which always comes back as a string that you may need to convert.",
      codeExample: 'Console.Write("Enter your age: ");\nstring input = Console.ReadLine();\nint age = int.Parse(input);\nConsole.WriteLine(age + 1);',
      language: "csharp",
      exercisePrompt: "Write code that reads a name from the console and prints a greeting using it.",
    },
  ],
  Conditionals: [
    {
      heading: "if / else if / else",
      explanation:
        "Conditionals run different blocks of code depending on whether a boolean expression evaluates to true.",
      codeExample: 'int score = 85;\nif (score >= 90) {\n    Console.WriteLine("A");\n} else if (score >= 80) {\n    Console.WriteLine("B");\n} else {\n    Console.WriteLine("C");\n}',
      language: "csharp",
      exercisePrompt: "Write an if/else chain that prints \"Pass\" for scores 60 and above.",
    },
    {
      heading: "Logical Operators",
      explanation:
        "&&, ||, and ! combine multiple boolean conditions into a single expression to check.",
      codeExample: 'int age = 20;\nbool hasId = true;\nif (age >= 18 && hasId) {\n    Console.WriteLine("Entry allowed");\n}',
      language: "csharp",
      exercisePrompt: "Write a condition using || that checks if a number is negative or zero.",
    },
    {
      heading: "Switch Statements",
      explanation:
        "A switch statement handles many possible exact-match values for one variable cleanly, using break to end each case.",
      codeExample: 'int day = 2;\nswitch (day) {\n    case 1:\n        Console.WriteLine("Monday");\n        break;\n    case 2:\n        Console.WriteLine("Tuesday");\n        break;\n    default:\n        Console.WriteLine("Another day");\n        break;\n}',
      language: "csharp",
      exercisePrompt: "Write a switch statement that prints a season name based on a month number.",
    },
  ],
  Loops: [
    {
      heading: "for Loops",
      explanation:
        "A for loop repeats a block a fixed number of times, controlled by an initializer, a condition, and an increment.",
      codeExample: 'for (int i = 1; i <= 5; i++) {\n    Console.WriteLine(i);\n}',
      language: "csharp",
      exercisePrompt: "Use a for loop to print the numbers 10 down to 1.",
    },
    {
      heading: "while Loops",
      explanation:
        "A while loop repeats as long as its condition stays true, useful when you don't know the exact number of iterations in advance.",
      codeExample: 'int count = 0;\nwhile (count < 3) {\n    Console.WriteLine(count);\n    count++;\n}',
      language: "csharp",
      exercisePrompt: "Write a while loop that keeps doubling a number starting at 1 until it exceeds 100.",
    },
    {
      heading: "Looping Over Arrays",
      explanation:
        "A foreach loop iterates over every element in an array or collection without manual indexing.",
      codeExample: 'int[] nums = {1, 2, 3, 4};\nforeach (int n in nums) {\n    Console.WriteLine(n);\n}',
      language: "csharp",
      exercisePrompt: "Loop over an array of 5 integers and print their sum.",
    },
  ],
  "Arrays & Methods": [
    {
      heading: "Arrays",
      explanation:
        "An array holds a fixed number of elements of the same type, accessed by a zero-based index.",
      codeExample: "int[] scores = {90, 85, 78};\nConsole.WriteLine(scores[0]);\nConsole.WriteLine(scores.Length);",
      language: "csharp",
      exercisePrompt: "Create an array of 5 integers and print the last one using scores.Length - 1.",
    },
    {
      heading: "Defining Methods",
      explanation:
        "A method has a return type, a name, and parameters. void means it returns nothing, similar to functions in other languages.",
      codeExample: "static int Add(int a, int b) {\n    return a + b;\n}\n\nConsole.WriteLine(Add(3, 4));",
      language: "csharp",
      exercisePrompt: "Write a method Square(int n) that returns n multiplied by itself.",
    },
    {
      heading: "Lists",
      explanation:
        "Unlike arrays, a List<T> can grow and shrink at runtime, with methods like .Add() and .Remove() for managing its elements.",
      codeExample: 'using System.Collections.Generic;\n\nList<string> names = new List<string>();\nnames.Add("Alex");\nConsole.WriteLine(names[0]);',
      language: "csharp",
      exercisePrompt: "Create a List<string> of 3 course names and print the second one.",
    },
  ],
  "Classes & OOP": [
    {
      heading: "Classes and Objects",
      explanation:
        "A class is a blueprint describing properties (data) and methods (behavior). An object is a specific instance created from that class with the new keyword.",
      codeExample: 'class Student {\n    public string Name;\n    public int Age;\n}\n\nStudent s = new Student();\ns.Name = "Alex";\nConsole.WriteLine(s.Name);',
      language: "csharp",
      exercisePrompt: "Define a Course class with Title and Level properties, then create one instance.",
    },
    {
      heading: "Constructors and Inheritance",
      explanation:
        "A constructor runs automatically when an object is created, usually to set initial values. The colon syntax lets one class inherit from another.",
      codeExample: 'class Animal {\n    public virtual void Speak() { Console.WriteLine("..."); }\n}\n\nclass Dog : Animal {\n    public override void Speak() { Console.WriteLine("Woof!"); }\n}',
      language: "csharp",
      exercisePrompt: "Add a constructor to your Course class that sets Title when the object is created.",
    },
  ],
  "Final Project": [
    {
      heading: "Planning a C# Program",
      explanation:
        "Sketch what data your program needs — variables, an array or list, or a class — and which methods you will write before coding.",
      codeExample: "// Project: Grade calculator\n// class Student { Name, List<int> Scores }\n// method Average(Student s)",
      language: "csharp",
      exercisePrompt: "Write a plan, as comments, for a small C# project of your choice.",
    },
    {
      heading: "Building and Testing",
      explanation:
        "Combine variables, arrays or lists, loops, and a class from this course into one working program, then test it with different inputs.",
      codeExample: 'static double Average(int[] scores) {\n    int total = 0;\n    foreach (int s in scores) total += s;\n    return (double)total / scores.Length;\n}',
      language: "csharp",
      exercisePrompt: "Extend the Average method above to also print a pass/fail message.",
    },
  ],
};

const contentBank: Record<string, SectionContent> = {
  "javascript-fundamentals": javascriptFundamentals,
  "html-css": htmlCss,
  "react-essentials": reactEssentials,
  "python-basics": pythonBasics,
  "typescript-in-depth": typescriptInDepth,
  "nodejs-fundamentals": nodejsFundamentals,
  "git-github": gitGithub,
  "data-science-intro": dataScienceIntro,
  "cpp-fundamentals": cppFundamentals,
  "java-fundamentals": javaFundamentals,
  "sql-fundamentals": sqlFundamentals,
  "csharp-fundamentals": csharpFundamentals,
};

const courseLanguage: Record<string, string> = {
  "javascript-fundamentals": "javascript",
  "html-css": "html",
  "react-essentials": "jsx",
  "python-basics": "python",
  "typescript-in-depth": "typescript",
  "nodejs-fundamentals": "javascript",
  "git-github": "bash",
  "data-science-intro": "python",
  "cpp-fundamentals": "cpp",
  "java-fundamentals": "java",
  "sql-fundamentals": "sql",
  "csharp-fundamentals": "csharp",
};

const courseFocus: Record<string, string> = {
  "html-css": "semantic structure, readable styling, and responsive decisions",
  "react-essentials": "component boundaries, predictable state, and maintainable UI behavior",
  "python-basics": "clear problem solving, data handling, and small reusable programs",
  "typescript-in-depth": "safe contracts that catch mistakes before a user sees them",
  "nodejs-fundamentals": "server-side JavaScript, dependable APIs, and useful developer tooling",
  "git-github": "a repeatable team workflow that makes every change easy to review and undo",
  "data-science-intro": "reliable data preparation, honest analysis, and clear communication",
  "cpp-fundamentals": "performance-aware programs, memory safety, and strong engineering habits",
  "java-fundamentals": "typed application design, object-oriented thinking, and practical problem solving",
  "sql-fundamentals": "asking precise questions of data while keeping it accurate and secure",
  "csharp-fundamentals": "structured application logic and the .NET conventions used by professional teams",
};

const lessonPhases = [
  { title: "Build the mental model", goal: "Name the moving pieces and explain what each one is responsible for before you start typing." },
  { title: "Write the smallest working version", goal: "Make one tiny example work first, then change one input at a time and observe the result." },
  { title: "Trace and debug", goal: "Deliberately test an edge case, read the output, and use the failure to understand the rule instead of guessing." },
  { title: "Use a production pattern", goal: "Refactor the first draft for clear names, one responsibility per block, and behavior another developer can safely change." },
  { title: "Ship a focused feature", goal: "Combine the idea with an earlier skill, document the trade-off you made, and check the result as a user would." },
];

function fallbackCode(language: string, sectionTitle: string, phase: string) {
  const label = sectionTitle.replace(/[^a-zA-Z0-9]/g, " ").trim();
  if (language === "python") return `# ${label}: ${phase}\ndef practice(value):\n    return value\n\nprint(practice("change one input, then inspect the output"))`;
  if (language === "java") return `// ${label}: ${phase}\nclass Practice {\n  static String check(String value) {\n    return value;\n  }\n}`;
  if (language === "csharp") return `// ${label}: ${phase}\nstring Check(string value)\n{\n    return value;\n}\n\nConsole.WriteLine(Check("inspect the result"));`;
  if (language === "cpp") return `// ${label}: ${phase}\n#include <iostream>\n\nint main() {\n  std::cout << "inspect the result";\n}`;
  if (language === "sql") return `-- ${label}: ${phase}\nselect\n  'inspect the result' as checkpoint;`;
  if (language === "html") return `<!-- ${label}: ${phase} -->\n<section class="practice-card">\n  <h2>One focused experiment</h2>\n  <p>Change one decision and inspect the result.</p>\n</section>`;
  if (language === "jsx") return `// ${label}: ${phase}\nexport function PracticeCard() {\n  return <p>Change one input, then inspect the result.</p>;\n}`;
  return `// ${label}: ${phase}\nconst checkpoint = "change one input, then inspect the result";\nconsole.log(checkpoint);`;
}

function commentPrefix(language: string) {
  if (language === "python" || language === "bash") return "#";
  if (language === "sql") return "--";
  if (language === "html") return "<!--";
  return "//";
}

function variationCode(language: string, sectionTitle: string) {
  const topic = sectionTitle.replace(/[^a-zA-Z0-9]/g, " ").trim();
  if (language === "python") return `def inspect_${topic.toLowerCase().replaceAll(" ", "_")}(value):\n    return {"input": value, "type": type(value).__name__}\n\nprint(inspect_${topic.toLowerCase().replaceAll(" ", "_")}(42))`;
  if (language === "html") return `<article class="${topic.toLowerCase().replaceAll(" ", "-")}-demo">\n  <h2>Change one thing</h2>\n  <p>Then inspect the browser result.</p>\n</article>`;
  if (language === "sql") return `select\n  '${topic}' as topic,\n  'inspect one result' as next_step;`;
  if (language === "jsx") return `export function ${topic.replaceAll(" ", "")}Checkpoint() {\n  const step = "change one input";\n  return <p>{step}</p>;\n}`;
  return `const topic = "${topic}";\nconst inputs = ["first", "second"];\n\nfor (const input of inputs) {\n  console.log({ topic, input });\n}`;
}

function fallbackContent(courseId: string, sectionTitle: string, partIndex: number, lessonTitle: string): LessonContentBlock {
  const language = courseLanguage[courseId] ?? "javascript";
  const phase = lessonPhases[Math.min(partIndex, lessonPhases.length - 1)];
  const focus = courseFocus[courseId] ?? "clear engineering thinking and deliberate practice";
  return {
    heading: `${lessonTitle}: ${phase.title}`,
    explanation:
      `This lesson develops ${sectionTitle} through a deliberate, test-first workflow. Rather than collecting syntax by memory, you will make a prediction, write a small program, inspect the result, and explain the behavior in your own words. That loop is how a short tutorial becomes a durable skill.\n\n${sectionTitle} supports ${focus}. Begin with the smallest example that demonstrates one rule. Give names to the inputs, decide what output you expect, and only then run it. If the output surprises you, that is useful evidence—not a failure.\n\n${phase.goal} Work in small changes: edit one value, one condition, one selector, or one line at a time. A fast feedback loop is more valuable than a large solution you cannot explain.\n\nAs you work, ask three engineering questions: What does this code receive? What does it produce? What assumption would break first if a real user gave unusual input? Those questions scale from beginner exercises to production code.\n\nBefore moving on, write a one-sentence summary of the rule you learned and keep the final version of your example. Tiny, verified examples become a personal reference library you can reuse in later projects.`,
    syntax: `Reliable practice loop\n1. Predict the output before running\n2. Build one minimal example\n3. Run or preview it\n4. Change exactly one input\n5. Compare expectation with evidence\n6. Explain the rule in one sentence`,
    codeExample: fallbackCode(language, sectionTitle, phase.title),
    language,
    examples: [
      {
        heading: "Inspect one variation",
        code: variationCode(language, sectionTitle),
        language,
        note: "Run this version, then alter only one input. Compare the new result with your prediction before you make another change.",
      },
      {
        heading: "Debug checkpoint",
        code: `${commentPrefix(language)} Before changing more code, answer:\n${commentPrefix(language)} 1. What input am I testing?\n${commentPrefix(language)} 2. What result do I expect?\n${commentPrefix(language)} 3. What evidence proves it?\n${commentPrefix(language)} 4. What edge case should I try next?`,
        language,
        note: "If the result surprises you, reduce the example until only one behavior is left. That smaller behavior is the real lesson.",
      },
    ],
    note: "A polished solution is usually a sequence of small verified steps, not one clever jump. Optimize for clarity first; optimize for speed only after you can measure it. Keep your names descriptive enough that another developer can understand your intent without reading every line.",
    exercisePrompt: `Build a small ${sectionTitle} example for a real scenario you care about. First make the simplest version work. Then add one realistic variation, test an unusual input or state, and write a comment that explains the design choice you made.`,
  };
}

export function getLessonContent(
  courseId: string,
  sectionTitle: string,
  partIndex: number,
  lessonTitle: string
): LessonContentBlock {
  const block = contentBank[courseId]?.[sectionTitle]?.[partIndex];
  if (block) return block;
  return fallbackContent(courseId, sectionTitle, partIndex, lessonTitle);
}
