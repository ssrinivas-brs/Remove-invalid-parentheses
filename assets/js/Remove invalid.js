function removeInvalidParentheses() {
    const inputString = document.getElementById('inputString').value;
    const resultElement = document.getElementById('result');

    // Function to remove invalid parentheses
    function isValid(s) {
        let count = 0;

        for (const char of s) {
            if (char === '(') {
                count++;
            } else if (char === ')') {
                if (count === 0) {
                    return false;
                }
                count--;
            }
        }

        return count === 0;
    }

    function removeHelper(s, start, lastRemoved, result) {
        let count = 0;

        for (let i = start; i < s.length; i++) {
            if (s[i] === '(') {
                count++;
            } else if (s[i] === ')') {
                count--;
            }

            if (count >= 0) {
                continue;
            }

            for (let j = lastRemoved; j <= i; j++) {
                if (s[j] === ')' && (j === lastRemoved || s[j - 1] !== ')')) {
                    removeHelper(s.substring(0, j) + s.substring(j + 1), i, j, result);
                }
            }

            return;
        }

        const reversed = s.split('').reverse().join('');

        if (count === 0) {
            result.add(s);
        } else {
            removeHelper(reversed, 0, 0, result);
        }
    }

    const result = new Set();
    removeHelper(inputString, 0, 0, result);

    // Display the result
    resultElement.innerHTML = '';
    result.forEach(validString => {
        const listItem = document.createElement('li');
        listItem.textContent = validString;
        resultElement.appendChild(listItem);
    });
}