### 1) What is the difference between `var`, `let`, and `const`?

- **var**

  - Function scoped (ফাংশনের ভেতরে কাজ করে)।
  - Re-declare এবং re-assign করা যায়।
  - Hoisting হয় (কোডের উপরে উঠে যায়)।

- **let**

  - Block scoped ( `{}` এর ভেতরে সীমাবদ্ধ থাকে)।
  - Re-assign করা যায়, কিন্তু re-declare করা যায় না।
  - Hoisting হয় কিন্তু "temporal dead zone"-এ থাকার কারণে আগে ব্যবহার করা যায় না।

- **const**
  - Block scoped।
  - একবার ভ্যালু assign করলে পুনরায় re-assign বা re-declare করা যায় না।
  - সাধারণত কনস্ট্যান্ট ভ্যালু রাখার জন্য ব্যবহার হয়।

### 2) What is the difference between `map()`, `forEach()`, and `filter()`?

- **map()**

  - নতুন একটি array return করে।
  - প্রতিটি element কে transform করে নতুন array তৈরি করে।
  - Example:
    ```js
    const nums = [1, 2, 3];
    const squared = nums.map((n) => n * n); // [1, 4, 9]
    ```

- **forEach()**

  - নতুন array return করে না।
  - শুধু iteration করে কাজ চালায় (side effects এর জন্য ভালো)।
  - Example:
    ```js
    const nums = [1, 2, 3];
    nums.forEach((n) => console.log(n)); // 1, 2, 3
    ```

- **filter()**
  - শর্ত অনুযায়ী element বাছাই করে নতুন array return করে।
  - Example:
    ```js
    const nums = [1, 2, 3, 4];
    const evens = nums.filter((n) => n % 2 === 0); // [2, 4]
    ```

### 3) What are arrow functions in ES6?

- Arrow function হলো ES6 এর একটি নতুন syntax যা function লেখাকে সংক্ষিপ্ত ও পরিষ্কার করে।
- function এর বাইরে থেকে `this` নেয়।

#### 4) How does destructuring assignment work in ES6?

- Destructuring assignment এর মাধ্যমে object বা array থেকে value আলাদা ভেরিয়েবলে সহজে নেওয়া যায়।

#### 5) Explain template literals in ES6. How are they different from string concatenation?

- Template literals ব্যাকটিক (`) দিয়ে লেখা হয়।
- ${} ব্যবহার করে string এর ভেতরে variable বা expression রাখা যায়।
- Multiline string লেখাও সম্ভব।
