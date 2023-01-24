import React from "react";

export default function questionTransformer(questions) {
  const arr = questions.map((question, index) => {
    return { ...question, questionNumber: index };
  });

  return arr;
}
