

                              // ------------- Task 4-------------

function countVowels(str) {
    let c = 0;
    let vowels = "aeiou";

    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            c++;
        }
    }

    return c;
}
console.log(countVowels("javascript"));




                                    // ------------- Task 5-------------

function removeDuplicates(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }

    return result;
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4]));




                                  // ------------- Task 6-------------

function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return str === str.split("").reverse().join("");
}
console.log(isPalindrome("ab--ba"));



                              // ------------- Task 7-------------

function titleCase(str) {
    let words = str.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
}

console.log(titleCase("my name is k"));


