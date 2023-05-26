---
title: 'Testing Experiment Reveals GPT-4''s 61% Accuracy in Detecting Unsolvable Questions'
date: 2023-05-17 18:41:04
---

## Introduction:

In today's rapidly evolving technological landscape, Large Language Models (LLMs) such as GPT-4 are becoming increasingly sophisticated. However, these models are not without their limitations, one of the main ones being confabulation, where the model generates information that might not be factual or accurate. To combat this, we utilized the OpenAI Evals framework, a tool designed for systematically testing and improving the performance of LLMs. In this post, we will guide you through our process of creating an evaluation that focuses on unsolvable questions alongside contextual information, aimed at reducing confabulation in GPT-4.

## 1. Defining Confabulation and Unsolvable Questions:

Confabulation refers to the generation of information by the language model that might not be factual or substantiated. Our primary objective with the "Unsolvable Questions Evaluation" was to assess GPT-4's capability in discerning and responding aptly to these unsolvable questions alongside contextual information, thereby highlighting its tendencies to confabulate. As more people build contextual integrations with GPT, it will be important that GPT can deal with answering questions truthfully alongside context.

## 2. Harnessing the Power of OpenAI Evals:

In order to effectively assess GPT-4's performance, we utilized the [OpenAI Evals](https://github.com/openai/evals) framework. This tool facilitated a structured approach to our evaluation process, ensuring we targeted and measured key performance indicators in a systematic way.

## 3. Building the Dataset:

The dataset used for our evaluation was a modified version of the Stanford Question Answering Dataset (SQuAD), a collection of over 150,000 crowd-sourced questions based on Wikipedia articles. Our focus was on the SQuAD2.0 dataset, which includes over 50,000 unsolvable questions. In order to adapt this dataset for our purposes, we reformatted it into a chat format that GPT-4 could understand, concentrating on 318 samples containing unsolvable questions.

This section will detail the technical process of how we extracted a unique set of questions from the larger SQuAD2.0 dataset. We'll provide a walkthrough of the Node.js script used to parse through the dataset and curate our subset of examples.

```javascript
/* SQuAD2.0 data converter

BEFORE PROCEEDING: Download train.json from the official repo:
https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v2.0.json

Download the file, rename it to train.json, and put it in this folder, and you are ready to go. :)

*/

const fs = require("fs");
const { Transform } = require("stream");

const inputFile = fs.readFileSync("train.json");
const outputFile = fs.createWriteStream("samples.jsonl");
```
In this initial part of the script, we're loading the `fs` (file system) and `stream` modules from Node.js. We then read the input file (`train.json`) and prepare an output file stream (`samples.jsonl`) for writing.

The next chunk of code is our `Transform` stream, which is used to parse and reformat each line of the input data:

```javascript
const processLine = new Transform({
  objectMode: true,
  transform(line, _, done) {
    if (!line) return done();

    let obj;
    try {
      obj = JSON.parse(line);
    } catch (err) {
      return done(new Error(`Failed to parse JSON: ${err.message}`));
    }

    const indexToAnswer = (bool) => {
      if (bool) {
        return "Unsolveable";
      }
      return "Solveable";
    };

    const transformedObj = {
      input: [
        { role: "system", content: 'You are UnsolvableGPT. You will be provided a question and some context for the question. Using only the context to answer the question determine if it is "Solveable" or "Unsolveable". Respond with only one word without punctuation, either: "Solveable": The submitted question is solvable with the context provided alongside it and no other outside information OR "Unsolveable": The submitted question is unsolvable with the context provided alongside it. There is not enough context to answer the question. Remember, only answer with "Solveable" OR "Unsolveable", do not include anything else.'},
        { role: "user", content: `Question: ${obj["question"]}\n Context: ${obj["context"]}` }
      ], ideal: indexToAnswer(obj["is_impossible"]),
    };

    this.push(JSON.stringify(transformedObj) + "\n");
    done();
  },
});
```

The `transform` function parses each line into JSON and checks for the question's solvability. It then formats this information into a new JSON object that's suitable for our chat model.

Finally, we parse the entire input file, iterate over the contents, and selectively write the questions we're interested in to our output file:

```javascript
const parsedFile = JSON.parse(inputFile);
console.log(parsedFile);

for (let i = 0; i < parsedFile.data.length; i++) {
  const currentDocument = parsedFile.data[i];
  currentDocument.paragraphs.forEach((paragraph) => {
    const context = paragraph.context;
    // Generate a diverse training set by picking only 2 questions from each topic
    // Ensure an equal balance of unsolvable and solvable questions
    // Randomly select questions

    if (context.length > 1500 || context.length < 500 || Math.random() < 0.98) {
      return;
    }
    const possibleToAnswer = paragraph.qas.find(qa => !Boolean(qa.is_impossible));
    const impossibleToAnswer = paragraph.qas.find(qa => Boolean(qa.is_impossible));
    if(possibleToAnswer && impossibleToAnswer) {
      possibleToAnswer.context = context;
      impossibleToAnswer.context = context;
      processLine.write(JSON.stringify(possibleToAnswer) + "\n");
      processLine.write(JSON.stringify(impossibleToAnswer) + "\n");
    }
  });
}
processLine.pipe(outputFile);
outputFile.on("error", (err) => console.error(`Error: ${err.message}`)).on("finish", () => console.log("Output file created successfully."));
```

The loop traverses each document, paragraph by paragraph, with a focus on creating a balanced and diverse set of questions for the model. We are only considering context lengths between 500 and 1500 characters to ensure manageability. We also impose a randomness factor to promote diversity in the final selection. For each paragraph that meets these criteria, we look for one solvable and one unsolvable question, if available. We then write both to our output file, thereby creating a balanced subset of solvable and unsolvable questions.

## 4. Conducting the Evaluation and Highlighting Failures:

After preparing the dataset, we ran the evaluation using GPT-3.5, for efficiency and cost-effectiveness. Through this process, we were able to document instances where the model was unable to provide accurate answers.

Taking these failure logs, we devised a new script that parses these logs, identifies instances where the model could not deliver the right answers, and isolates them into a separate file. This method enabled us to run the script multiple times, resulting in a larger dataset that also illustrated a broader range of failure cases with which the model struggled.

Here's the script that accomplishes this task:

```javascript
/*
  Grab the file from the last run: /tmp/evallogs/<idxxx_gpt-3.5-turbo_impossible_detector>.jsonl
  Rename it to run.jsonl and put it in a folder called logs/ within this folder.

  Run this file and the failures will be outputted to a file named failure-samples.jsonl
  You can now keep these examples and combine them with other runs to get a good sample set that GPT struggles with
*/

const fs = require("fs");
const readline = require("readline");
const { Transform } = require("stream");

const inputFile = fs.createReadStream("logs/run.jsonl");
const outputFile = fs.createWriteStream("failure-samples.jsonl");
```

The script begins by importing the required modules and setting up the streams for the input and output files. 

Then we create a `Transform` stream, similar to the one in `convert.js`, which essentially copies each line from the input file to the output file.

```javascript
const processLine = new Transform({
  objectMode: true,
  transform(line, _, done) {
    if (!line) return done();

    let obj;
    try {
      obj = line;
    } catch (err) {
      return done(new Error(`Failed to parse JSON: ${err.message}`));
    }

    const transformedObj = obj;

    this.push(transformedObj + "\n");
    done();
  },
});
```

Next, we create a function `parseLines` that identifies and processes the failures from the log. The function looks for the 'match' lines where `correct` is false (meaning the model got the answer wrong), and pairs each one with its preceding 'prompt' line to preserve the context of the failed question. 

```javascript
const parseLines = (line, previousLine) => {
  if(line && previousLine && !JSON.parse(previousLine).spec && JSON.parse(line).type === "match" && !JSON.parse(line).data.correct) {
    const promptData = JSON.parse(previousLine).data;
    let newLine = {};
    newLine.input = promptData.prompt;
    newLine.ideal = JSON.parse(line).data.expected;
    processLine.write(JSON.stringify(newLine));
  }
};
```

Finally, we use Node's `readline` interface to read the input file line by line, calling `parseLines` for each one. The results are piped to the output file.

```javascript
const lineLimit = 1500;

const rl = readline.createInterface({ input: inputFile, crlfDelay: Infinity });
let i=0;
let previousLine;
rl.on("line", (line) => {
  if(i < lineLimit) {
    parseLines(line, previousLine);
    previousLine = line;
    i++
  }
});
processLine.pipe(outputFile);
outputFile.on("error", (err) => console.error(`Error: ${err.message}`)).on("finish", () => console.log("Output file

 created successfully."));
rl.on("close", () => { processLine.end(); });
```

This script produces a file named `failure-samples.jsonl`, which contains all the failure cases from the logs. These examples can be further combined with others from additional runs to create a robust set of challenging samples for the model to improve upon.

## 5. Understanding the Importance of the Evaluation:

GPT-4, with its advanced capabilities, is shaping up to be a potent learning assistant. Evaluating its ability to discern solvable from unsolvable questions based on the provided context is crucial, especially as we develop more advanced applications atop this technology. This evaluation not only provides insights into potential shortcomings but also measures GPT-4's capability to dodge trick questions.

As GPT-4 becomes accessible to individual developers and organizations, it is being deployed in more complex, context-based workflows. An evaluation like ours provides valuable insights and learnings, benefiting the wider community.

## 6. Sharing the Results of the Evaluation:

Upon discovering questions that stumped GPT-3.5, we aimed to test GPT-4's performance and submit the results for OpenAI to work on its enhancement. Our initial evaluation showed GPT-4 outperforming its predecessor, GPT-3.5, with an accuracy of 0.61 compared to 0.01.

Our “Unsolvable Questions Evaluation” highlighted GPT-4's progress in discerning complex questions and its confabulation issue. Using OpenAI Evals, we gained crucial insights into enhancing large language models.

We look forward to OpenAI’s response to our experiment and contributing towards the evolution of robust AI systems. For a closer look at our evaluation and its updates, visit the open pull request. Together, let's drive AI innovation responsibly.

[Github Pull Request](https://github.com/openai/evals/pull/981)
